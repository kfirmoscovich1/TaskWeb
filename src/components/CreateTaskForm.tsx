import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../services/localStorageService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "Done" | "archived";
}

const CreateTaskForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("Medium");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: Task = {
      id: uuidv4(),
      title,
      assignedTo,
      description,
      dueDate,
      priority: priority as "High" | "Medium" | "Low",
      status: "To Do"
    };

    try {
      addTask(newTask);
      navigate('/taskBoard', { 
        state: { newTaskAdded: true }
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: "30%" }}>
      <h2 className="text-center mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Assigned to</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter employee name"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Describe the task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Priority</label>
          <div className="d-flex justify-content-between">
            <span
              className={`btn ${priority === "High" ? "btn-danger" : "btn-outline-danger"} flex-fill mx-1`}
              onClick={() => setPriority("High")}
            >
              High
            </span>
            <span
              className={`btn ${priority === "Medium" ? "btn-warning" : "btn-outline-warning"} flex-fill mx-1`}
              onClick={() => setPriority("Medium")}
            >
              Medium
            </span>
            <span
              className={`btn ${priority === "Low" ? "btn-success" : "btn-outline-success"} flex-fill mx-1`}
              onClick={() => setPriority("Low")}
            >
              Low
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
