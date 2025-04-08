FROM node:20

WORKDIR /user/src/todo-app

COPY --chown=node:node . .

RUN npm ci

USER node

CMD npm start
