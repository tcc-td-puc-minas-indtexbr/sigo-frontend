FROM node:14.15.4-alpine

LABEL maintainer="allysson.lp@gmail.com"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

# python and g++ are mandatory due to Shards-Dashboard
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]