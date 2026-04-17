---
category: Tech
---
# Actor model

# `Actor model`

* Conceptual model for concurrent computation
* Proposed by Carl Hewitt in 1973
* Widely used in distributed real-time systems

## Quickstart

### Actor

* Universal primitives of computation
* Independent entities that
  1. **Process messages**: *actors* process messages asynchronously
    * **asynchronous communication**
      * senders do not need to wait for receivers to process the message *(asynchronous)*
      * other operations are not blocked when waiting for a message response)
    * **no shared state**
      * there is NO shared memory between actors
      * actors ONLY communicate by sending messages to each other
    * **dynamic behaviour**
      * actors can change their behavior based on the messages they receive. For example, an actor might switch to a different state after handling a message, altering how it processes future messages.
  2. **Encapsulates state**: *actor* state is private (only modifiable by the *actor*)
  3. **Manages state**: *actors* can create new *actors*, send messages to other *actors* and respond to received messages
    * **create new actors**: allowing for scalable systems
    * **send messages**: possible if them sender actor knows the receiver actor's address
    * **specify behavior**: actors can DECIDE how to react to the next received message

## Benefits

* **Concurrency**: naturally supported since actors operate independently
* **Fault tolerance**: actors that supervise other actors *(restarting them if they fail)* can be implemented
* **Scalability**: actors can be created on demand
* **Avoid deadlocks**: sidesteps issues created by traditional concurrency *(reliant on threads and locks)* with NO shared state and message-passing

## Usecases

Often used in

* distributed systems where components must communicate reliably and operate concurrently
* real-time systems requiring responsiveness and robustness *(eg. telecom systems)*

## More on

* [The actor model in 10 minutes](https://www.brianstorti.com/the-actor-model/) by Brian Storti
* [Concurrency in Computing](https://medium.com/@ibrahimlanre1890/concurrency-in-computing-d1a676c4f13b) by Ibrahim Lanre Adedimeji
* [The Actor Model](http://wcl.cs.rpi.edu/salsa/tutorial/salsa1_1_2/node6.html) by Rensselaer Polytechnic Institute
* [Actor Model in Nutshell](https://medium.com/@KtheAgent/actor-model-in-nutshell-d13c0f81c8c7) by Krishna Kumar Tiwari
* [43 years of actors: a taxonomy of actor models and their key properties](https://dl.acm.org/doi/10.1145/3001886.3001890) by Joeri De Koster, Tom Van Cutsem, Wolfgang De Meuter
* [erlang.org](https://www.erlang.org/)
* [akka.io](https://akka.io/)
* [Communicating sequential processes](https://www.cs.cmu.edu/~crary/819-f09/Hoare78.pdf) by SL Graham (CMU School of Computer Science)
