import * as React from "react";
import { NextPageContext } from "next";
import { Post } from "../interfaces";
import getPosts from "../utils/getPosts";
const shortSiteDescription =
  "A simple blog about coding, technology, and coffee by Logan Anderson. Read about the latest in web development, machine learning and other tech topics.";

export default class Rss extends React.Component {
  static async getInitialProps({ res }: NextPageContext) {
    if (!res) {
      return;
    }
    // @ts-ignore
    const blogPosts = await getPosts(false, null, "content/blog");
    res.setHeader("Content-Type", "text/xml");
    res.write(getRssXml(blogPosts));
    res.end();
  }
}

const blogPostsRssXml = (blogPosts: Post[]) => {
  let latestPostDate: string = "";
  let rssItemsXml = "";
  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.data.frontmatter.date);
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.data.frontmatter.date;
    }
    rssItemsXml += `
        <item>
          <title>${post.data.frontmatter.title}</title>
          <link>
            https://logana.dev/blog/${post.fileName}
          </link>
          
          <pubDate>${post.data.frontmatter.date}</pubDate>
          <description>
          <![CDATA[${post.data.frontmatter.description}]]>
          </description>
      </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const getRssXml = (blogPosts: Post[]) => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
  return `<?xml version="1.0" ?>
    <rss version="2.0">
      <channel>
          <title>Blog by Logan Anderson</title>
          <link>https://logana.dev</link>
          <description>${shortSiteDescription}</description>
          <language>en</language>
          <lastBuildDate>${latestPostDate}</lastBuildDate>
          ${rssItemsXml}
      </channel>
    </rss>`;
};
