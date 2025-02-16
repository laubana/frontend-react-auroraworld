import { ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { theme } from "./configs/themeConfigs.ts";
import { store } from "./configs/storeConfig.ts";
import SearchContextProvider from "./contexts/SearchContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <SearchContextProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ThemeProvider>
        </SearchContextProvider>
      </Provider>
    </Router>
  </StrictMode>
);
