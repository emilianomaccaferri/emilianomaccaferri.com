+++
title = "JWT authentication on NGINX with JWKS"
date = "2025-01-27"
description = "Decentralized authentication has never been easier"
[taxonomies]
topic = ["microservices", "authentication", "nginx"]
+++

In the world of microservices we often come across _cross cutting concerns_ which can be summarized in, essentially, code that needs to be implemented in multiple layers, such as _logging_, _security stuff_, <strong>_authentication and authorization_</strong>, etc...
<br>
Cross cutting concerns can lead to duplicated code, difficult maintenance and general uneasiness in our system.
Today, we will address the problem of de-duplicating authorization logic from our microservices using NGINX, one of my favourite piece of software EVER.
<br><br>

## The problem

<br>

Let's say we have multiple cooperating microservices in our system, each handling the business logic of our product.<br>
The textbook interaction between two microservices is the HTTP request, which will contain the authorization token given to the user that is issuing such request.
<br>
![example request](./example-request.svg)

This pattern is extremely common and is, essentially, at the basis of microservice communication, but a silent enemy is ready to strike a shot at us: the authorization logic.
With this setup, we will have to implement authorization logic for each microservice in our system, duplicating code and reducing mainteinability; the problem gets much worse if we have different programming languages in our system!
<br>
<br>

## The solution

<br>

