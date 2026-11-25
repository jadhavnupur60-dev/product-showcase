# Product Showcase – Next.js SSR Migration

A responsive Product Showcase web application migrated from React to **Next.js** with Server-Side Rendering (SSR). The application displays products, provides individual product detail pages, and supports shopping cart functionality using Redux Toolkit.

## Features

- **Server-Side Rendering (SSR):** Uses Next.js `getServerSideProps()` to fetch product data on the server for each request.
- **Product Listing:** Displays products with images, names, prices, and descriptions.
- **Product Details:** Individual dynamic product pages using the Next.js Pages Router.
- **Shopping Cart:** Add products, remove products, and clear the cart.
- **Quantity Management:** Automatically increases quantity when an existing product is added again.
- **Cart Persistence:** Saves cart data in browser localStorage.
- **Responsive Design:** CSS Modules for product presentation and styling.
- **SEO Support:** Uses Next.js Head to add page titles and meta descriptions.

## Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | SSR and page routing |
| React | User interface |
| Redux Toolkit | Shopping cart state management |
| React Redux | Connecting React components to Redux |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS Modules | Component styling |
| Node.js | Development environment |
| JSON | Product data storage |

## Project Structure

```text
product-showcase/
│
├── pages/
│   ├── _app.js
│   ├── index.js
│   └── product/
│       └── [id].js
│
├── store/
│   └── store.js
│
├── src/
│   ├── redux/
│   │   ├── cartSlice.js
│   │   └── store.js
│   ├── App.module.css
│   ├── ProductCard.js
│   ├── ProductCard.module.css
│   ├── ProductList.js
│   ├── Cart.js
│   └── index.css
│
├── public/
│   └── products.json
│
├── server/
│   └── Express backend files
│
├── package.json
└── README.md
```

## Server-Side Rendering Implementation

The application uses Next.js `getServerSideProps()` in the homepage and dynamic product page.

- The homepage reads product information from `public/products.json` on the