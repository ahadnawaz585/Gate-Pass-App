

# Gate Pass App REST API

This is a REST API for the Gate Pass App, built with Node.js, Prisma, Express, and TypeScript. It handles the backend operations for managing gate passes, including CRUD operations, authentication, and role-based access control.

## Features

- **CRUD Operations**: Create, read, update, and delete gate pass information.
- **Authentication**: Secure the API with JWT authentication.
- **Role-Based Access Control**: Manage permissions at a granular level.
- **TypeScript**: Strongly typed backend for better code quality and maintainability.

## Tech Stack

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Prisma**: ORM for database management.
- **TypeScript**: Superset of JavaScript for type safety.
- **PostgreSQL**: Database.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- PostgreSQL installed and running.
- Environment variables configured in a `.env` file.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/gate-pass-api.git
    cd gate-pass-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL="db://username:password@localhost:5432/gatePassSystem"
    JWT_SECRET="your_jwt_secret"
    CODE="your_code"
    ```

4. **Generate Prisma client**:
    ```bash
    npx prisma generate
    ```

5. **Run database migrations**:
    ```bash
    npx prisma migrate dev
    ```

6. **Start the server**:
    ```bash
    npm run dev
    ```

### API Endpoints

#### Authentication

- **POST /auth/login**: Login and receive a JWT token.
- **POST /auth/register**: Register a new user.

#### Gate Pass

- **GET /gatepasses**: Get all gate passes.
- **GET /gatepasses/:id**: Get a gate pass by ID.
- **POST /gatepasses**: Create a new gate pass.
- **PUT /gatepasses/:id**: Update a gate pass by ID.
- **DELETE /gatepasses/:id**: Delete a gate pass by ID.

### Project Structure

```
.
├── node_modules/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── Auth/
│   ├── assets/
│   ├── core/
│   ├── enums/
│   ├── environment/
│   ├── helper/
│   ├── middleware/
│   ├── modules/
│   ├── pdf/
│   └── types/
├── .env
├── package-lock.json
├── package.json
├── readme.md
├── server.js
├── server.ts
└── tsconfig.json
```

### Scripts

- **`npm run dev`**: Start the development server with hot-reloading.
- **`npm run build`**: Compile TypeScript to JavaScript.
- **`npm start`**: Start the compiled JavaScript server.


### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contact

For any inquiries or issues, please open an issue in this repository or contact us at ahadnawaz585@gmail.com.
```

