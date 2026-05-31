import fs from "node:fs";
import https from "node:https";

const USER_LOGIN = "gongahkia";
const OUTPUT_PATH = "asset/contributions.json";
const PAGE_SIZE = 100;
const MAX_REPOSITORIES = 100;

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("GITHUB_TOKEN is required");
  process.exit(1);
}

function graphql(query, variables = {}) {
  const body = JSON.stringify({ query, variables });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.github.com",
        path: "/graphql",
        method: "POST",
        headers: {
          "User-Agent": "actions",
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          Authorization: `Bearer ${token}`,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (res.statusCode < 200 || res.statusCode >= 300) {
              reject(new Error(`GitHub GraphQL HTTP ${res.statusCode}: ${data}`));
              return;
            }
            if (json.errors) {
              reject(new Error(JSON.stringify(json.errors, null, 2)));
              return;
            }
            resolve(json.data);
          } catch (error) {
            reject(error);
          }
        });
      },
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function dateKey(value) {
  return String(value).slice(0, 10);
}

function addMetric(daysByDate, occurredAt, metric, amount = 1) {
  const day = daysByDate.get(dateKey(occurredAt));
  if (!day) return;
  day[metric] = (day[metric] || 0) + amount;
}

function windowRanges(startedAt, endedAt) {
  const ranges = [];
  let start = new Date(startedAt);
  const end = new Date(endedAt);

  while (start < end) {
    const next = new Date(start);
    next.setUTCDate(next.getUTCDate() + 90);
    if (next > end) next.setTime(end.getTime());
    ranges.push({ from: start.toISOString(), to: next.toISOString() });
    start = next;
  }

  return ranges;
}

async function loadCalendar() {
  const query = `
    query ContributionCalendar($login: String!) {
      user(login: $login) {
        contributionsCollection {
          startedAt
          endedAt
          restrictedContributionsCount
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphql(query, { login: USER_LOGIN });
  const collection = data.user?.contributionsCollection;
  if (!collection) {
    throw new Error(`No contribution data found for ${USER_LOGIN}`);
  }

  return collection;
}

async function addCommitBreakdown(daysByDate, ranges) {
  const query = `
    query CommitBreakdown($login: String!, $from: DateTime!, $to: DateTime!, $maxRepositories: Int!, $pageSize: Int!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          commitContributionsByRepository(maxRepositories: $maxRepositories) {
            contributions(first: $pageSize) {
              nodes {
                occurredAt
                commitCount
              }
            }
          }
        }
      }
    }
  `;

  for (const range of ranges) {
    const data = await graphql(query, {
      login: USER_LOGIN,
      from: range.from,
      to: range.to,
      maxRepositories: MAX_REPOSITORIES,
      pageSize: PAGE_SIZE,
    });
    const repositories =
      data.user?.contributionsCollection?.commitContributionsByRepository || [];

    for (const repository of repositories) {
      for (const node of repository.contributions.nodes || []) {
        addMetric(daysByDate, node.occurredAt, "commits", node.commitCount);
      }
    }
  }
}

async function addConnectionBreakdown(daysByDate, fieldName, metric) {
  let cursor = null;
  const query = `
    query ContributionBreakdown($login: String!, $pageSize: Int!, $cursor: String) {
      user(login: $login) {
        contributionsCollection {
          ${fieldName}(first: $pageSize, after: $cursor) {
            nodes {
              occurredAt
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  `;

  do {
    const data = await graphql(query, {
      login: USER_LOGIN,
      pageSize: PAGE_SIZE,
      cursor,
    });
    const connection = data.user?.contributionsCollection?.[fieldName];
    if (!connection) {
      throw new Error(`No data returned for ${fieldName}`);
    }

    for (const node of connection.nodes || []) {
      addMetric(daysByDate, node.occurredAt, metric);
    }

    cursor = connection.pageInfo.hasNextPage
      ? connection.pageInfo.endCursor
      : null;
  } while (cursor);
}

async function main() {
  const collection = await loadCalendar();
  const weeks = collection.contributionCalendar.weeks.map((week) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      commits: 0,
      pullRequests: 0,
      issues: 0,
      reviews: 0,
    })),
  }));
  const daysByDate = new Map(
    weeks.flatMap((week) => week.days.map((day) => [day.date, day])),
  );
  const ranges = windowRanges(collection.startedAt, collection.endedAt);

  await addCommitBreakdown(daysByDate, ranges);
  await addConnectionBreakdown(daysByDate, "pullRequestContributions", "pullRequests");
  await addConnectionBreakdown(daysByDate, "issueContributions", "issues");
  await addConnectionBreakdown(daysByDate, "pullRequestReviewContributions", "reviews");

  const max = Math.max(0, ...weeks.flatMap((week) => week.days.map((day) => day.count)));
  const totals = {
    contributions: collection.contributionCalendar.totalContributions,
    commits: collection.totalCommitContributions,
    pullRequests: collection.totalPullRequestContributions,
    issues: collection.totalIssueContributions,
    reviews: collection.totalPullRequestReviewContributions,
    restricted: collection.restrictedContributionsCount,
  };

  fs.mkdirSync("asset", { recursive: true });
  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify({
      weeks,
      max,
      totals,
    }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
