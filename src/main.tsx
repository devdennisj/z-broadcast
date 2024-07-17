import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const rootId = document.getElementById("root");

if (!rootId) {
  throw new Error("No root element found");
}

ReactDOM.createRoot(rootId).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
