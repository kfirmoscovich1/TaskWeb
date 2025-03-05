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

  export interface ControlProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortType: string;
    setSortType: (type: string) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    onAddTask: (task: Task) => void;
  }

  export interface Event {
    description: string;
}
  
  export interface DateInfo {
    day: number | null;
    month: number | null;
  }

  export interface EventsResponse {
    events: Event[];
    date: { day: number; month: number };
}

  export interface TaskItemProps {
    task: Task;
    onDelete: (id: string) => void;
    onDone: (id: string) => void;
    onArchive: (id: string) => void;
  }
  