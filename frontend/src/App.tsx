import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { useTheme } from "./hooks/ThemeContext";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
    const { theme } = useTheme();

    return (
        <div className={`App ${theme}`}>
            <Router>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
