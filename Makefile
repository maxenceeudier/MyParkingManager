prod:	
		docker-compose up --build -d

dev:	
		docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d 

re-prod:	stop prod

re-dev:		stop dev

stop:	
		docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

clean:
	docker system prune

.PHONY: prod dev stop re-prod re-dev