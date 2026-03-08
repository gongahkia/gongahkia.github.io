# MongoDB

# `MongoDB`

[NoSQL document database](https://www.mongodb.com/resources/basics/databases/nosql-explained) that excels at high volume data storage.

## Quickstart

* MongoDB stores data in documents and collections with a JSON-like syntax *(key-value pairs)* similar to Python dictionaries and Javascript objects
* Mongo Query Language (MQL) uses JSON to query data
* Documents are equivalent to rows (records) in MySQL
* Collections hold one or more Binary JSON (BSON) documents, equivalent to tables in MySQL

```
# ---------- QUICKSTART -----------

# ------- COMMANDS -------
    # mongod => starts up the mongo database server shell
        # "<server_address>" --username <username> => receives an optional argument in the format of "mongodb+srv://host.ip.address/admin" --username your-username that allows connection to a remote server
    # exit => quits the mongo database server shell

mongod 
exit

# ----- GENERAL -----
    # show dbs => lists available databases
    # show collections => lists available collections under a database
    # db.createCollection() => creates a new collection under the specified name
    # use <database_name> => selects a given database as the current one in use
    # db.dropDatabase() => drops all documents from every collection within the current database

# --- NOTE!!! ---
    # inserting a document implictly creates a new collection
    # inserting data into a collection implicitly creates a new database
    # the update method always calls the $set operator

show dbs

use employees

db.createCollection('engineers')
db.createCollection('doctors')

show collections

db.dropDatabase()

# ----- CRUD OPERATIONS -----

# --- CREATE (INSERT) ---
    # every insertion call returns a boolean true or false
    # every document (row/record) has a unique _id meta tag automatically assigned to it as its unique identification
    # db.<collection_name>.insertOne() => receives a JSON-style object within curly braces {} as an argument, inserts the object to the collection
        # empty objects can be inserted into the collection without issue
        # object fields are also optional and do not necesarilly have to match the intially declared fields
        # object field types can vary and are preserved upon insertion
        # object fields can be deeply nested within layers of a document 
    # db.<collection_name>.insert() => receives an array of JSON-style objects with each object declared within curly braces {} as an argument, inserts all the objects to the collection
    # _id => meta id tag (equivalent of a UID in MySQL) can be manually overriden as an object field
        # note that _id meta id tag must ALWAYS be unqiue similar to other databases, and duplicate _id meta tags will result in failed insertion and a WriteError

db.engineers.insertOne({ name: "Jane Doe", age: 21, gender: 'Female' })
db.engineers.insert([
  { name: "Foo Bar", age: 25, gender: 'Male' },
  { name: "Baz Qux", age: 27, gender: 'Other' },
])

db.engineers.insertOne({}) # empty object
db.engineers.insertOne({ name: "Your Name", gender: "Male" }) # fields missing
db.engineers.insert({ name: ['Foo', 'Bar'], age: 3.14, gender: true }) # fields have wrong type
db.engineers.insertOne({ # nested declaration of an object document
  name: "Your Name",
  gender: "Female",
  skilledIn: [
    "MongoDB",
    "NoSQL",
  ],
  "date-of-birth": {
    "date": 1993-07-20T09:44:18.674Z,
    "age": 26
  },
})

db.engineers.insertOne({
  _id: 1, # overidding the ID tag within the object document insertion declaration
  name: "An Engineer",
  age: 25,
  gender: "Female",
})

db.engineers.insertOne({
  _id: 1, # results in a WriteError due to duplicate _id meta ID tags being inserted
  name: "Another Engineer",
  age: 25,
  gender: "Male",
})

# --- READ (FIND) ---
    # db.<collection_name>.findOne(<query_object>) => searches for documents similar to the specified query object and returns the FIRST document matching the given query
    # db.<collection_name>.find(<query_object>) => searches for all documents similar to the specified query object and returns ALL documents matching the given query as a CURSOR (can be converted to an array)
        # display of documents is limited to 20 at a time
        # empty objects {} are accepted as an argument, and will return every document in the current collection
        # datatypes of fields specified within the query object matter, and must be accurate for a successful query
        # supports nested query objects and fields
    # db.<collection_name>.find(<query_object>).pretty() => queries the database for the specified query object and formats the returned document records before printing them to the stdout

db.engineers.findOne({ name: 'Foo Bar' })
db.engineers.find({})
db.engineers.find({}).pretty()
db.engineers.find({ age: 25 })

db.engineers.find({
  name: "Your Name",
  gender: "Female",
  skilledIn: [
    "MongoDB",
    "NoSQL",
  ],
  "date-of-birth": {
    "date": 1993-07-20T09:44:18.674Z,
    "age": 26
  },
})

# --- UPDATE ---
    # db.<collection_name>.updateOne(<query_object>, <updated_value>) => queries the database per the specified query object and updates the FIRST instance of a matched document record
    # db.<collection_name>.update(<query_object>, <updated_value>) => queries the database per the specified query object and updates ALL instances of matched document records 
    # {upsert:true} => added as an optional argument to the update query to insert the specified update document value if the queried document does not already exist and no matches have been found, and to simply update the matched document if any are found
        # returns matched, upserted, modified_count as values

db.engineers.updateOne({ name: 'Foo Bar' }, { $set: { name: 'John Doe', age: 100 }})
db.engineers.update({ age: 25 }, { $set: { age: 26 }})

db.engineers.update({ name: 'Foo Baz' },
  { $set:
    {
      age: 26,
      gender: 'Other'
    }
  },
  { upsert: true }
)

# --- DELETE ---
    # db.<collection_name>.deleteOne(<query_object>) => queries the database per the specified query object and deletes the FIRST instance of a document matching the query
        # returns deleted_count
    # db.<collection_name>.deleteMany(<query_object>) => queries the database per the specified query object and deletes ALL instances of documents matching the query
        # returns deleted_count

db.engineers.deleteOne({ name: 'Foo Baz' })
db.engineers.deleteMany({ gender: 'Male' })

# ----- OPERATORS -----
    # all operators are prefixed by the $ dollarsign character

# --- COMPARISON OPERATORS ---
    # $gt => finds all values greater than the specified value
    # $gte => finds all values greater than or equal to the specified value
    # $lt => finds all values less than the specified value
    # $lte => finds all values less than or equal to the specified value
    # $eq => finds all values equal to the specified value
        # the $eq operator is added implicitly to most queries (for obvious reasons)
    # $ne => finds all values not equal to the specified value
    # $in => finds any values that match a given element of a specified array, checking for membership within a specified array
    # $nin => finds any values that do not match a given element of a specified array, checking for absence from a specified array

db.engineers.find({ age: { $gt: 25 }})
db.engineers.find({ age: { $gte: 25 }})
db.engineers.find({ age: { $lt: 25 }})
db.engineers.find({ age: { $lte: 25 }})
db.engineers.find({ age: { $eq: 25 }})
db.engineers.find({ age: { $ne: 25 }})
db.engineers.find({ age: { $in: [ 20, 23, 24, 25 ]}})
db.engineers.find({ age: { $nin: [ 20, 23, 24, 25 ]}})

# --- LOGICAL OPERATORS ---
    # $and => joins two query clauses together
        # the $and operator is implicitly tagged to most queries (for obvious reasons)
    # $or => either one of two query conditions has to be matched
    # $not => negates the attached query condition
    # $nor => must avoid matching any of the specified query conditions

db.engineers.find({ $and: [
  gender: 'Female',
  age: {
    $gte: 18
  }
]})

db.engineers.find({ $or: [
  gender: 'Female',
  age: {
    $gte: 18
  }
]})

db.engineers.find({ $not: {
  gender: 'Female'
}})

db.engineers.find({ $nor [
  gender: 'Female',
  age: {
    $gte: 18
  }
]})
```

## More on

* [install MongoDB](https://www.mongodb.com/docs/manual/installation/)
* [BSON supported datatypes](https://www.mongodb.com/docs/manual/reference/bson-types/)
* [operators in MongoDB](https://www.mongodb.com/docs/manual/reference/operator/)
* [learn MongoDB in y minutes](https://learnxinyminutes.com/docs/mongodb/)
* [MongoDB univeristy](https://university.mongodb.com/)
* [MongoDB crash course](https://youtu.be/-56x56UppqQ?si=b0hxc7LeN9YtXJWk)
