import React from "react";
import App from "./App";
import "./style/index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { NextUIProvider } from "@nextui-org/react";

// Disable React Dev Tools
disableReactDevTools();

// Set the default base URL for Axios requests to "http://localhost:3000".
// axios.defaults.baseURL = import.meta.env.deploymentServerUrl;

axios.defaults.baseURL = import.meta.env.localServerUrl;
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
