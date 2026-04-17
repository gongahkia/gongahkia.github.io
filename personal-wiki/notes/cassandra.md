---
category: Tech
---
# Cassandra

# `Cassandra`

Highly scalable, distributed NoSQL database.

## Launching Cassandra

```
# ---------- LAUNCHING CASSANDRA ----------
    # type the following commands in the CLI

cassandra -f # starts running a Cassandra instance in the foreground
cqlsh # launches the cqlsh shell, in which all CQL is typed
```

## Quickstart

```
-- ---------- QUICKSTART ----------
    -- queries are written in Cassandra Query Language (CQL), which bears many syntactic similarities to SQL 
    -- the most direct way to interact with the Apache Cassandra database is to use the CQL shell, cqlsh
    -- keyspace => namespaces that defines data replication on a node, similar to databases in SQL
    -- tables => tables live within keyspaces, and function similarly to normal tables in SQL
    -- CQL is a semicolon language 

-- ----- GENERAL -----
    -- CREATE KEYSPACE <keyspaceName> => creates a keyspace under the given name, and assigns it the value augmenters specified in the assignment statement
    -- USE <keyspaceName> => selects the specified keyspace for use presently
    -- CREATE TABLE <tableName> (<columnName> <columnDatatype> <augemnters(s)>) => creates a table with any number of columns and their corresponding names and datatypes as specified
    -- INSERT INTO <tableName> (<columnNames>) VALUES (<columnValuesTobeInserted>) => inserts the specified values into the given table
    -- SELECT <query> FROM <tableName> WHERE <predicate(s)> => the foundation of CQL, allowing users to structure complex queries to retrieve their desired data from the given keyspace and table
    -- UPDATE <tableName> SET <updatedFieldAndValue> WHERE <predicate(s)> => updates the given record where the record's fields matches the specified predicate(s)
    -- DELETE FROM <tableName> WHERE <predicate(s)> => deletes records from the specified table where the given record's fields matches the specified predicate(s)

CREATE KEYSPACE mykeyspace WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
USE mykeyspace;

CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT
);

INSERT INTO users (user_id, first_name, last_name, email) VALUES (uuid(), 'John', 'Doe', 'john.doe@example.com');

SELECT * FROM users;

UPDATE users SET email = 'john.newemail@example.com' WHERE user_id = <specific-uuid>;

DELETE FROM users WHERE user_id = <specific-uuid>;
```

## More on

* [install cassandra](https://cassandra.apache.org/_/download.html)
* [cassandra documentation](https://cassandra.apache.org/doc/latest/)
* [cassandra index](https://docs.datastax.com/en/cql-oss/3.3/cql/cql_using/usePrimaryIndex.html)
* [cassandra collections](https://docs.datastax.com/en/cql-oss/3.3/cql/cql_using/useCollections.html)
* [cassandra batch](https://docs.datastax.com/en/cql-oss/3.3/cql/cql_reference/cqlBatch.html)
* [cassandra user-defined types](https://docs.datastax.com/en/cql-oss/3.3/cql/cql_using/useCreateUDT.html)
* [cassandra materialized views](https://cassandra.apache.org/doc/stable/cassandra/cql/mvs.html)
* [cassandra data replication](https://docs.datastax.com/en/cassandra-oss/3.0/cassandra/architecture/archDataDistributeReplication.html)
* [cassandra compaction](https://cassandra.apache.org/doc/stable/cassandra/operating/compaction/index.html)
* [cassandra caching](https://docs.datastax.com/en/cassandra-oss/3.x/cassandra/operations/opsSetCaching.html)
