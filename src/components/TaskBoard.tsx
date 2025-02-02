import { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask, addTask } from "../services/localStorageService";
import TaskItem from "./TaskItem.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskControls from "./Controls";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "Done" | "archived";
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortType, setSortType] = useState<string>("date");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setTasks(getTasks());
    setLoading(false);
  }, []);

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setTasks(getTasks());
  };

  const handleMarkAsDone = (taskId: string) => {
    updateTask(taskId, { status: "Done" });
    setTasks(getTasks());
  };

  const handleArchiveTask = (taskId: string) => {
    updateTask(taskId, { status: "archived" });
    setTasks(getTasks());
  };

  const handleAddTask = (task: Task) => {
    addTask(task);
    setTasks(getTasks());
    setShowAlert(true);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
      setTimeout(() => {
        setShowAlert(false);
      }, 500);
    }, 3000);
  };
  
  const filteredTasks = tasks.filter(task =>
    filterStatus === "all"
      ? task.status !== "archived"
      : filterStatus === "open"
      ? task.status === "To Do"
      : filterStatus === "done"
      ? task.status === "Done"
      : task.status === filterStatus
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortType === "date") {
      const dateA = new Date(a.dueDate.split("/").reverse().join("-"));
      const dateB = new Date(b.dueDate.split("/").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    } else {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    }
  });

  const filteredAndSearchedTasks = sortedTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-center my-4">Task Board</h1>

        {!loading && tasks.some(task => task.status !== "archived") && (
          <TaskControls
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortType={sortType}
            setSortType={setSortType}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}
      </div>

      {loading && <p className="alert">Loading...</p>}

      {!loading && filteredAndSearchedTasks.length === 0 && (
        <div className="alert text-center" role="alert">
          <strong>No tasks found.</strong> Click <em className="text-primary">Create Task</em> above to get started!
        </div>
      )}

      {showAlert && (
        <div
          className={`alert alert-success position-fixed bottom-0 start-50 translate-middle-x ${
            alertVisible ? "fade show" : "fade"
          }`}
          style={{ zIndex: 1050, width: "80%", textAlign: "center" }}
        >
          <strong>Success!</strong> A new task has been created.
        </div>
      )}

      <div className="row g-3">
        {filteredAndSearchedTasks.map((task) => (
          <div key={task.id} className="col-md-4 col-lg-4">
            <TaskItem
              task={task}
              onDelete={handleDeleteTask}
              onDone={handleMarkAsDone}
              onArchive={handleArchiveTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
