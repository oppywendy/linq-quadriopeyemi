# Linq Journeys API (mock)

This API provides routes for a mock journey service. It allows users to query and get available journeys between locations based on various sorting criteria such as number of exchanges, price, and duration.

## Features

- **JWT Authentication** for secure access
- Three types of journey sorting:
  - Sort by least exchanges
  - Sort by lowest price
  - Sort by shortest duration

## Requirements

- Node.js (>=v22.14.0)
- npm (or yarn) (>=10.9.2)
- Postman or any HTTP client for testing the API

## Installation

1. Install dependencies:
   ```bash
   npm ci
   ```

2. Start the server:
   ```bash
   npm start
   ```

   The API will run at `http://localhost:3000`.

## API Endpoints

### Authentication

#### POST /login
**Request Body**:
```json
{
  "username": "user1",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "your-jwt-token"
}
```

### Journeys

#### GET /journeys/exchanges
Returns journeys sorted by the least number of exchanges.

**Query Parameters**:
- `origin`: Starting location.
- `destination`: Destination location.

**Example Request**:
```http
GET http://localhost:3000/journeys/exchanges?origin=A&destination=C
```

**Response**:
```json
{
  "origin": "A",
  "destination": "C",
  "journeys": [
    {
      "route": ["A", "C"],
      "exchanges": 1,
      "price": 1000,
      "duration": 8
    },
    ...
  ]
}
```

#### GET /journeys/cheapest
Returns journeys sorted by the cheapest price.

**Query Parameters**:
- `origin`: Starting location.
- `destination`: Destination location.
- `departure`: Departure time (optional, format: `+X day Y hour`).

**Example Request**:
```http
GET http://localhost:3000/journeys/cheapest?origin=A&destination=C&departure=+1 day 5 hour
```

**Response**:
```json
{
  "origin": "A",
  "destination": "C",
  "departure": "+1 day 5 hour",
  "journeys": [
    {
      "route": ["A", "C"],
      "exchanges": 1,
      "price": 1000,
      "duration": 8
    },
    ...
  ]
}
```

#### GET /journeys/fastest
Returns journeys sorted by the shortest duration.

**Query Parameters**:
- `origin`: Starting location.
- `destination`: Destination location.
- `departure`: Departure time (optional, format: `+X day Y hour`).

**Example Request**:
```http
GET http://localhost:3000/journeys/fastest?origin=A&destination=C&departure=+1 day 5 hour
```

**Response**:
```json
{
  "origin": "A",
  "destination": "C",
  "departure": "+1 day 5 hour",
  "journeys": [
    {
      "route": ["A", "C"],
      "exchanges": 1,
      "price": 1000,
      "duration": 8
    },
    ...
  ]
}
```

#### GET /journeys
Returns a paginated list of all mock journeys.

**Query Parameters**:
- `page`: The page number (default: `1`).
- `limit`: The number of journeys per page (default: `10`).

**Example Request**:
```http
GET http://localhost:3000/journeys?page=1&limit=10
```

**Response**:
```json
{
  "page": 1,
  "limit": 10,
  "totalJourneys": 1000,
  "totalPages": 100,
  "journeys": [...]
}
```

## Authentication

The API uses **JWT** for authentication. To obtain a JWT token, use the `/login` endpoint with valid credentials. Include the token in the `Authorization` header when accessing protected routes.

```http
Authorization: Bearer your-jwt-token
```

