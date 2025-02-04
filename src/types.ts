export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "Done" | "archived";
  assignedTo?: string;
}
  
  export interface FilterOptions {
    status: "all" | "open" | "done";
  }
  