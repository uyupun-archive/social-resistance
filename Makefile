.PHONY: setup dev prod-up prod-down fix

setup:
	cp .env.example .env
	yarn

dev:
	yarn dev

prod-up:
	yarn build
	nohup yarn start > /dev/null 2>&1 &

prod-down:
	kill `lsof -i :3000 | awk '$$1 == "node" { print $$2 }'`

fix:
	yarn lint --fix

