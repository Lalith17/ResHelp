@echo off
echo Starting ResHelp Docker Services...
echo.

echo Checking if .env file exists...
if not exist .env (
    echo .env file not found. Creating from template...
    copy .env.example .env
    echo.
    echo Please edit .env file with your actual values before running again.
    pause
    exit /b 1
)

echo Building and starting Docker containers...
docker-compose up --build

echo.
echo Docker containers started successfully!
echo.
echo Services running at:
echo - Backend API: http://localhost:5000
echo - NLP Service: http://localhost:8001
echo - LaTeX Service: http://localhost:8002
echo.
echo To start the frontend, run:
echo cd frontend && npm install && npm run dev
echo.
pause
