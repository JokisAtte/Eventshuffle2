FROM node:16-alpine As build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

COPY --from=build /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]