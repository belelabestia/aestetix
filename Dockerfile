FROM node:20-alpine
COPY . /repo
WORKDIR /repo
RUN npm ci
CMD npm run host-dev