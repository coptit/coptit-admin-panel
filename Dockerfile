FROM node:19-alpine3.16

WORKDIR /admin-panel
COPY . .
RUN npm ci
RUN npm run build

EXPOSE 4000
EXPOSE 4001
EXPOSE 4002

CMD [ "npm", "start" ]
