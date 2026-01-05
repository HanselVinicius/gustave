ARG NODE_VERSION=24.3.0
FROM node:${NODE_VERSION}-alpine

ENV MESSAGE="FOR THOSE WHO COME AFTER"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 3000
CMD ["npm","start"]
