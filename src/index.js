import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { ChakraProvider } from "@chakra-ui/react";

if(process.env.NODE_ENV !== 'production'){
  disableReactDevTools();
}

ReactDOM.render(
  <React.StrictMode>
    {/* <ChakraProvider> */}
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    {/* </ChakraProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);