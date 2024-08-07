
#!/bin/bash

OS := $(shell uname)

ifeq ($(OS),Darwin)
	UID = $(shell id -u)
	IP_DEBUG = host.docker.internal
else ifeq ($(OS),Linux)
	UID = $(shell id -u)
	IP_DEBUG = 172.17.0.1
else
	UID = 1000
	IP_DEBUG = host.docker.internal
endif

help: ## Muestra este mensaje de ayuda
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

run: ## Arranca los contenedores
	U_ID=${UID} IP_DEBUG=${IP_DEBUG} docker compose -f docker-compose-debug.yml --env-file ./docker/api.env up -d --build

stop: ## Detiene los contenedores
	U_ID=${UID} docker compose -f docker-compose-debug.yml --env-file ./docker/api.env stop

restart: ## Reinicia los contenedores
	$(MAKE) stop && $(MAKE) run

sh: ## Ingresa al contenedor por su terminal bash
	U_ID=${UID} docker-compose -f docker-compose-debug.yml --env-file ./docker/api.env exec --user ${UID} app bash

log: ## Muestra el log del contenedor
	U_ID=${UID} docker-compose -f docker-compose-debug.yml --env-file ./docker/api.env logs --tail 1000 -f app
