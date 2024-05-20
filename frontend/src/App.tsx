import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { useTheme } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Stage from "./pages/Stage/Stage";
import Label from "./pages/Label/Label";
import Member from "./pages/Member/Member";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import RegisterSuccess from "./pages/RegisterSuccess/RegisterSuccess";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import TaskDetail from "./pages/TaskDetail/TaskDetail";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path="/project/:projectSlug" element={<Dashboard />} />
          <Route path="/project/:projectSlug/members" element={<Member />} />
          <Route path="/project/:projectSlug/labels" element={<Label />} />
          <Route path="/project/:projectSlug/stages" element={<Stage />} />
          <Route
            path="/project/:projectSlug/task/:index"
            element={<TaskDetail />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/resetPassword/:token/:email"
            element={<ResetPassword />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/checkEmail/:emailResend"
            element={<RegisterSuccess />}
          />
          <Route
            path="/ConfirmEmail/:token/:email"
            element={<ConfirmEmail />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
