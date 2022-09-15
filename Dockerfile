FROM node:18-alpine AS build
RUN mkdir -p /app
WORKDIR /app
COPY --chown=node:node package*.json .
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
RUN npm install -f
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY .env ./
COPY tsconfig.json ./
COPY --chown=node:node --from=build /app/package*.json .
RUN npm install --omit=dev && npm cache clean --force
USER node
# RUN mkdir -p dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package*.json ./
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/prisma ./prisma

RUN npx prisma generate
# RUN npm run start:migrate:prod

# CMD ["node", "dist/main.js" ]

EXPOSE 5500

LABEL maintainer="thuongtruong1009 <"
LABEL org.opencontainers.image.source https://github.com/thuongtruong1009/teneno-api
LABEL org.opencontainers.image.description Docker Image of Teneno API application.
LABEL org.opencontainers.image.licenses MIT
