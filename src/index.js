import React from "react";
import { ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { SidebarProvider } from "./context/SidebarContext";

// import redux store
import store from './redux/store'
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

if (process.env.NODE_ENV !== "production") {
  disableReactDevTools();
}

ReactDOM.render(
  <Provider store={store}>
    <MantineProvider>
      <Notifications />
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <AuthProvider>
            <SidebarProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </SidebarProvider>
          </AuthProvider>
        </BrowserRouter>
      </ChakraProvider>
    </MantineProvider>
  </Provider>,
  document.getElementById("root")
);
