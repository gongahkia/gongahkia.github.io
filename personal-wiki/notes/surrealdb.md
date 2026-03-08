# SurrealDB

# `SurrealDB`

Schrödinger's multi-model database.

## Introduction

* engine written in Rust
* combines elements of relational, graph and document database paradigms
* used for modern web, mobile, and server application development
* has both SQL and NoSQL features for powerful querying capabilities with flexible data modelling
* SurrealDB also supports
  * ACID transactions
  * real-time notifications
  * geospatial data
  * predefined analytics
  * multi-tenancy
  * built-in authentication
  * permissions authorization
  * integrated full-text search
  * optimistic concurrency control

## Quickstart

```
-- ----- QUICKSTART -----
    -- there isn't a syntax overview here since SurrealDB extends upon existing SQL syntax which most developers are familiar with
    -- recall that SurrealDB allows developers to leverage on both the default schemaless (NoSQL) modelling, and the more structured schemafull (conventional SQL) modelling as desired
    -- however, note that there are no JOIN constructs in SurrealDB, and it instead handles relational database modelling via record links and graph connections

-- --- SCHEMAFULL MODELLING ---
    -- below is an example of SurrealDB handling conventional SQL queries with structured data 
    -- this should be nothing new for developers well-acquainted with SQL's syntax

CONNECT TO surrealdb://localhost:8000; -- connects to the local database
CREATE DATABASE my_database; -- creates a new database
USE my_database; -- select the created database

CREATE TABLE users (
    id STRING PRIMARY KEY,
    name STRING,
    email STRING,
    age INT,
    address OBJECT
); -- create a new table with a defined schema and structure

INSERT INTO users (id, name, email, age, address) VALUES (
    'user1',
    'John Doe',
    'john@example.com',
    30,
    { street: '123 Main St', city: 'Anytown', zip: '12345' }
); -- insert data into the table

SELECT * FROM users WHERE age > 25; -- querying data
UPDATE users SET email = 'john.doe@example.com', age = 31 WHERE id = 'user1'; -- updating data
DELETE FROM users WHERE id = 'user1'; -- deleting data

-- --- SCHEMALESS MODELLING ---
    -- below is an example of SurrealDB then handling unstructured data in the same database as above

CREATE TABLE documents; -- create a new table without a predefined schema, thereby leveraging on NoSQL capabilities

INSERT INTO documents (id, content) VALUES (
    'doc1',
    {
        "title": "SurrealDB Overview",
        "body": "SurrealDB is a scalable, distributed database...",
        "tags": ["database", "scalable", "distributed"],
        "metadata": {
            "author": "John Doe",
            "created_at": "2024-07-03",
            "revisions": 3
        }
    }
); -- insert first instance of unstructured data into the table

INSERT INTO documents (id, content) VALUES (
    'doc2',
    {
        "title": "Getting Started with SurrealDB",
        "content": "This guide will help you get started with SurrealDB...",
        "tags": ["guide", "tutorial"],
        "metadata": {
            "author": "Jane Smith",
            "created_at": "2024-07-03"
        },
        "related_documents": ["doc1"]
    }
); -- insert another document instance with a different structure into the table, SurrealDB handles this just fine

SELECT * FROM documents WHERE content->'metadata'->>'author' = 'John Doe'; -- querying data
SELECT * FROM documents WHERE 'database' IN content->'tags'; -- querying data with tags
```

## More on

* [record links](https://surrealdb.com/docs/surrealdb/surrealql/datamodel/records)
* [graph connections](https://surrealdb.com/docs/surrealdb/surrealql/statements/relate)
* [events](https://surrealdb.com/docs/surrealdb/surrealql/statements/define/event)
* [acid transaction](https://www.databricks.com/glossary/acid-transactions)
* [implement a feature in surrealdb](https://surrealdb.com/docs/surrealdb/tutorials/)
* [surrealdb by example](https://github.com/surrealdb/examples)
* [install surrealdb](https://surrealdb.com/install)
* [surrealdb.com](https://surrealdb.com/)
* [surrealdb documentation](https://surrealdb.com/docs/)
* [why use surrealdb](https://www.reddit.com/r/rust/comments/1b69gsp/have_any_of_you_used_surrealdb_and_what_are_your/)
* [beyond surrealdb with fireship](https://youtu.be/LCAIkx1p1k0?si=WLthG0cjpL6AxfoQ)
