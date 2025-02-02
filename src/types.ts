export interface Task {
    id: string;
    title: string;
    assignedTo: string;
    description: string;
    dueDate: string; // DD/MM/YYYY
    status: "To Do" | "Done";
  }
  
  export interface FilterOptions {
    status: "all" | "open" | "done";
  }
  