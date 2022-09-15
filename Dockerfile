FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
RUN chown -R node:node /app
USER node
RUN mkdir dist

COPY --chown=node:node /package*.json ./
COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/prisma ./prisma

RUN npm install --omit=dev && npm cache clean --force

# RUN npx prisma generate
# RUN npm run start:migrate:prod

CMD ["node", "dist/main.js" ]

EXPOSE 5500

LABEL maintainer="thuongtruong1009 <"
LABEL org.opencontainers.image.source https://github.com/thuongtruong1009/teneno-api
LABEL org.opencontainers.image.description Docker Image of Teneno API application.
LABEL org.opencontainers.image.licenses MIT
