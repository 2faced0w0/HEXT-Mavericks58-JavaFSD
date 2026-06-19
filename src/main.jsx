import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './store/store.js';

createRoot(document.getElementById('root')).render(
    <PrimeReactProvider>
      <BrowserRouter>
        <StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        </StrictMode>
      </BrowserRouter>
    </PrimeReactProvider>
)
