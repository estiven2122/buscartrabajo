import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Configurar el título de la página
document.title = 'BuscaCamello - Tu guía en el desierto laboral';

// Agregar meta descripción
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'BuscaCamello te ayuda a organizar y gestionar tu búsqueda de empleo de manera eficiente. Rastrea aplicaciones, gestiona tu perfil profesional y encuentra oportunidades laborales.';
document.head.appendChild(metaDescription);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
