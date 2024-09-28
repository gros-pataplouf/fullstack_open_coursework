FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=todo-backend:*

CMD npm start