.PHONY: dev prod-down fix

setup:
	cp .env.example .env
	-docker network create social_resistance
	yarn

dev:
	yarn dev

prod-up:
	yarn
	yarn build
	rm -rf .nuxt
	rm -rf dist
	yarn build
	docker-compose -f docker-compose-prod.yml up -d

prod-down:
	-docker-compose -f docker-compose-prod.yml down

fix:
	yarn lint --fix
