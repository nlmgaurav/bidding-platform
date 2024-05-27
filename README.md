# Bidding Platform

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file and add your environment variables
4. Run the database migrations or SQL scripts to set up the database schema
5. Start the server: `npm run dev`

## Endpoints

- **POST /users/register**: Register a new user
- **POST /users/login**: Authenticate a user and return a token
- **GET /users/profile**: Get the profile of the logged-in user

- **GET /items**: Retrieve all auction items
- **GET /items/:id**: Retrieve a single auction item by ID
- **POST /items**: Create a new auction item
- **PUT /items/:id**: Update an auction item by ID
- **DELETE /items/:id**: Delete an auction item by ID

- **GET /items/:itemId/bids**: Retrieve all bids for a specific item
- **POST /items/:itemId/bids**: Place a new bid on a specific item

- **GET /notifications**: Retrieve notifications for the logged-in user
- **POST /notifications/mark-read**: Mark notifications as read

## WebSocket Events

- **connection**: Establish a new WebSocket connection
- **bid**: Place a new bid on an item
- **update**: Notify all connected clients about a new bid on an item
- **notify**: Send notifications to users in real-time