To solve this dauting dilemma, we can leverage the [application gateway pattern](https://microservices.io/patterns/apigateway.html) and place authentication logic at its level: every request will then pass through the application gateway
layer before reaching the corresponding microservices, and authentication policies will be implemented just once (on the application gateway itself!).
<br>
![example request with application gateway](./example-request-with-nginx.svg)
<br>
This way, the application gateway will act as a centralized request router and we will be able to remove the duplicated authorization logic on our microservices.
Naturally, we will have to replicate the application gateway to ensure high availability in production scenarios.
<br><br>

## What are JWKS?

<br>

When a JWT is emitted, a signature is appended at the end of the token. Such signature can be generated using symmetric or asymmetric algorithms:

- when using symmetric algorithms, the signature is generated using a SHA-based HMAC (256, 384, 512). To verify the signature of a symmetrically-signed JWT, you'll need to know the same key used to generate the HMAC;
- when using asymmetric algorithms, instead, the signature is generated using a private key of a certain key pair. To verify the signature of an asymetrically-signed JWT, you'll need to know the public key of the given keypair.

Today we'll talk about the asymmetric version of JWT verification and how we can leverage JWKS to implement such task.
<br><br>

JWKS (Json Web Keys Sets) are _sets of public keys_ we can use to verify tokens coming from a token issuer (that signs using the corresponding private keys). JWKS are often published in JSON format using a so-called JWKS endpoint and they look like this:

```json
{"keys":
       [
         {"kty":"EC",
          "crv":"P-256",
          "x":"MKBCTNIcKUSDii11ySs3526iDZ8AiTo7Tu6KPAqv7D4",
          "y":"4Etl6SRW2YiLUrN5vfvVHuhp7x8PxltmWWlbbM4IFyM",
          "use":"enc",
          "kid":"1"},

         {"kty":"RSA",
          "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx...",
          "e":"AQAB",
          "alg":"RS256",
          "kid":"2011-04-29"}
       ]
     }
```

As you can see, a JWK encodes all the information needed to extract the verification algorithm clients should use to check the signature of JWTs.
<br><br>

In this tutorial I will create three simple microservices: A, B and the "signer", which is the JWT emitter. All of these microservices will be behind a NGINX instance that will implement the token authentication logic.
<br><br>

## Implementation

<br>

Note: the reference source code is available here: <https://github.com/emilianomaccaferri/nginx-jwk/>

<br>

We will implement the example scenario we just saw in the "solution" paragraph: two microservices that need to talk to each other while implementing the authentication mechanism.
<br>
Our folder structure will be:

```bash
.
├── compose.yaml
├── LICENSE
├── microservice-a
│   ├── Dockerfile
│   └── index.js
├── microservice-b
│   ├── Dockerfile
│   └── index.js
├── nginx
│   ├── Dockerfile
│   └── etc
│       ├── conf.d
│       │   └── default.conf
│       ├── js
│       │   └── index.js
│       └── nginx.conf
└── signer
    ├── Dockerfile
    └── index.js
```

<br>

#### Docker Compose setup

<br>

We will use Docker (Compose) to model our scenario, using a very simple `compose.yaml` file:

```yaml
networks:
  nginx-jwk-net:

services:
  microservice-a:
    build:
      dockerfile: Dockerfile
      context: ./microservice-a
    networks:
      - nginx-jwk-net
  microservice-b:
    build:
      dockerfile: Dockerfile
      context: ./microservice-b
    networks:
      - nginx-jwk-net
  signer:
    build:
      dockerfile: Dockerfile
      context: ./signer
    networks:
      - nginx-jwk-net
  nginx:
    depends_on:
      - signer
      - microservice-a
      - microservice-b
    build:
      network: host
      context: ./nginx
    volumes:
      - ./nginx/etc/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/etc/conf.d:/etc/nginx/conf.d
      - ./nginx/etc/js:/etc/nginx/js
    networks:
      - nginx-jwk-net
    ports:
      - 58080:8000
```

<br>

#### Microservices A and B

<br>

We have two microservices that communicate through an HTTP request, just like the image above.
[Here](https://github.com/emilianomaccaferri/nginx-jwk/blob/main/microservice-a/index.js) you can see A's code whereas [here](https://github.com/emilianomaccaferri/nginx-jwk/blob/main/microservice-b/index.js) you can see B's. As you can probably tell, A will make an HTTP request using NGINX as a passthrough.

<br>

#### Signer microservice

<br>

The signer microservice will emit JWT tokens and expose the JWK endpoint. The code is [here](https://github.com/emilianomaccaferri/nginx-jwk/blob/main/signer/index.js).

<br>

#### NGINX configuration

<br>

To glue everything together, we can define our NGINX configuration like this:

```nginx
js_import authService from js/index.js;

  # snip ... 

server {
    listen 8000;
    js_var $no_auth_reason; # very important!

    location = .validate {
        internal;
        js_content authService.validateJwt;
    }

    location /signer/ {
        gunzip on;
        proxy_pass http://signer:3000/;        
        proxy_cache jwk_response;
    }

    location /a/ {
        auth_request .validate;
        error_page 401 = @unauthorized;
        
        proxy_pass http://microservice-a:3000/;
    }
    location /b/ {
        auth_request .validate;
        error_page 401 = @unauthorized;
        
        proxy_pass http://microservice-b:3000/;
    }

# snip ... 
```

The full configuration is available [here](https://github.com/emilianomaccaferri/nginx-jwk/blob/main/nginx/etc/conf.d/default.conf), but the fundamental bits are captured in the snippet just above. What we are doing is reverse-proxying all our microservices behind NGINX: every request that hits the `/a` or `/b` endpoints will go through an [auth_request](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html) (called `.validate`). This particular `location` block will run our custom JS authentication logic, which we will see in a bit.
<br>

From the [documentation](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html), we can see that `auth_request`s can only return `203`, `401` or `403` error codes. Since we will only use the `401` error code inside our JS script, we will catch such code with the `error_page` directive, that redirects our request to yet another custom route, called `@unauthorized` (code below), in case the authentication process fails.

```nginx
location @unauthorized {
  internal;
  default_type application/json;
  add_header Content-Type "application/json";
  if ($no_auth_reason = 'bad_signature') {
      return 400 '{
          "success": false,
          "error": "invalid signature"
      }';
  }

  if ($no_auth_reason = 'invalid_jwt') {
      return 400 '{
          "success": false,
          "error": "token is malformed"
      }';
  }
  if ($no_auth_reason = 'empty_token') {
      return 400 '{
          "success": false,
          "error": "token is empty"
      }';
  }
  if ($no_auth_reason = 'bad_introspection') {
      return 500 '{
          "success": false,
          "error": "introspection failed"
      }';
  }
  if ($no_auth_reason = 'not_active') {
      return 403 '{
          "success": false,
          "error": "token is not active"
      }';
  }
  if ($no_auth_reason = 'no_roles') {
        return 401 '{
            "success": false,
            "error": "you are not authorized to access this resource"
        }';
    }
    if ($no_auth_reason = 'cannot_parse') {
        return 500 '{
            "success": false,
            "error": "parsing error"
        }';
    }
    return 500 '{
        "success": false,
        "error": "something unknown happened :O"
    }';
  }
```

As you can see, we use the `$no_auth_reason` we defined earlier (which is modified inside the JS script, as we will see in a bit) to filter the correct return message.

<br>

#### The authentication logic

<br>

The authentication code is imported using the `js_import` variable at the top of the NGINX configuration file. Inside, we defined the `validateJwt` function (that is the one we use in the `.validate` location block) that does all the heavy lifting:

```js
const validateJwt = async (res) => {
  try {
    const jwk = await res.subrequest('/signer/jwk');
    const parsed_jwk = JSON.parse(jwk.responseText);
    const preferred_key = parsed_jwk["keys"]
      .filter(k =>
        k.kty === "EC"
      );

    if (preferred_key.length === 0)
      throw new Error('no preferred key');

    const jwt = res.variables.header_token;
    const key = await crypto
      .subtle
      .importKey(
        "jwk",
        preferred_key[0],
        {
          name: "ECDSA",
          namedCurve: "P-521",
        },
        true,
        ["verify"]
      );
    const jwt_split = jwt.split(".");
    if (jwt_split.length !== 3) {
      res.variables.no_auth_reason = "invalid_jwt";
      res.return(401);
      return;
    }
    const signing_input = jwt_split.slice(0, 2).join('.');
    const verify = await crypto.subtle.verify({
      name: "ECDSA", 
      namedCurve: "P-521",
      hash: "SHA-512"
    },
      key,
      decode(jwt_split[2]),
      encoder.encode(signing_input),
    );
    res.error(verify);
    if (!verify) {
      res.variables.no_auth_reason = "bad_signature";
      res.return(401);
      return;
    }
    res.return(203);
  } catch (err) {
    res.error(err);
    res.variables.no_auth_reason = "generic_error";
    res.return(401);
  }
}
```

In a nutshell, what happens is:

- the JWKS is downloaded from the `/signer/jwk` endpoint (which is cached from NGINX). Such JWKS will be used to verify the token contained in the request;
- the correct (and only, in this case) key is extracted;
- the key is imported using the `crypto` module included in NGINX ([reference here](https://nginx.org/en/docs/njs/reference.html#crypto));
- since this is a proof of concept implementation, only the signature verification is performed on the token. A complete implementation will also take into account the `iss` and `exp` fields;
- if the verification is successful, the request is let through, otherwise a `401` error is raised with the corresponding `no_auth_reason`;

To test everything we can use the `/signer/example-token` endpoint to obtain a JWT and verify that everything works correctly.

<br>

## Conclusions

<br>

We can leverage NGINX's powerful ecosystem to implement complex authentication logic to free our microservices from boilerplate code. Using stateless authentication mechanisms such as JWTs and JWKS makes the task particularly simple, rendering the maintenance of a modern microservice-based system a tad simpler.

<br>

That was all for today,
<br>

until the next post!
