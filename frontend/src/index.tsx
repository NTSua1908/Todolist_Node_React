import ReactDOM from "react-dom/client";
import App from "./App";
import { ProjectProvider } from "./hooks/ProjectContext";
import { ThemeProvider } from "./hooks/ThemeContext";
import "./index.css";

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
