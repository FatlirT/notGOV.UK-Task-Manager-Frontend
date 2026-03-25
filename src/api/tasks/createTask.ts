import { apiUrl } from "../../env";
import { Task } from "../../schema/tasks/task";

export default async function createTask(task: Task) {
  let res: Response;

  try {
    res = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  } catch (error) {
    throw new Error("Server is unreachable");
  }

  try {
    const response = await res.json();
    if (!res.ok) {
      throw response;
    }
    return response.task;
  } catch (error) {
    throw error;
  }
}
