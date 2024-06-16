# oven/bun image can't seem to pull,
# so we install Bun manually
FROM debian:12.5 AS builder

RUN apt-get update && apt-get install -y unzip curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://bun.sh/install | BUN_INSTALL=/usr/local bash

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
