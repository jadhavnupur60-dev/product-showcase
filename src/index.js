
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Register service worker only in production
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => console.log('Service Worker registered successfully'))
      .catch((error) => console.log('Service Worker registration failed:', error));
  });
}

reportWebVitals();

// Register Service Worker in production
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    if (process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register(process.env.PUBLIC_URL + "/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered:",
            registration.scope
          );
        })
        .catch((error) => {
          console.log(
            "Service Worker registration failed:",
            error
          );
        });
    }
  });
}
