# build environment
FROM node:14.15.4-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm ci \
    && apk del build-dependencies

#add app
ADD . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html

RUN ls

COPY ./build /var/www
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
# COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]