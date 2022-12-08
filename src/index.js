import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AlertState } from "./context/alert/alertState";
import { PhotoState } from "./context/photo/photoState";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlertState>
      <PhotoState>
        <HashRouter>
          <App />
        </HashRouter>
      </PhotoState>
    </AlertState>
  </React.StrictMode>
);
