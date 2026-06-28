FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json /app/

RUN npm install

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules

COPY app.js /app/

COPY package*.json /app/

EXPOSE 3000

CMD ["node", "app.js"]