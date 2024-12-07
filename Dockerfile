FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install --omit=dev

RUN npm run build

FROM nginx:stable-alpine-slim

COPY --from=build /usr/local/app/dist/flight2cal-frontend /usr/share/nginx/html

EXPOSE 80
