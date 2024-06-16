# Docker Swarm Example

This is a simple example of how to use Docker Swarm to deploy a simple web application.

This example focuses on zero-downtime deployments even with only a single replica.

## Prerequisites

- Docker

> [!NOTE]
> Developing locally? See [Local Testing](#local-testing) section.

## Setting Up

1. Go into the `project` directory

1. Build the Docker images

    ```bash
    make build-all
    ```

## Demo

You can refer to the individual recipes in the `Makefile` for the commands.

1. Go into the `project` directory.

1. Start the Docker Swarm

    ```bash
    make init
    ```

1. Deploy the stack

    ```bash
    make up
    ```

1. Access the frontend at `http://localhost:3000`

The frontend pings the specified backend every second, the results of which are shown on screen. This will help us see if there are any downtimes during deployments.

## Zero-Downtime Deployment

The backend is configured to simulate a slow startup by having a fake delay of 5 seconds before it starts processing requests.

This is in addition to the inevitable delay in pulling and/or rebuilding and/or starting the new container.

1. Force update the backend

    ```bash
    make update
    ```

1. Watch the frontend at `http://localhost:3000`

You should see that the frontend continues to work even when the backend is being updated.

The moment the new backend is ready, Docker Swarm automatically redirects the traffic to the new backend, and the frontend should flash with the new backend's ID and timestamp.

Watch the terminal for the logs to see the zero-downtime deployment in action.

## Local Testing

You need to have [Bun](https://bun.sh) installed for the backend, and [live-server](https://www.npmjs.com/package/live-server) for the frontend. You can also use the VS Code Live Server extension.

The backend is a simple Express server ("echo service") that returns a JSON response with the server's ID and timestamp. It also has a healthcheck endpoint at `/health` for Docker Swarm to check if the container is healthy.

In addition, the backend has a 5-second delay before it starts processing requests.

To run the backend:

```bash
cd echo-service
bun install
bun dev
```

The frontend is a simple static HTML page with a JavaScript script that pings the backend every second and displays the results on screen.

If you are using VS Code, the appropriate editor settings have been commited to `.vscode/settings.json` so that you can use the Live Server extension to edit the frontend.

The frontend deployment consists of a simple setup using NGINX to serve the static files, but the NGINX configuration also sets up a `/proxy` endpoint to demonstrate that the different services can communicate with each other.
