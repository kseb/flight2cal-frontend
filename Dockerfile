FROM node:latest AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

FROM nginx:stable-alpine-slim

COPY --from=build /app/dist/flight2cal-frontend /usr/share/nginx/html

EXPOSE 80
