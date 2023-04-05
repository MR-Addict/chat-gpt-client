import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layout";
import { Home, NotFound } from "@/pages";
import { PopupContextProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PopupContextProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </PopupContextProvider>
  </React.StrictMode>
);
