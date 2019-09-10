# stage: 1
FROM node:10 as basis
# Create app directory
WORKDIR /app

COPY . ./

RUN yarn install
RUN yarn build

# stage: 2 — the production environment
FROM nginx:alpine
COPY --from=basis /app/build /usr/share/nginx/html
COPY --from=basis /app/locales /usr/share/nginx/html/locales

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
