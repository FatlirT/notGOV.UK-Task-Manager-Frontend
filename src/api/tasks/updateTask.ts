import { apiUrl } from "../../env";

export default async function updateTask(title: string, taskData: any) {
  let res: Response;

  try {
    res = await fetch(`${apiUrl}/tasks/${title}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
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
