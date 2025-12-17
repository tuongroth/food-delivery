import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/Storecontext.jsx'
console.log("React is starting...");

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <StoreContextProvider> <App /> </StoreContextProvider>
  </BrowserRouter>
    
  
);
