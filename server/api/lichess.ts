interface Rapid {
  games: number;
  prog: number;
  rating: number;
  rd: number;
}

export default defineEventHandler(async () => {
  const response = await fetch("https://lichess.org/api/account", {
    headers: {
      Authorization: "Bearer " + process.env.LICHESS_ACCESS_TOKEN,
    },
  });
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const { error } = await response.json();
      throw new Error(
        error?.message ? error.message : "Unable to retrieve lichess data",
      );
    } else {
      throw new Error("Unable to retrieve lichess data");
    }
  }
  return (await response.json()).perfs.rapid as Rapid;
});
