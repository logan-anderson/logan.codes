---
title: What is nextjs?
author: Logan Anderson
description: >-
  Nextjs is a meta framework for React. Nextjs includes static site generation,
  sever site rendering (ssr), api routes, and many other features. We will
  explore all these ideas and more in this blog.  
date: '2020-11-07T00:00:00Z'
tags:
  - nextjs
  - code
_template: basic
---
# What is Next.js?

Next.js (or next or nextjs however you choose to say it) is a popular meta-framework for [React](https://reactjs.org/ "React "). In the past few months, nextjs has sky-rocketed in popularity. Don't believe me just check out the npm downloads.  👇

![nextjs npm downloads](https://i.imgur.com/YkIYzgy.png "Next cpm downloads")

It has received overwhelming growth since 2020.  Now let's get into some of the features and why someone might use this over traditional client-side react in the browser.

_**Note: This blog post is meant for folks who are already familiar with react and javascript. If you are not I would suggest you read up on those before tacking nextjs. Further, the goal of this article is not to teach you nextjs but to give one an understanding of what it is.**_

## Static Site Generation

[Static site generation](https://wsvincent.com/what-is-a-static-site-generator/#:\~:text=Static%20Site%20Generators%20are%20a,into%20static%20files%20for%20deployment.) is when a website is built once and then the raw HTML is served to the user at request time. This is contrary to how React typically runs. Normally, when using a tool like [CRA](https://reactjs.org/docs/create-a-new-react-app.html) or something similar the content of the pages is all encoded in javascript. This javascript is then sent to the client and must be rendered in the client browsers. Why is this an issue? Two reasons.

1. Speed
2. Search engine optimization

Although Google says that does process the javascript when crawling a site it may not be able to see valuable information, such as hyperlinks, quickly. This can have an effect on how the pages ranks.

Next, and probably more important is speed. When your react app made with CRA is pulled down from the server as stated before it must run all the js to get the content. This takes time and can slow down how fast your website content is displayed to the user. What if we could send down the HTML already rendered so the client would not have to when the page is loaded for the first time. Well, we can and this is one form of static site generation.

Nexjs will render all of your pages and generate the HTML for them. (It does so at build time) After the site is built when the page is requested is sends the pages HTML already rendered. This makes the site much faster to load for the first time.

## Server-side rendering

Server-side rendering is the same thing as static site generation but instead of happing at build time it happening at request time. Nextjs provides a hybrid approach and allows one to choose if they want server-side rendering or static site generation. This is done by the use of `getStaticProps` and `getServerSideProps`. Let's say you have a blog and you want to statically render all your blog pages. Ito would it look something like this.

```js
export async function getStaticProps(context) {
  const posts = await getPosts()
  return {
    props: {posts: posts}, // will be passed to the page component as props
  }
}
```

Now in our page react components we can use the posts.

```js
const BlogPage = ({posts})=>{
// use posts
}
```

**Note:** this happens server-side at build time. Nextjs also code splits all of this code out so it will never be sent to the client. Because of this, we can use secrets (API keys, database passwords, etc) in `getStaticProps` or `getSevereSideProps` and it will remain secret and safe.

## API routes

API routes allow one to make an API in their nextjs applications. The API route is generated from the filesystem so for example if we made a new file called `pages/api/new-route` that looks like.

```js
export default function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json({food: ['pizza', 'rice', 'salad']})
}
```

Now we can make requests to `/api/new-route`. The cool thing is these can be deployed as a standalone server or as serverless functions.

## Final thoughts

We have seen some of the basic features of nextjs but there are many more like typescript support or Incremental Static Regeneration. Overall I nextjs is a fantastic choice for a static site renderer for React and an amazing choice for production react application.