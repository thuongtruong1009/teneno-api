FROM node:18-alpine AS build
LABEL maintainer="thuongtruong1009 <"
WORKDIR /app
COPY --chown=node:node package*.json .
COPY prisma ./prisma/
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev && npm cache clean --force
USER node
RUN mkdir dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package*.json ./
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/prisma ./prisma

RUN npm run start:migrate:prod

CMD ["node", "dist/main.js" ]

EXPOSE 5500
