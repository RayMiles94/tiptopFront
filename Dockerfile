# Stage 1: Build the Angular app
FROM node:14.20.0 AS build

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build --prod --base-href=/http://localhost:4200/


# Stage 2: Serve the built Angular app with nginx
FROM nginx:1.21.3

COPY --from=build /app/dist/tiptop /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]