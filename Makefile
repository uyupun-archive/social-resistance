.PHONY: dev prod-down fix

setup:
	cp .env.example .env
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
