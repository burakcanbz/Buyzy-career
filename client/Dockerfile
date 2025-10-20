FROM node:18-alpine AS builder
WORKDIR /app
COPY *package*.json ./
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 5001
CMD ["serve", "-s", "build", "-l", "5001"]