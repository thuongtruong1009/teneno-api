FROM node:18-alpine as build
WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY prisma ./prisma/ 
RUN npm install --omit=dev && npm cache clean --force
COPY --chown=node:node --from=build /app/dist ./dist
CMD npm run start:prod


EXPOSE 5500
