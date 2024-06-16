FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
COPY tsconfig.json ./

RUN bun install

COPY src ./src

RUN bun build --compile ./src/main.ts --outfile ./echo-service

FROM debian:latest

RUN apt-get update && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/echo-service ./

ENTRYPOINT [ "./echo-service" ]
