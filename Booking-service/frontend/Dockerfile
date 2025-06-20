# Etap 1: budowanie aplikacji
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# Kopiujemy wszystko dla Vite (by dostał swój cholerny index.html)
# Używamy .dockerignore by nie było nieefektywne
# Panie Miotk, pan da 3

# Etap 2: serwowanie przez nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# ZAMIENIAMY DEAFULT CONFIG NA WŁASNY
EXPOSE 80
# MÓWIMY DOCKERUSSY GDZIE BĘDZIE SŁUCHAĆ
# TO SAMO W DOCKERFILE, CAUSE YA GOTTA MAP IT STILL
CMD ["nginx", "-g", "daemon off;"]