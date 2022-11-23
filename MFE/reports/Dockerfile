FROM node:14-bullseye as basis

WORKDIR /opt/app

ARG DOJOT_VERSION=undefined
ENV GUI_VERSION $DOJOT_VERSION

COPY package.json .
COPY yarn.lock .
RUN yarn install --only=prod
COPY . .
RUN yarn build


FROM nginx:1.19

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=basis /opt/app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d

WORKDIR /opt/app

EXPOSE 80
