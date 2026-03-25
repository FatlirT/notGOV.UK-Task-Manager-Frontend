/**
 * Creates a new task by sending a POST request to the backend API.
 *
 * @async
 * @function createTask
 *
 * @param {Record<string, any>} payload - The task data to send to the API.
 *
 * @returns {Promise<any>}
 * Resolves with:
 *   - `response.task` (the created task object) when the request succeeds.
 *
 * @throws {Error}
 * Throws an error when:
 *   - The server is unreachable.
 *   - The server responds with a non-OK status and provides `{ error: string }`.
 *   - The server returns invalid JSON.
 *
 **/

import { apiUrl } from "../env";

console.log("API URL:", apiUrl);

export async function createTask(payload: Record<string, any>) {
  let res: Response;

  try {
    res = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error("Server is unreachable");
  }

  try {
    const response = await res.json();
    if (!res.ok) {
      throw new Error(response.error || "Failed to create task");
    }
    return response.task;
  } catch (error) {
    throw error;
  }
}
