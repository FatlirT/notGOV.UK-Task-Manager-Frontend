import { apiUrl } from "../../env";

export default async function getTask(title: string) {
  let res: Response;

  console.log("Fetching task with title:", title);

  try {
    res = await fetch(`${apiUrl}/tasks/${title}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error("Server is unreachable");
  }

  try {
    const response = await res.json();
    if (!res.ok) {
      throw new Error(response.error || "Failed to get task");
    }
    return response.task;
  } catch (error) {
    throw error;
  }
}
