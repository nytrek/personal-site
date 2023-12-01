type Colors = ["#9be9a8", "#40c463", "#30a14e", "#216e39"];

interface Calendar {
  colors: Colors;
  totalContributions: number;
  weeks: {
    contributionDays: {
      color: string;
      contributionCount: number;
      date: string;
      weekday: string;
    }[];
  }[];
}

export default defineEventHandler(async () => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.GITHUB_TOKEN,
    },
    body: JSON.stringify({
      query: `query {
        user(login: "nytrek") {
          name
          contributionsCollection {
            contributionCalendar {
              colors
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                  weekday
                }
              }
            }
          }
        }
      }`,
    }),
  });
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const { error } = await response.json();
      throw new Error(
        error?.message ? error.message : "Unable to retrieve github data",
      );
    } else {
      throw new Error("Unable to retrieve github data");
    }
  }
  return (await response.json()).data.user.contributionsCollection
    .contributionCalendar as Calendar;
});
