# Docker Setup for ResHelp

This project has been dockerized with separate containers for different services:

## Services Architecture

- **Backend Container**: Node.js/Express API server (Port: 5000)
- **NLP Service Container**: FastAPI service for natural language processing (Port: 8001)
- **LaTeX Parsing Container**: FastAPI service for LaTeX document generation (Port: 8002)
- **Frontend**: Runs locally (not containerized) - uses Vite dev server

## Prerequisites

- Docker Desktop installed
- Docker Compose installed
- Node.js (for running frontend locally)

## Setup Instructions

### 1. Environment Configuration

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your actual values:
   - MongoDB connection string
   - JWT secret key
   - OAuth credentials (Google, GitHub)

### 2. Build and Run Services

#### For Production:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

#### For Development (with hot reload):

```bash
# Build and start all services in development mode
docker-compose -f docker-compose.dev.yml up --build

# Or run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build
```

### 3. Run Frontend Locally

The frontend is not containerized and should be run locally:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Service URLs

- **Backend API**: `http://localhost:5000`
- **NLP Service**: `http://localhost:8001`
- **LaTeX Service**: `http://localhost:8002`
- **Frontend**: `http://localhost:5173`

## Docker Commands

### Basic Operations

```bash
# Start services
docker-compose up

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs backend
docker-compose logs nlp-service
docker-compose logs latex-service

# Rebuild services
docker-compose up --build

# Remove containers and volumes
docker-compose down -v
```

### Development Commands

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Stop development environment
docker-compose -f docker-compose.dev.yml down
```

### Individual Service Management

```bash
# Start only backend
docker-compose up backend

# Start only NLP service
docker-compose up nlp-service

# Start only LaTeX service
docker-compose up latex-service
```

## Volumes

- **Backend**: `./uploads` is mounted to persist uploaded files
- **NLP Service**: Source code is mounted for development
- **LaTeX Service**: `./latexParsing/output` is mounted to persist generated files

## Networking

All services are connected via a custom Docker network (`app-network`) which allows:

- Inter-service communication using container names
- Isolation from other Docker networks
- Easy service discovery

## Troubleshooting

### Common Issues:

1. **Port conflicts**: Make sure ports 5000, 8001, and 8002 are not in use
2. **MongoDB connection**: Ensure MongoDB is running and accessible
3. **Environment variables**: Check that all required env vars are set in `.env`
4. **File permissions**: On Linux/Mac, ensure Docker has permission to access project files

### Debug Commands:

```bash
# Check running containers
docker ps

# Check container logs
docker logs <container-name>

# Execute command in running container
docker exec -it <container-name> /bin/bash

# Check network connectivity
docker network ls
docker network inspect resmern_app-network
```

## Development Workflow

1. Start Docker services:

   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. Start frontend locally:

   ```bash
   cd frontend && npm run dev
   ```

3. Make changes to your code (hot reload enabled in dev mode)

4. View logs to debug:
   ```bash
   docker-compose logs -f
   ```

## Production Deployment

For production deployment, you may want to:

1. Use production-ready MongoDB (Atlas, etc.)
2. Set up proper reverse proxy (Nginx)
3. Configure SSL/TLS certificates
4. Set up monitoring and logging
5. Use Docker Swarm or Kubernetes for orchestration

## File Structure

```
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ... (backend code)
├── nlp/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ... (NLP service code)
├── latexParsing/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ... (LaTeX service code)
├── frontend/
│   └── ... (frontend code - not containerized)
├── docker-compose.yml
├── docker-compose.dev.yml
├── .env.example
└── DOCKER_README.md
```
