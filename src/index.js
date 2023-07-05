// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";

// import { store } from "./app/store";
// import { Provider } from "react-redux";

// // import { AuthProvider } from './context/AuthProvider';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// if (process.env.NODE_ENV !== "production") {
//   disableReactDevTools();
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/*" element={<App />} />
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { store } from './app/store'
import { Provider } from 'react-redux'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);