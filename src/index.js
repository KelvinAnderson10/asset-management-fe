import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "@fontsource/mulish";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { apiClientFactory } from './shared/ApiClientFactory';
import { clientInstance,firestoreInstance,notificationInstance } from './shared/AxiosClient';
import { ServiceFactory } from './services/ServiceFactory';
import { DepsProvider } from './shared/context/DependencyContext';


const apiClient = apiClientFactory(clientInstance,firestoreInstance,notificationInstance)
const services = ServiceFactory(apiClient)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <DepsProvider services={services}>

    
      <App />
      </DepsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
