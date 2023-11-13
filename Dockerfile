# Stage 1: Build the Angular app
FROM node:14.20.0 AS build-step
WORKDIR /app
COPY . ./
RUN npm install --force
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build-step   /app/dist/tiptop /usr/share/nginx/html
EXPOSE 80