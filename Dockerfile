FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs
