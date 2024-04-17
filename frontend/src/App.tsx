import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { useTheme } from "./hooks/ThemeContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Stage from "./pages/Stage/Stage";
import Label from "./pages/Label/Label";
import Member from "./pages/Member/Member";

function App() {
    const { theme } = useTheme();

    return (
        <div className={`App ${theme}`}>
            <Router>
                <Routes>
                    <Route
                        path='/project/:projectSlug'
                        element={<Dashboard />}
                    />
                    <Route
                        path='/project/:projectSlug/members'
                        element={<Member />}
                    />
                    <Route
                        path='/project/:projectSlug/labels'
                        element={<Label />}
                    />
                    <Route
                        path='/project/:projectSlug/stages'
                        element={<Stage />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
