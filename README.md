## Description

Eventshuffle backend API

Built with [NestJS](https://github.com/nestjs/nest) framework.

Eventshuffle is an (currently imaginary) app that helps with arranging events and meetins. In the app you can create an event with multiple dates. Users can then vote for date(s) suitable for them. The app can then display the date(s) with most votes. date format is 'YYYY-MM-DD'.

## Requirements
To run with docker
- Docker V20 or newer
- Docker compose v2

Running the api locally:
- NodeJS v17 or newer
- npm v8 or yarn

## Installation
Navigate to the cloned repository

```bash
$ npm install
```
or
```bash
$ yarn install
```

# Environment variables
Create file named ```.env``` in the root folder 
```bash
$ cp .env.example .env
```
Fill out the required fields, you most likely have them in your email.

## Running the app and using it

```bash
$ docker-compose -f "docker-compose.yml" up -d --build
```
After running you can access API documentation at ```/api```

You can add example events by running these commands:

```curl -X POST http://localhost:3000/api/v1/event -H 'Content-Type: application/json' -d @exampleEvent.json```

```curl -X POST http://localhost:3000/api/v1/event -H 'Content-Type: application/json' -d @exampleEvent2.json```

Then you can use ````/api/v1/event/list``` to find the events

Navigate to ```/api``` to find API documentation

## License

MIT
