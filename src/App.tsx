import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TaskBoard from './components/TaskBoard';
import CreateTaskForm from './components/CreateTaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import History from './components/History';

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/taskBoard">Task Manager</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/taskBoard">Task Board</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Task</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/taskBoard" />} />
        <Route path="/taskBoard" element={<TaskBoard />} />
        <Route path="/create" element={<CreateTaskForm />} />
        <Route path="*" element={<Navigate to="/taskBoard" />} />
      </Routes>

      <History />
    </Router>
  );
}
