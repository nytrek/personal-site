interface Entry {
  id: number;
  workspace_id: number;
  project_id: null;
  task_id: null;
  billable: boolean;
  start: string;
  stop: string;
  duration: number;
  description: string;
  tags: string[];
  tag_ids: [];
  duronly: boolean;
  at: string;
  server_deleted_at: null;
  user_id: number;
  uid: number;
  wid: number;
}

export default defineEventHandler(async () => {
  const response = await fetch(
    "https://api.track.toggl.com/api/v9/me/time_entries/current",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.TOGGL_EMAIL}:${process.env.TOGGL_PASSWORD}`,
        ).toString("base64")}`,
      },
    },
  );
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const { error } = await response.json();
      throw new Error(
        error?.message ? error.message : "Unable to retrieve toggl data",
      );
    } else {
      throw new Error("Unable to retrieve toggl data");
    }
  }
  return (await response.json()) as Entry;
});
