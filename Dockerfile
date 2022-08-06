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
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
CMD npm run start:prod

# CMD [ "node", "dist/main.js" ]
