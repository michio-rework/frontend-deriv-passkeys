import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AuthProvider from './providers/auth.provider';
import AppRouter from './routes';
import { configure } from 'axios-hooks';

import axios from 'axios';

const base = import.meta.env.VITE_SERVER_BASE_URL ?? 'http://test-passkeys.regentmarkets.com/api/v1';

axios.defaults.baseURL = base;

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

configure({ defaultOptions: { manual: true, autoCancel: true } });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
