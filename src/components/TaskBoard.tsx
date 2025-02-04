import { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask, addTask } from "../services/localStorageService";
import TaskItem from "./TaskItem.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Controls from "./Controls";
import { Task } from "../types";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortType, setSortType] = useState<string>("date");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
    const newTask = { ...task, assignedTo: task.assignedTo || "Unassigned" };
    addTask(newTask);
    setTasks(getTasks());
  };

  let filteredTasks = tasks.filter(task =>
    filterStatus === "all"
      ? task.status !== "archived"
      : filterStatus === "open"
      ? task.status === "To Do"
      : filterStatus === "done"
      ? task.status === "Done"
      : task.status === filterStatus
  );

  filteredTasks = [...filteredTasks].sort((a, b) => {
    if (filterStatus === "all") {
      if (a.status === "To Do" && b.status !== "To Do") return -1;
      if (b.status === "To Do" && a.status !== "To Do") return 1;
      if (a.status === "Done" && b.status !== "Done") return 1;
      if (b.status === "Done" && a.status !== "Done") return -1;
    }

    if (sortType === "date") {
      const dateA = new Date(a.dueDate.split("/").reverse().join("-"));
      const dateB = new Date(b.dueDate.split("/").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    } else {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    }
  });

  const filteredAndSearchedTasks = filteredTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasActiveTasks = tasks.some(task => task.status === "To Do");

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-center my-4">Task Board</h1>

        {!loading && tasks.some(task => task.status !== "archived") && (
          <Controls
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortType={sortType}
            setSortType={setSortType}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onAddTask={handleAddTask}
          />
        )}
      </div>

      {loading && <p className="alert">Loading...</p>}

      {!loading && filteredAndSearchedTasks.length === 0 && filterStatus !== "done" && filterStatus !== "archived" && !hasActiveTasks && (
        <div className="alert text-center" role="alert">
          <strong>No tasks found.</strong> Click <em className="text-primary">Create Task</em> above to get started!
        </div>
      )}

      {filteredAndSearchedTasks.length > 0 && (
        <div className="row g-3">
          {filteredAndSearchedTasks.map((task) => (
            <div key={task.id} className="col-md-4 col-lg-4">
              <TaskItem
                task={{ ...task, assignedTo: task.assignedTo || "Unassigned" }}
                onDelete={handleDeleteTask}
                onDone={handleMarkAsDone}
                onArchive={handleArchiveTask}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
