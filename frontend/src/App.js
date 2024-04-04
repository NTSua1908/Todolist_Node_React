import TodoListPage from "./Pages/TodoListPage";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<TodoListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
