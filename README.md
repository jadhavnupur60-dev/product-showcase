# Product Showcase – React Application

A responsive React application that displays products, allows users to add products to a shopping cart, and supports Progressive Web App (PWA) installation.

## Features

- Display products using data fetched from `public/products.json`.
- Add products to the shopping cart.
- Increase product quantity when adding the same product again.
- Remove individual products from the cart.
- Clear all products from the cart.
- Calculate total items and total cart price.
- Display loading and error messages while fetching products.
- Redux Toolkit for cart state management.
- Save cart data automatically in browser localStorage.
- PWA installation support with an Add to Home Screen option.
- Image optimization using ImageMinimizerPlugin.

## Technologies Used

- React.js
- JavaScript
- Redux Toolkit
- React Redux
- HTML5
- CSS3
- Jest
- React Testing Library
- jest-fetch-mock
- CRACO
- Progressive Web App (PWA)

## Project Structure

```text
product-showcase/
│
├── public/
│   ├── products.json
│   ├── index.html
│   ├── manifest.json
│   └── service-worker.js
│
├── src/
│   ├── components/
│   │   ├── InstallPWA.js
│   │   └── InstallPWA.test.js
│   │
│   ├── redux/
│   │   ├── cartSlice.js
│   │   ├── cartSlice.test.js
│   │   ├── store.js
│   │   └── store.test.js
│   │
│   ├── App.js
│   ├── App.test.js
│   ├── Cart.js
│   ├── Cart.test.js
│   ├── ProductCard.js
│   ├── ProductList.js
│   ├── ProductList.test.js
│   └── setupTests.js
│
├── craco.config.js
├── package.json
└── README.md
```

## Installation and Setup

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Open the project folder:

```bash
cd product-showcase
```

3. Install dependencies:

```bash
npm install
```

4. Start the application:

```bash
npm start
```

The application will run locally at:

`http://localhost:3000`

## Testing

This project uses Jest and React Testing Library to test application functionality.

Run all tests:

```bash
npm test -- --watchAll=false
```

Run tests with coverage:

```bash
npm test -- --watchAll=false --coverage
```

## Test Cases

The test suite covers:

1. Mock API fetch calls using jest-fetch-mock.
2. Display fetched products.
3. Add products to the Redux cart.
4. Display the loading message while fetching.
5. Display an error when API fetching fails.
6. Test empty cart display.
7. Test product details and total price.
8. Test removing products from the cart.
9. Test clearing the cart.
10. Test PWA installation availability.
11. Test the installation prompt and successful installation.
12. Test Redux store creation and localStorage persistence.
13. Test error handling when localStorage saving fails.

## Test Results and Coverage

All 21 tests passed successfully across 6 test suites.

| Coverage Metric | Result |
|---|---:|
| Statements | 95.50% |
| Branches | 83.33% |
| Functions | 100% |
| Lines | 96.47% |

**Required statement coverage:** 80%

**Achieved statement coverage:** 95.50%

## Coverage Report

After running the coverage command, open:

`coverage/lcov-report/index.html`

This report displays detailed coverage information for the tested application files.

## Purpose

The purpose of this project is to demonstrate React application development, Redux state management, API fetching, PWA functionality, and automated testing using Jest and React Testing Library.

## Author

**Nupur Jadhav**

GitHub: https://github.com/jadhavnupur60-dev
