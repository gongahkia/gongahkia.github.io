# Full-stack

# `Full-stack`

To know anything, [you must know everything](https://www.newyorker.com/magazine/1966/04/09/you-must-know-everything).

For clarity, this document is about full-stack architecture.

## Definitions

Within the context of software development.

1. Architecture: blueprint of how a website or application’s components interact with each other AND how data flows through the system
2. Full-stack: consists of the three below layers
  1. [Frontend](#frontend) *(client-side code)*: UI and UX
  2. [Backend](#backend) *(server-side code)*: logic, data processing, API handling
  3. [Database](#database) *(database code)*: for data storage and management
3. API *(application programming interface)*: bridge between the frontend and backend that defines communication via [HTTP requests](https://restfulapi.net/http-methods/)

## Frontend

* Primary user interface *(UI)* that directly impacts the user experience *(UX)*
* Built using web technologies
  * Web programming
    * [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
    * [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
    * [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or [TypeScript](https://www.typescriptlang.org/docs/)
  * Frameworks *(libraries)*
    * [Svelte](https://svelte.dev/)
    * [React](https://react.dev/)
    * [Vue](https://vuejs.org/)
    * [Angular](https://angular.dev/)
    * [Solid](https://www.solidjs.com/)
    * [Astro](https://astro.build/)
    * [Vite](https://vitejs.dev/)
    * [Next](https://nextjs.org/)
    * [Mithril](https://mithril.js.org/)
    * [Preact](https://preactjs.com/)
    * [Ruby on Rails](https://rubyonrails.org/)

## Backend

* Responsible for codification of business logic, database interaction, authentication and handling API requests
* Built using backend technologies
  * Business logic
    * [Python](https://docs.python.org/3/)
    * [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
    * [Ruby](https://www.ruby-lang.org/en/documentation/)
    * [Java](https://docs.oracle.com/en/java/)
    * [C#](https://learn.microsoft.com/en-us/dotnet/csharp/)
    * [Go](https://go.dev/doc/)
    * [PHP](https://www.php.net/docs.php)
  * Database interaction
    * [Django](https://docs.djangoproject.com/en/5.1/)
    * [Flask](https://flask.palletsprojects.com/en/3.0.x/)
    * [Node.js](https://nodejs.org/docs/latest/api/)
    * [Ruby on Rails](https://guides.rubyonrails.org/)
    * [ASP.NET](https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-8.0)
    * [Spring](https://docs.spring.io/spring-framework/reference/index.html)
    * [Micronaut](https://docs.micronaut.io/)
    * [Go](https://go.dev/doc/)
    * [PHP](https://www.php.net/docs.php)
  * Authentication
    * [JWT](https://jwt.io/introduction) *(JSON Web Token)*
    * [OAuth 2.0](https://oauth.net/2/)
    * [OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect)
    * [SAML](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html) *(Security Assertion Markup Language)*
    * [Session-based authentication](https://roadmap.sh/guides/session-based-authentication)
  * API handling
    * [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api)
    * [GraphQL](https://graphql.org/)
    * [gRPC](https://grpc.io/docs/)
    * [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
    * [Postman](https://learning.postman.com/docs/introduction/overview/)
    * [Swagger](https://swagger.io/docs/)

## Database

* Stores the data required by the application
* Built using database technologies
  * SQL *(relational databases)*
    * [MySQL](https://www.mysql.com/)
    * [PostgreSQL](https://www.postgresql.org/)
    * [SQLite](https://www.sqlite.org/)
    * [MariaDB](https://mariadb.org/)
    * [IBM Db2](https://www.ibm.com/db2)
    * [Google Cloud SQL](https://cloud.google.com/sql?hl=en)
  * NoSQL *(document-based databases)*
    * [MongoDB](https://www.mongodb.com/)
    * [Cassandra](https://cassandra.apache.org/_/index.html)
    * [Firebase](https://firebase.google.com/)
    * [DynamoDB](https://aws.amazon.com/dynamodb/)
    * [CouchDB](https://couchdb.apache.org/)

## Overview

Full-stack architecture diagram.

```
+----------------------+                 +---------------------+                          +----------------------+
|                      |                 |                     |                          |                      |
|      [Frontend]      | -- API call --> |      [Backend]      | --- database query --->  |      [Database]      |
|                      |                 |                     |                          |                      |
|      UI and UX       |                 |   Execute business  |                          |    Database CRUD     |
|       display        | <-- response -- |        logic        | <--- database return --- |      operations      |
|                      |                 |                     |                          |                      |
+----------------------+                 +---------------------+                          +----------------------+
```

## More on

* [Full Stack Development Explained](https://www.mongodb.com/resources/basics/full-stack-development) by MongoDB
* [How to Learn Software Design and Architecture | The Full-stack Software Design & Architecture Map](https://khalilstemmler.com/articles/software-design-architecture/full-stack-software-design/) by khalilstemmler.com
* [How to Architect a Full-Stack Application from Start to Finish](https://www.freecodecamp.org/news/how-to-build-a-full-stack-application-from-start-to-finish/) by Lane Wagner
* [Understanding Full Stack Development Architecture: A Comprehensive Guide](https://medium.com/@p.reaboi.frontend/understanding-full-stack-development-architecture-a-comprehensive-guide-548f8cba6d91) by Petru Reaboi
* Caching
  * [Redis](https://redis.io/documentation)
  * [Memcached](https://memcached.org/)
  * [Varnish](https://varnish-cache.org/docs/)
* Queuing and Task Management
  * [Celery](https://docs.celeryproject.org/en/stable/)
  * [RabbitMQ](https://www.rabbitmq.com/documentation.html)
  * [Apache Kafka](https://kafka.apache.org/documentation/)
  * [Sidekiq](https://sidekiq.org/documentation.html)
* Error Handling and Logging
  * [Sentry](https://docs.sentry.io/)
  * [Logstash](https://www.elastic.co/guide/en/logstash/current/index.html)
  * [Graylog](https://docs.graylog.org/)
* Microservices
  * [Docker](https://docs.docker.com/) *(containerization)*
  * [Kubernetes](https://kubernetes.io/docs/home/) *(orchestration)I*
  * [Istio](https://istio.io/latest/docs/) *(service mesh)*
* DevOps *(for Continuous Integration (CI) and Continuous Deployment (CD))*
  * [Jenkins](https://www.jenkins.io/doc/)
  * [GitHub Actions](https://docs.github.com/en/actions)
  * [GitLab CI](https://docs.gitlab.com/ee/ci/)
  * [CircleCI](https://circleci.com/docs/)
  * [TravisCI](https://docs.travis-ci.com/)
* Unit Testing
  * [PyTest](https://docs.pytest.org/en/stable/)
  * [Mocha](https://mochajs.org/)
  * [Chai](https://www.chaijs.com/)
  * [JUnit](https://junit.org/junit5/docs/current/user-guide/)
* Load Testing
  * [JMeter](https://jmeter.apache.org/usermanual/index.html)
  * [Locust](https://docs.locust.io/en/stable/)
* Cloud Providers *(serverless architecture)*
  * [AWS](https://docs.aws.amazon.com/)
  * [Google Cloud](https://cloud.google.com/docs)
  * [Azure](https://docs.microsoft.com/en-us/azure/)
* Real-Time Communication
  * [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
  * [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) *(server-sent events)*
* Data Security
  * [SSL/TLS](https://www.openssl.org/docs/)
  * [Password Hashing](https://password-hashing.net/)
  * [Secure APIs](https://owasp.org/www-project-secure-coding-practices/)
* State Management
  * [Redux](https://redux.js.org/)
  * [MobX](https://mobx.js.org/README.html)
  * [Context API](https://reactjs.org/docs/context.html)
