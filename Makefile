prod:	
		docker-compose up --build 

re-prod:	stop prod

stop:	
		docker-compose -f docker-compose.yml -f down

clean:
	docker system prune -a && docker volume prune

.PHONY: prod  stop re-prod clean