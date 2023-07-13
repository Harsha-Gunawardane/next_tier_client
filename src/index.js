import React from 'react';
import { ColorModeScript } from "@chakra-ui/react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import store from './redux/store'
import { Provider } from 'react-redux'


if(process.env.NODE_ENV !== 'production'){
  disableReactDevTools();
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);