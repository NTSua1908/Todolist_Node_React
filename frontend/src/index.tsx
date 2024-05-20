import ReactDOM from "react-dom/client";
import App from "./App";
import { ProjectProvider } from "./contexts/ProjectContext";
import { ThemeProvider } from "./contexts/ThemeContext";
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
