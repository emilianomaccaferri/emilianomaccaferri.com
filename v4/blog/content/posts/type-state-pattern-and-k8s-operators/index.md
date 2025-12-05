+++
title = "Typestate pattern and Kubernetes operators: a match made in heaven"
date = "2025-12-05"
description = "Handling CRDs with the typestate pattern is COOL"
[taxonomies]
topic = ["k8s", "rust", "coding"] 
+++

Not that long ago I had to code a Kubernetes operator for work-related matters and I wanted to make it in the most possible generic, yet simple, way possible.
<br>
The fun thing about Rust is that there are a LOT of very interesting constructs you don't normally encounter when writing certain kinds of software, especially when you're not writing libraries: one of these is `PhantomData`.
<br>
Citing the documentation:
> Zero-sized type used to mark things that “act like” they own a `T`. <br>
Adding a `PhantomData<T>` field to your type tells the compiler that your type acts as though it stores a value of type `T`, even though it doesn’t really. This information is used when computing certain safety properties.
This is really cool and fits perfectly for the problem I needed to solve.

<br>

## The making of a nice API

I wanted my operator to have a straightforward way to handle resources; let's say, for example, that we need to handle `Secret`s.<br>
The "official" (abbreviated) way to handle resources (via `kube-rs`, the library that implements the operator control loop) is the following:

```rust
// example Secret creation
#[tokio::main]
async fn main() {
  
  let mut secret: Secret {
    metadata: ObjectMeta {
      name: Some(String::from("your-secret-name")),
      namespace: Some(String::from("the-namespace")),
      owner_references: /* other stuff unrelated to this post */,
      ..ObjectMeta::default()
    },
    ..Default::default()
  }
  
  secret.data = Some(
    BTreeMap::from([(
      String::from("key-1"), String::from("base64-encoded-value-1"),
      String::from("key-2"), String::from("value-2"),
      // ...
    )])
  )

}
```

Once you're done creating your `Secret`, you can feed it to the API server:

```rust
let api: Api<Secret> = Api::namespaced(/* kube::Client instance, the client that talks to the apiserver */, &secret.namespace);
// other stuff
api.patch(&secret.name, /* other unrelated stuff */, &Patch::Apply(&secret)).await?;
```

This effectively applies the secret inside Kubernetes, and everyone is happy.<br>
Since everything is very cumbersome, we can create a function that creates secrets for us:

```rust
fn create_secret(name: &str, namespace: &str, owner_references: /* unrelated */) -> Secret {
  Secret {
    metadata: ObjectMeta {
      name: Some(name.into()),
      namespace: Some(namespace.into()),
      owner_references: /* other stuff unrelated to this post */,
      ..ObjectMeta::default()
    },
    ..Default::default()
  } 
}
```

... and you can figure out the function that creates secrets on your own.

<br>

The problem with this approach is obvious (and easily solvable with generics): I have to create a dedicated function for every resource I want to handle in my operator.
<br>
The API I had in mind, though, wasn't _just generic_, I wanted it to be easily extensible. I didn't want to die every time I had to register a new resource.
<br>
I wanted something like this:

```rust
let secret = create::<Secret>(String::from("secret-name"), String::from("secret-namespace"), /* other stuff */);
let config_map = create::<ConfigMap>(...);
let namespace = create_global::<Namespace>(...); // for cluster-wide resources!

secret.add_secret_kv("key", "value"); // and "value" gets automatically encoded in base64
config_map.add_kv("key", "value"); // this is in plaintext
namespace.add_resource_quota(...); // another, completely different, method
```

Basically, I wanted to be able to define types with known behaviours (`Secret`s behave differently than `Namespace`s, of course), but I wanted to have those information at compile time, without having to make any kind of runtime type checking or other terrible stuff.
<br>
Other than that, I wanted my types to be instantiated **all through a common interface**, the `create` or `create_global` functions. The thing I was wrapping my head around was: how can I make these functions instantiate a different type everytime I pass them a resource? That's where `PhantomData` comes into play.
