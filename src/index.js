import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme/theme";
import { SidebarProvider } from "./context/SidebarContext";

if (process.env.NODE_ENV !== "production") {
	disableReactDevTools();
}

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
