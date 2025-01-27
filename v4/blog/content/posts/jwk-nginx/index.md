+++
title = "JWT authentication on NGINX with JWKS"
date = "2025-01-25"
description = "Decentralized authentication has never been so easy"
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

JWKS (Json Web Keys Sets) are _set of public keys_ we can use to verify tokens coming from a token issuer (that signs using the corresponding private keys). JWKS are often published in JSON format using a so-called JWKS endpoint.
<br><br>

In this tutorial I will create three simple microservices: A, B and the "signer", which is the JWT emitter. All of these microservices will be behind a NGINX instance that will implement the token authentication logic.
<br><br>

## Implementation

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

#### Initial NGINX setup

#### Microservices A and B

#### Signer microservice

#### Introducing the authenticaiton logic
