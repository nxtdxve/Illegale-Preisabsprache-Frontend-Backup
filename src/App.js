import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import UnsubscribePage from "./pages/UnsubscribePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    // Definieren Sie hier Ihre Farbpalette
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#e53935",
    },
    background: {
      default: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />{" "}
      {/* CssBaseline hilft, einen konsistenten Baseline-Stil über Browser hinweg zu gewährleisten */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/unsubscribe/:email/:productId" element={<UnsubscribePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
