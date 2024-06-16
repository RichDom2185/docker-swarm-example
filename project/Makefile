PROJECT_NAME=example-project
COMPOSE_FILE=docker-compose.yml
FRONTEND_DOCKERFILE=../frontend/frontend.dockerfile
ECHOSERVICE_DOCKERFILE=../echo-service/echo-service.dockerfile

.PHONY: init up down dispose build-all build-echo-service build-frontend update

## init: initializes the project
init:
	@echo "Initializing Docker Swarm..."
	docker swarm init
	@echo "Docker Swarm initialized!"

## up: starts all services
up:
	@echo "Starting Docker services..."
	docker stack deploy --detach=false -c ${COMPOSE_FILE} ${PROJECT_NAME}
	@echo "Docker services started!"

## down: stops all services
down:
	@echo "Stopping Docker services..."
	docker stack rm ${PROJECT_NAME}
	@echo "Done!"

## dispose: stops all services and removes Docker Swarm
dispose: down
	@echo "Disposing Docker Swarm..."
	docker swarm leave --force
	@echo "Docker Swarm disposed!"

## build-all: builds all services
build-all: build-frontend build-echo-service
	@echo "Built all services!"

## build-frontend: builds frontend
build-frontend:
	@echo "Building frontend..."
	docker build -t frontend-example -f ${FRONTEND_DOCKERFILE} ../frontend
	@echo "Done!"

## build-echo-service: builds echo-service
build-echo-service:
	@echo "Building echo-service..."
	docker build -t echo-service-example -f ${ECHOSERVICE_DOCKERFILE} ../echo-service
	@echo "Done!"

## update: rebuilds and restarts echo-service
## we force --no-cache to generate a new random version number
update: build-echo-service
	@echo "Force-updating echo-service..."
	docker build --no-cache -t echo-service-example -f ${ECHOSERVICE_DOCKERFILE} ../echo-service
	docker service update --force ${PROJECT_NAME}_echo-service
	@echo "Done!"
