import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from "react";
import { ThemeProvider, useTheme } from "./hooks/ThemeContext";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
