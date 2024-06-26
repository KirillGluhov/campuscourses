import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "../src/index.css";
import "@fontsource/inter";
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import store from './stores/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
