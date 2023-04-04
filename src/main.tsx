import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { Home } from "@/pages";
import { PopupContextProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PopupContextProvider>
      <Home />
    </PopupContextProvider>
  </React.StrictMode>
);
