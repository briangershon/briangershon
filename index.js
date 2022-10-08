/*
  Generate README.md
  Author: Brian Gershon

  - Add most recent blog entries based on my blog RSS feed
  - Add static content

*/
const fs = require("fs").promises;
const axios = require("axios");
const cheerio = require("cheerio");
const { Octokit, App } = require("octokit");

const RSS_FEED_URL = "https://www.briangershon.com/feed.rss";

async function generateBlog() {
  const response = await axios.get(RSS_FEED_URL);

  const $ = cheerio.load(response.data, {
    xmlMode: true,
  });

  let result = [];

  $("item").each(function (i, elm) {
    const title = $(elm).find("title").text();
    const link = $(elm).find("link").text();
    const description = $(elm).find("description").text();

    result.push(`
  <tr>
    <td width="100%">
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${link}">Read more...</a>
    </td>
  </tr>
`);
  });

  // return result with last 2 recent blog posts
  return `
## Recent Blog Posts

<table>
${result.slice(-2).reverse().join("")}
  <tr>
    <td width="100%">Read more at <a href="https://www.briangershon.com/blog/">briangershon/blog</a></td>
  </tr>
</table>`;
}

async function generateStatic() {
  return fs.readFile("./readme.static.md", {
    encoding: "utf8",
    flag: "r",
  });
}

async function generateStarterTemplateList() {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const q = "topic:starter-template user:briangershon is:public archived:false";
  const data = await octokit.rest.search.repos({
    q,
    sort: "updated",
  });

  const totalCount = data.data.total_count;

  const topSix = data.data.items.slice(0, 6);
  const rest = data.data.items.slice(6, totalCount);

  const results = [];
  topSix.forEach((repo) => {
    results.push(
      `<tr>
        <td width="30%">
          <strong><a href="${repo.html_url}">${repo.name}</a></strong>
        </td>
        <td width="70%">${repo.description}</td>
      </tr>`
    );
  });

  return `
## Starter Templates

Find configuration ideas or use as a foundation for your next project. View as a [Github search](https://github.com/search?o=desc&q=topic%3Astarter-template+user%3Abriangershon+is%3Apublic+archived%3Afalse&s=updated&type=Repositories).

<table>
${results.join("\n")}
<tr><td width="30%">&nbsp;</td><td width="70%">${rest.length} more: ${rest.map(
    (r) => {
      return ` <a href="${r.html_url}">${r.name}</a>`;
    }
  )}</td></tr>
</table>
`;
}

async function generateActiveRepos() {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const q = "is:closed is:pr author:briangershon archived:false is:public";
  const data = await octokit.paginate(
    octokit.rest.search.issuesAndPullRequests,
    {
      q,
      order: "desc",
    }
  );

  const items = data;

  const repos = {};
  items.forEach((pr) => {
    // console.log('PR', pr);
    const key = pr.html_url.split("/pull")[0];
    if (key in repos) {
      repos[key]++;
    } else {
      repos[key] = 1;
    }
  });

  const repoSummary = Object.entries(repos).slice(0, 15);

  const results = [];
  repoSummary.forEach((repo) => {
    const repoSplit = repo[0].split("/");
    const shortName = `${repoSplit[3]}/${repoSplit[4]}`;
    results.push(
      `<tr>
        <td width="
        70%">
          <strong>${shortName}</strong>
        </td>
        <td width="30%"><a href="${
          repo[0]
        }/pulls?q=is%3Apr+is%3Aclosed+author%3Abriangershon">${repo[1]} PR${
        repo[1] > 1 ? "s" : ""
      }</a></td>
      </tr>`
    );
  });

  return `
## Open-Source Projects

My most recent code contributions (limited to latest 15 repositories). View all PRs [as a Github search](https://github.com/pulls?q=is%3Aclosed+is%3Apr+author%3Abriangershon+archived%3Afalse+is%3Apublic).

<table>
${results.join("\n")}
</table>
`;
}

async function generatePage() {
  console.log(await generateBlog());
  console.log(await generateActiveRepos());
  console.log(await generateStarterTemplateList());
  console.log(await generateStatic());
}

generatePage().then(() => {
  process.exit();
});
