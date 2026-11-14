# Product Showcase – React and Express Backend

## Project Description
Product Showcase is a web application built using React. It displays products and provides shopping cart functionality. An Express.js backend provides REST API endpoints for retrieving products and managing cart items.

## Technologies Used
- React.js
- JavaScript
- Redux
- Node.js
- Express.js
- CORS
- REST API

## Features
- Display product information
- View all available products
- Add products to the shopping cart
- View cart items and quantities
- React frontend and Express backend
- In-memory data storage

## Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend server |
| GET | `/products` | Retrieve all products |
| POST | `/cart` | Add a product to cart |
| GET | `/cart` | Retrieve cart items |

## Backend Setup

1. Open the project folder in PowerShell.
2. Navigate to the server folder:

```bash
cd server
```

3. Install dependencies:

```bash
npm install
```

4. Start the backend:

```bash
npm run dev
```

Backend URL: `http://localhost:5000`

## API Testing

The backend APIs can be tested using Postman or PowerShell.

Example POST request:

```json
{
  "productId": 1
}
```

## Note
Product and cart data are stored in in-memory arrays. The cart data resets when the backend server restarts.

## Author
Nupur Jadhav
