FROM node:18-alpine AS build-stage
WORKDIR /app
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS production-stage
WORKDIR /app
RUN chown -R node:node /app
USER node
RUN mkdir dist

COPY --chown=node:node /package*.json ./
COPY --chown=node:node --from=build-stage /app/dist ./dist
COPY --chown=node:node --from=build-stage /app/prisma ./prisma

RUN npm install --omit=dev && npm cache clean --force

# RUN npx prisma generate
# RUN npm run start:migrate:prod

ENV NODE_ENV production

CMD ["npm", "run", "start:prod" ]

EXPOSE 5500

LABEL maintainer="thuongtruong1009 <"
LABEL org.opencontainers.image.authors Thuong Truong <
LABEL org.opencontainers.image.source https://github.com/thuongtruong1009/teneno-api
LABEL org.opencontainers.image.description Docker Image of Teneno API application.
LABEL org.opencontainers.image.licenses MIT
LABEL org.opencontainers.image.documentation https://thuongtruong1009.github.io/teneno-api
