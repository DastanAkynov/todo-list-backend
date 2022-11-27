# Todo List API
Backend приложение "Todo list api", на базе стэков:
- NestJS - сервер
- PostgreSQL - база данных
- TypeOrm - интерагиция с б/д и миграции
- Docker - контейниризация

## Методы для установки и запуска

1. Склонируйте репозиторий к себе локально

```shell
git clone https://github.com/DastanAkynov/todo-list-backend.git
```

2. Создайте в корне репозитория .env файл. Пример:

```dotenv
PORT=8000
JWT_SECRET_KEY=jwt-secret
JWT_ACCESS_TIME=1d
JWT_REFRESH_TIME=30d

DB_USER=postgres
DB_SECRET=2000-2000
DB_NAME=todo-list_db
```
3. Запустите проект


### Документация к проекту

Путь к документации:
```shell
/doc/api
```

Пример: [http://localhost:8000/doc/api](http://localhost:8000/doc/api)


### Запуск проекта с помощью Docker

При запуске проекта с помощью Docker, миграции запускаются автоматически

```shell
docker-compose up
# -d - для запуска в фоне
# --build - для повторной пересборки контейнеров
```


### Запуск локально

```shell
# установка зависимостей
npm install
# запуск миграций
npm run migration:run
# запуск проекта в development режиме
npm run dev
```

```shell
# build проекта
npm run build
```


### Миграции
```shell
# scripts
npm run migration:create "name"
npm run migration:generate "name"
npm run migration:run
npm run migration:revert
```