/*
  Generate README.md
  Author: Brian Gershon

  - Add most recent blog entries based on my blog RSS feed
  - Add static content

*/
const fs = require("fs").promises;
const axios = require("axios");
const cheerio = require("cheerio");

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

    result.push(`\
  <tr>
    <td width="40%">
      <img src="${link}slice.jpeg" />
    </td>
    <td width="60%">
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${link}">Read it!</a>
    </td>
  </tr>
`);
  });

  // return result with last n recent blog posts
  return `\
## Recent Blog Posts

<table>
${result.slice(-2).reverse().join("")}
</table>`;
}

async function generateStatic() {
  return fs.readFile("./readme.static.md", {
    encoding: "utf8",
    flag: "r",
  });
}

async function generatePage() {
  console.log(await generateBlog());
  console.log();
  console.log(await generateStatic());
}

generatePage().then(() => {
  process.exit();
});
