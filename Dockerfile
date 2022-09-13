FROM node:18-alpine as build
LABEL maintainer="thuongtruong1009 <"
WORKDIR /
COPY --chown=node:node package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /
COPY package.json .
# COPY prisma ./prisma/
RUN npm install --omit=dev && npm cache clean --force
COPY --chown=node:node --from=build /dist ./dist
CMD npm run start:prod

EXPOSE ${BASE_PORT}
