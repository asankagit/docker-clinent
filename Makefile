build:
	sudo docker build . -t asanka/node-web-app
run:
	sudo docker run -p 49160:8080 asanka/node-web-app
