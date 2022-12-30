## Description

Eventshuffle backend API

Built with [NestJS](https://github.com/nestjs/nest) framework.

Eventshuffle is an (currently imaginary) app that helps with arranging events and meetins. In the app you can create an event with multiple dates. Users can then vote for date(s) suitable for them. The app can then display the date(s) with most votes. date format is 'YYYY-MM-DD'.

## Requirements
- NodeJS version 17 or newer (and npm)
- Docker V20 or newer
- Docker compose v2

## Installation
Navigate to the cloned repository

```bash
$ npm install
```

# Environment variables
Create file named ```.env``` in the root folder 
```bash
$ cp .env.example .env
```
Fill out the required fields, you most likely have them in your email.

## Running the app

```bash
$ docker-compose -f "docker-compose.yml" up -d --build
```
After running you can access API documentation at ```/api```

## License

MIT
