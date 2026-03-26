import { apiUrl } from "../../env";

export default async function updateTaskComplete(taskTitle: string) {
  let res: Response;

  try {
    res = await fetch(`${apiUrl}/tasks/${taskTitle}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: `{ "status": "completed" }`,
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
