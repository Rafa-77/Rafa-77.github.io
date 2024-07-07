# Project02

## Construction Steps:

1. Backend:
   - API
   - Database
   - Handle users
   - etc...
2. Frontend: User facing component
   - Interact with the API
   - Make notes
   - Sign in/out
   - etc...
3. Connect database with the Backend
4. Deploy the backend, frontend and connect them.

## Instructions:

## Backend:

0. cd D:\alex\_\Documents\Programacion\DJANGO\Proyecto02
1. Create/connect venv.
2. Install the requirements.txt
   - If using conda use conda-forge
3. Create new Django Project in \Proyecto02\backend
   - django-admin startproject backend
4. Create app
   - python manage.py startapp api
5. Set up your **backend/settings.py** file.

```python
# Extra code:
from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

# ...

ALLOWED_HOST = ["*"]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSESS": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

# Application definition
# ...

INSTALLED_APPS = [
    # ...
    "api",
    "rest_framework",
    "corsheaders",
    ]

MIDDLEWARE = [
    # ...
    "corsheaders.middleware.CorsMiddleware",
]

# DEFAULT_AUTO_FIELD = ["django.db.models.BigAutoField"]
# ...

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWS_CREDENTIALS = True
```

6. Create & modify the **api/serializers.py** file
7. Modify the **api/views.py** file
8. Create & modify the **api/urls.py** file
9. Modify the **backend/urls.py** file
   - Include urls from the **api/urls.py** file.
10. Run migrations.
11. Create Models in **api/models.py** file
    - Make serializer for the model

## Frontend:

0. cd D:\alex\_\Documents\Programacion\DJANGO\Proyecto02
1. Create react project

```bash
npm create vite@latest frontend -- --template react
```

2. install packages:

```bash
conda install -c conda-forge nodejs=18 - npm install axios react-router-dom jwt-decode
```

3. cd \Proyecto02\frontend
4. Create auxiliary dirs in src dir.

- components:
  - ProtectedRoute
- pages:
- styles:

5. Create ".env" file in frontend dir.
6. Create constants.js and api.js files.
7. Modify App.jsx and main.jsx

## Deployment:

We need to deploy de database, the backend and the frontend.
We will use Choreo for this.

1. **Deploy database:**

- https://console.choreo.dev/organizations/ramvsoft/dependencies/databases
- Create.
- PostgreSQL
- NOTE: The database will be powered off every hour in the free version.
- Copy all the information in an environment variable file.

```python
DB_HOST=""
DB_PORT=
DB_USER=""
DB_NAME=""
DB_PWD=""
```

2. **Connect DB in Choreo with Django.**

- \backend\backend\settings.py

```python
# Original
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# New
load_dotenv()
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.getenv("DB_HOST"),
        'PORT': os.getenv("DB_PORT"),
        'USER': os.getenv("DB_USER"),
        'NAME': os.getenv("DB_NAME"),
        'PASSWORD': os.getenv("DB_PWD"),
    }
}
```

- Run migrations

**4. Deploy Configuration**

- Make a git repository.
- Remember to gitignore the env.
- Make deployment oriented files-
  - endpoints.yaml and procfile
- in \Proyecto02 run:

```bash
git init
git add .
git commit -m "fist commit"
git branch -M main
git remote add origin https://github.com/Rafa-77/Proyecto02.git
git push -u origin main
```

**5. Choreo Proyect Setup**

- Choreo Overview Tab
- Create Project
- Create back end service for the Rest API
  - python
- Create front end web APP
  - React
  - Build command: npm install && npm run build
  - Buid path: /dist

**5. Backend Deplayment**

- Build tab
  - Build Latest
- Deploy tab
  - Configure deploy
  - Deploy
  - Manage Configs and Secrets
    - Create secret and environment variable
      - Copy and contents of the env file to this variables, without quotation marks
- Endpoint configurations
  - API visibility: Public
  - Dissalbe security scheme

**6. Frontend deployment**

- Build tab
  - Build Latest
- Deploy tab

  - Authentication Settings - Dissable managed auth with choreo -
    **7. Connect Frontend and Backend**

- Frontend
  - Dependencies tab
    - Connections
      - Create
      - Backend Rest API
      - NOTE: Steps on the right hand are for the choreo auth
      - Copy service URL
        - Paste in \frontend\src\api.js
      - Push in git
      - Build Latest
      - Redeploy
