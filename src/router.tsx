import { Routes, Route, Navigate } from "react-router-dom";
import { TaskList, TaskNew, TaskView } from "./pages/tasks";

export default function Router() {
  return (
    <Routes>
      <Route path="/tasks/:title" element={<TaskView />} />
      <Route path="/tasks/new" element={<TaskNew />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
  );
}
