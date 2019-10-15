# Teravoz Service

This is the service responsible for integrate with the TeraVoz's API.

It has a _webhook_ as a REST endpoint,which is suposed to be called by TeraVoz's API, and a _websocket_ for reading the data from the calls.

## Project Architecture

![alt text](https://miro.medium.com/max/720/1*D1EvAeK74Gry46JMZM4oOQ.png "Clean Architecture")

On this project i used a Clean Architecture approach to create a easy to mantain and readable source code.

The core idea was to build every part as decoupled as possible from the others and make them testable e resusable as well. To achieve this purpose i created interfaces for every part of the API that i want to be easily replaced or modified (eg: ICallRepository can be implemented either in MySql or Mongo,or any other kind of storage). This was one of the reasons i choosed TypeScript as language for this service.

Another important advantage is the segregation between the webserver,database,API clients and other frameworks and drivers from the business logic. This brings a even bigger advantage if is done with functional programming principles in mind, helping to create functions with minimal to zero side effects and predictable results.

Last but not less important, i used a few concepts of event sourcing,which can improve the functional way to think and also brings a entire new view about how to deal with data. Saving every event give us the chance to rebuild our data at any moment in time.

## Webhook

The webhook endpoint was implemented according to TeraVoz's API specification and uses a simple map-based event processor to route the request to the correct function based on the event type sent by TeraVoz.

Currenttly this api accepts the following event types:
`call.new`, `call.standby`, `call.waiting`, `actor.entered`, `call.ongoing`, `actor.left`, `call.finished`

## WebSocket

Instead of using a REST API i decided to use a websocket,thinking about the possibilities this could bring to the frontend application. It allow us to update the frontend in realtime.

The websocket receives the following commands/events:

### ListCalls

ListCalls retrieve all the calls for the given params. When params are not defined it retrive all the calls.

Request Payload:
```json
{
    "event": "ListCalls",
    "data": {
        "params": {
            "state": "NEW"
        }
    }
}
```

Example Response: 

```json
{
  "data": [{
    "id": 6,
    "aggregate_id": "1463669263.30038",
    "state": "NEW",
    "created_at": "2019-10-15T00:30:26.000Z",
    "updated_at": "2019-10-15T00:30:26.000Z"
  }, {
    "id": 7,
    "aggregate_id": "1463669263.30039",
    "state": "NEW",
    "created_at": "2019-10-15T00:31:03.000Z",
    "updated_at": "2019-10-15T00:31:03.000Z"
  }, {
    "id": 8,
    "aggregate_id": "1463669263.30040",
    "state": "NEW",
    "created_at": "2019-10-15T00:33:02.000Z",
    "updated_at": "2019-10-15T00:33:02.000Z"
  }],
  "event": "ListCalls",
  "status": "Ok"
}
```

### LictCallEvents

ListCallEvents retrive all the events for the informed call.

```json
{
    "event": "ListCallEvents",
    "data": {
        "call_id": "1463669263.30041"
    }
}
```

Example Response: 

```json
{
  "data": [{
    "id": 1,
    "aggregate_id": "1463669263.30033",
    "uuid": "be7d7b70-ec0f-11e9-90fb-0f172d2e84ac",
    "event": {
      "code": "123456",
      "type": "call.new",
      "call_id": "1463669263.30033",
      "direction": "inbound",
      "timestamp": "2017-01-01T00:00:00Z",
      "our_number": "0800000000",
      "their_number": "11999990000",
      "their_number_type": "mobile"
    }
  }, {
    "id": 2,
    "aggregate_id": "1463669263.30033",
    "uuid": "c40642c0-ec0f-11e9-90fb-0f172d2e84ac",
    "event": {
      "code": "123456",
      "type": "call.standby",
      "call_id": "1463669263.30033",
      "direction": "inbound",
      "timestamp": "2017-01-01T00:00:00Z",
      "our_number": "0800000000",
      "their_number": "11991910000"
    }
  }, {
    "id": 8,
    "aggregate_id": "1463669263.30033",
    "uuid": "1259fa70-ed64-11e9-968b-7f3ddd1bb5a9",
    "event": {
      "code": "123456",
      "type": "actor.entered",
      "actor": "user.name@email.com",
      "queue": "900",
      "number": "200",
      "call_id": "1463669263.30033",
      "timestamp": "2017-01-01T00:00:00Z"
    }
  }, {
    "id": 13,
    "aggregate_id": "1463669263.30033",
    "uuid": "81bf4820-ed64-11e9-bf1c-857c9b92792e",
    "event": {
      "code": "123456",
      "type": "actor.left",
      "actor": "user.name@email.com",
      "queue": "900",
      "number": "200",
      "call_id": "1463669263.30033",
      "timestamp": "2017-01-01T00:00:00Z"
    }
  }, {
    "id": 14,
    "aggregate_id": "1463669263.30033",
    "uuid": "a2a44d60-ed64-11e9-b453-7d7f966ecf39",
    "event": {
      "code": "123456",
      "type": "call.finished",
      "call_id": "1463669263.30033",
      "direction": "inbound",
      "timestamp": "2017-01-01T00:00:00Z",
      "our_number": "0800000000",
      "their_number": "11991910000"
    }
  }],
  "event": "ListCallEvents",
  "status": "Ok"
}
```

## Docker

The project has a Dockerfile for the Node.JS service and a docker-compose with a Redis(used as PubSub system) and a Mysql Database