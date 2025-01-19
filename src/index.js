import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserDetail from "./components/UserDetail";
import ThemeContextProvider from "./context/ThemeContext";
import "./index.css";

const App = () => (
  <ThemeContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  </ThemeContextProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);