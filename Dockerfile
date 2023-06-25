# Specify a base image
FROM node:18 as build-deps

WORKDIR /usr/src/app
COPY . ./

RUN yarn && yarn build && yarn global add serve

WORKDIR /usr/src/app/build

CMD serve -p 80 -s . 
