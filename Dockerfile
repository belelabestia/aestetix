FROM node:20-alpine
COPY . /repo
WORKDIR /repo
RUN npm ci
RUN npm run host-dev