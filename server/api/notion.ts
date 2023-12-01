export default defineEventHandler(async () => {
  const response = await fetch(
    "https://api.notion.com/v1/databases/edb6ee43-cae0-4ba6-a558-1c0986c37acf/query",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.NOTION_SECRET,
        "Notion-version": "2022-06-28",
      },
    },
  );
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const { error } = await response.json();
      throw new Error(
        error?.message ? error.message : "Unable to retrieve notion data",
      );
    } else {
      throw new Error("Unable to retrieve notion data");
    }
  }
  return (await response.json()).results;
});
