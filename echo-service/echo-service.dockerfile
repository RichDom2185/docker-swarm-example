FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
COPY tsconfig.json ./

RUN bun install

COPY src ./src

RUN bun build --compile ./src/main.ts --outfile ./echo-service

FROM debian:latest

WORKDIR /app

COPY --from=builder /app/echo-service ./

ENTRYPOINT [ "./echo-service" ]
