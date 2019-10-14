#build
FROM node:latest as builder

WORKDIR /usr/src/teravoz

ARG NPM_TOKEN

COPY package.json .

RUN npm install --only-production

COPY . .

RUN npm run build

#serve
FROM node:alpine

WORKDIR /usr/src/teravoz

RUN npm install pm2 -g

RUN apk update && apk add --no-cache libc6-compat
RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2

COPY --from=builder /usr/src/teravoz/node_modules ./node_modules

COPY --from=builder /usr/src/teravoz/dist .

EXPOSE 3000 4000

CMD [ "pm2-runtime", "index.js" ]