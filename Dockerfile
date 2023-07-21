FROM node:16-alpine AS build
WORKDIR /app

COPY . .
RUN npm install --f
RUN npm run build
# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/angular/ /usr/share/nginx/html

