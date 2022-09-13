FROM node:18-alpine AS build
LABEL maintainer="thuongtruong1009 <"
WORKDIR /app
COPY --chown=node:node package*.json .
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev && npm cache clean --force
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package*.json ./
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/prisma ./prisma
# CMD npm run start:prod
CMD ["npm", "run", "start:migrate:prod" ]

EXPOSE 5500
