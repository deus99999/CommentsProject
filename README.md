# CommentsProject

Full-stack веб-приложение для управления комментариями. Проект построен на архитектуре разделения Backend (Django REST Framework) и Frontend (React + Vite) и полностью контейнеризирован с помощью Docker.

## Технологический стек

- **Backend:** Python 3.11, Django 5.x, DRF, SQLite
- **Frontend:** React 18, Vite
- **Infrastructure:** Docker, Docker Compose.

---

## Как скачать и запустить проект

Для запуска вам понадобится установленный Docker 

### 1. Клонирование репозитория

Откройте терминал (PowerShell или Git Bash) и выполните:
```bash
git clone https://github.com/deus99999/CommentsProject.git
```
```
cd CommentsProject
```


### 2.  Переменные окружения

Перед запуском проекта локально необходимо создать файлы:

 ```
.env.development в папке frontend со следующим содержимым:

VITE_API_URL=http://127.0.0.1:8004
```

```
.env в папке CommentsProject

# SERVER_IP=127.0.0.1
# FRONTEND_PORT=3000
```

### 3. Запуск проекта

Соберите и запустите контейнеры одной командой:

```bash
docker compose up --build
```

### Ссылка на проект

Локально проект работает на [http://localhost:3000](http://localhost:3000)
