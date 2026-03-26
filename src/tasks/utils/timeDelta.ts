export default function getTimeDelta(dueDatetime: string) {
  const now = Date.now();
  const due = Date.parse(dueDatetime);
  const diffMs = due - now;

  const minutes = Math.round(diffMs / (1000 * 60));
  const hours = Math.round(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(days) >= 1) return { value: days, unit: "days" };
  if (Math.abs(hours) >= 1) return { value: hours, unit: "hours" };
  return { value: minutes, unit: "minutes" };
}
