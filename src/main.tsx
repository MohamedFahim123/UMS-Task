import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import './index.css'
import AuthContextProvider from './context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </>,
)
