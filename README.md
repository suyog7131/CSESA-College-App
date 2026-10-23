# CSESA Website

A full-stack web application for CSESA (Computer Science & Engineering Student Association).

## Project Structure

```
csesa-website/
├── frontend/    # React + Vite frontend
└── backend/     # Spring Boot + Java backend
```

## Frontend (React + Vite)

### Prerequisites
- Node.js 18+ (install from https://nodejs.org)

### Run locally
```bash
cd frontend
npm install      # install dependencies (creates node_modules)
npm run dev      # start dev server at http://localhost:5173
```

### Build for production
```bash
npm run build    # outputs to dist/
```

## Backend (Spring Boot + Java)

### Prerequisites
- Java 21+ (install from https://adoptium.net)
- Maven (or use the included `mvnw` wrapper)

### Run locally
```bash
cd backend
./mvnw spring-boot:run    # on Mac/Linux
mvnw.cmd spring-boot:run   # on Windows
```

The backend starts at http://localhost:8080 with an in-memory H2 database.

### H2 Database Console
Visit http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:csesadb`
- Username: `sa`
- Password: (leave empty)

## Tech Stack

| Layer    | Technology                     |
|----------|--------------------------------|
| Frontend | React 18, Vite, React Router   |
| Backend  | Spring Boot, Java 21, Maven    |
| Database | H2 (in-memory)                 |

## License

This project is for educational purposes.
