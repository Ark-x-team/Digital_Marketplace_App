import React from "react";
import App from "./App";
import "./style/index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./i18n";

// Disable React Dev Tools
disableReactDevTools();

// Set the default base URL for Axios requests to "http://localhost:3000".
// axios.defaults.baseURL = import.meta.env.deploymentServerUrl;

axios.defaults.baseURL = import.meta.env.localServerUrl;
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="301326894496-q2m380rscft5agqbsf89l3hpgi21ri2t.apps.googleusercontent.com">
      <BrowserRouter>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
