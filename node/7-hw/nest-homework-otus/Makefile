db_restart: db_remove db_up db-migrate

start:
	yarn start:dev

db-migrate:
	npx prisma migrate deploy

db_remove:
	yarn db:dev:rm

db_up:
	yarn db:dev:up

e2e:
	yarn test:e2e
