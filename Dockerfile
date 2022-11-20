FROM node:16.10-alpine AS builder

WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN ng build --configuration production

FROM nginx:1.17-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /src/app/dist/shop-manager /usr/share/nginx/html

