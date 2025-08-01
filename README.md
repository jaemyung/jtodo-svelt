# Todo App with Svelte, TypeScript, and PostgreSQL

A modern todo application built with Svelte, TypeScript for the frontend, and PostgreSQL with Docker for the backend.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit todo titles inline
- ✅ Modern, responsive UI
- ✅ TypeScript for type safety
- ✅ PostgreSQL database with Docker
- ✅ RESTful API backend

## Tech Stack

### Frontend
- **Svelte** - Modern reactive framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **PostgreSQL** - Relational database
- **Docker** - Containerization

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn

## Quick Start

### 1. Start the PostgreSQL Database

```bash
# Start PostgreSQL with Docker
docker-compose up -d
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Start the Backend Server

```bash
# Start the backend API server
cd backend
npm run dev
```

The backend will be running on `http://localhost:5000`

### 4. Start the Frontend Development Server

In a new terminal:

```bash
# Start the frontend development server
npm run dev
```

The frontend will be running on `http://localhost:3000`

## Project Structure

```
jtodo-svelte/
├── src/
│   ├── components/
│   │   └── TodoItem.svelte
│   ├── lib/
│   │   └── api.ts
│   ├── types/
│   │   └── todo.ts
│   ├── App.svelte
│   ├── app.css
│   └── main.ts
├── backend/
│   ├── server.js
│   └── package.json
├── docker-compose.yml
├── package.json
├── vite.config.ts
└── README.md
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `GET /api/health` - Health check

## Database Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Development

### Frontend Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check
```

### Backend Development

```bash
cd backend

# Start development server with nodemon
npm run dev

# Start production server
npm start
```

## Docker Commands

```bash
# Start PostgreSQL
docker-compose up -d

# Stop PostgreSQL
docker-compose down

# View logs
docker-compose logs postgres

# Reset database (removes all data)
docker-compose down -v
docker-compose up -d
```

## Environment Variables

The backend uses the following environment variables (defaults shown):

- `PORT=5000` - Backend server port
- `DB_USER=postgres` - Database username
- `DB_HOST=localhost` - Database host
- `DB_NAME=todo_db` - Database name
- `DB_PASSWORD=password` - Database password
- `DB_PORT=5432` - Database port

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT 