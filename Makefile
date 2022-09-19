APP_NAME = teneno-api
APP_NAME := $(APP_NAME)

.PHONY: build

build-dev:
	docker build -t ${APP_NAME}\
		--target build-stage\
		-f Dockerfile .

build:
	docker build -t ${APP_NAME}\
		--target production-stage\
		-f Dockerfile .

clean:
	docker rmi -f ${APP_NAME}

run:
	docker run -d -it -p 5500:5500 ${APP_NAME}

all: build
