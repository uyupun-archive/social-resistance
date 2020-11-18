.PHONY: prod-down fix

setup:
	cp .env.example .env
	-docker network create social_resistance
	yarn

up:
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
	yarn lint:js --fix
	yarn lint:scss --fix
