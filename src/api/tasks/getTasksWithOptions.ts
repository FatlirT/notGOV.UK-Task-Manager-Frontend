import { apiUrl } from "../../env";

type FetchTasksOptions = {
  page: number;
  pageSize: number;
  titleClauses?: string[];
  descriptionClauses?: string[];
  status?: string[];
  timeLeft?: string[];
  sort?: {
    by: "title" | "description" | "due_datetime" | "status";
    direction: "asc" | "desc";
  };
};

export default async function fetchTasks(options: FetchTasksOptions) {
  const params = new URLSearchParams();

  params.set("page", String(options.page));
  params.set("pageSize", String(options.pageSize));

  if (options.titleClauses) {
    params.set("title", options.titleClauses.join(","));
  }

  if (options.descriptionClauses) {
    params.set("description", options.descriptionClauses.join(","));
  }

  if (options.status) {
    params.set("status", Array.from(options.status).join(","));
  }

  if (options.timeLeft) {
    params.set("timeLeft", Array.from(options.timeLeft).join(","));
  }

  if (options.sort) {
    params.set("sortBy", options.sort.by);
    params.set("sortDirection", options.sort.direction);
  }

  const res = await fetch(`${apiUrl}/tasks?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}
