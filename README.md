# Product Showcase

A responsive product showcase web application built with **Next.js, React, and Redux Toolkit**. The project demonstrates product browsing, dynamic product pages, and state management, with Sentry integration for error monitoring.

## Features

- Responsive product showcase interface
- Dynamic product detail pages
- Redux Toolkit for state management
- Next.js Pages Router
- Error monitoring with Sentry
- Server-side and browser-side error monitoring
- Sentry example page for testing error reporting

## Technologies Used

- Next.js
- React
- JavaScript
- Redux Toolkit
- React Redux
- CSS
- Sentry Next.js SDK
- Netlify

## Sentry Error Monitoring

This project integrates Sentry to help monitor and identify application errors.

Sentry configuration includes:

- `instrumentation.js`
- `instrumentation-client.js`
- `sentry.server.config.js`
- `sentry.edge.config.js`
- `pages/_error.jsx`
- `next.config.js`

A sample testing page is available at:

`/sentry-example-page`

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/jadhavnupur60-dev/product-showcase.git
   ```

2. Navigate to the project folder:

   ```bash
   cd product-showcase
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open:

   `http://localhost:3000`

## Production Build

Run:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Deployment

The project is deployed using Netlify.

Live Demo: https://product-showcase-eg3q.netlify.app

## GitHub Repository

https://github.com/jadhavnupur60-dev/product-showcase

## Security

- Never upload authentication tokens or secret environment files.
- `.env.sentry-build-plugin` must remain excluded from Git.
- Keep private credentials in environment variables.

## Author

Product Showcase Project
