import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Find the root div in the HTML
const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create a root.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Sie können diese Funktion nutzen, um Leistungsmetriken zu melden (optional).
reportWebVitals();
