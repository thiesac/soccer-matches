# TSC - The Soccer Club 

TSC (The Soccer Club) is an informative website for football matches and standings! ⚽️

In the development of TSC, I created a comprehensive backend API using Test-Driven Development (TDD) methodology. This API is designed to provide data for a football-related website. The frontend for this project was generously provided by Trybe.

## Table of Contents

- [Installation](#installation)
- [Database](#database)
- [API](#api)
- [Docker](#docker)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)

## Installation

To get TSC up and running on your local machine, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/thiesac/soccer-matches.git
   ```

2. Change to the project directory:

   ```bash
   cd soccer-matches
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure your environment variables. You can use the provided `.env.example` as a template.

5. Start the application:

   ```bash
   npm start
   ```

Now, the TSC API is running on `http://localhost:3001`.

## Database

TSC uses a Docker container for MySQL, which is already configured in the `docker-compose.yml` file. The MySQL container provides the data for the backend. It can be accessed via Sequelize through port 3306 on localhost during testing.

You can also connect to the MySQL database using a MySQL client (e.g., Workbench, Beekeeper, DBeaver) with the credentials configured in the `docker-compose.yml` for the 'db' service.

## API

### Project Structure

The TSC project is structured as follows:

- `app/backend/src`: Contains the backend source code.
- `app/backend/src/database`: Includes database migrations and models.
- `app/backend/packages.npm`: Lists additional dependencies used in the project.
- `app/backend/src/tests`: Houses integration tests.

### Endpoints

#### Teams

1. **GET /teams**

   - Retrieves a list of all football teams.

   Example Response:

   ```json
   [
     {
       "id": 1,
       "teamName": "Avaí/Kindermann"
     },
     {
       "id": 2,
       "teamName": "Bahia"
     },
     {
       "id": 3,
       "teamName": "Botafogo"
     },
     ...
   ]
   ```

#### Authentication

2. **POST /login**

   - Allows user login with valid credentials.
   - Requires a JSON body with `email` and `password`.
   - Returns a JWT token upon successful login.

   Example Response:

   ```json
   {
     "token": "your-jwt-token-here"
   }
   ```

   For more API endpoints and detailed documentation, please refer to the API reference or explore the codebase.

## Docker

The TSC project includes a Docker Compose configuration to simplify deployment. You can use the following command to start the entire application:

```bash
npm run compose:up
```

## Contributing

Contributions to this project are welcome! If you have bug fixes, feature additions, or improvements, please feel free to open an issue or submit a pull request.


## Acknowledgments

I would like to acknowledge and express my gratitude to [Trybe](https://www.betrybe.com/) for their support and guidance throughout the development of this educational resource.

