import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./hooks/ThemeContext";
import { ProjectProvider } from "./hooks/ProjectContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <ThemeProvider>
        <ProjectProvider>
            <App />
        </ProjectProvider>
    </ThemeProvider>
);
