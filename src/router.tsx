import { Routes, Route, Navigate } from "react-router-dom";
import { TaskList, TaskNew, TaskView } from "./tasks/pages";
import { SignIn } from "./auth/pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" />} />

      <Route path="/sign-in" element={<SignIn />} />

      <Route path="/tasks/:title" element={<TaskView />} />
      <Route path="/tasks/new" element={<TaskNew />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
  );
}
