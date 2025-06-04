import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import QueryProvider from './contexts/QueryProvider'
import { AuthProvider } from './contexts/AuthContext'
import ToastProvider from './contexts/ToastProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
