# Note-Taking Application

A full-stack note-taking application built with React, Node.js, Express, PostgreSQL, and Docker.

## Project Structure

```
372asn3/
├── note-taking-application/
│   ├── client/              # React frontend
│   ├── server/              # Node.js/Express backend
│   ├── nginx/               # Nginx reverse proxy
│   └── docker-compose.yml   # Docker orchestration
└── docker-compose.yml       # Root Docker Compose file
```

## Technologies

- **Frontend**: React 18, React Bootstrap, Axios, React Router
- **Backend**: Node.js, Express, PostgreSQL
- **Infrastructure**: Docker, Docker Compose, Nginx
- **Database**: PostgreSQL

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anthonytrieu/372asn3.git
   cd 372asn3
   ```

2. Start the application with Docker Compose:
   ```bash
   docker-compose up
   ```

3. Access the application at [http://localhost:3000](http://localhost:3000)

### Development

To run in development mode with hot reload:

```bash
docker-compose up
```

The application will automatically reload when you make changes to the source code.

## Features

- Create, read, update, and delete notes
- Persistent storage with PostgreSQL
- Responsive UI with Bootstrap
- Containerized deployment

## API Endpoints

The backend API runs on the `/api` endpoint through the Nginx proxy.

## Environment Variables

The application uses the following environment variables (configured in docker-compose.yml):

- `PGUSER`: PostgreSQL username
- `PGHOST`: PostgreSQL host
- `PGDATABASE`: PostgreSQL database name
- `PGPASSWORD`: PostgreSQL password
- `PGPORT`: PostgreSQL port


ISC
