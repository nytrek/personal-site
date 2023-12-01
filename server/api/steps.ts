export default defineEventHandler(async () => {
  const response = await fetch(
    "https://api.github.com/gists/f8990f1cca182d5dc3efeab6ecc2638e",
  );
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const { error } = await response.json();
      throw new Error(
        error?.message ? error.message : "Unable to retrieve steps",
      );
    } else {
      throw new Error("Unable to retrieve steps");
    }
  }
  return (await response.json()).files["steps.md"].content;
});
