# My Blog

![Lighthouse Accessibility Badge](./test_results/lighthouse_accessibility.svg)
![Lighthouse Performance Badge](./test_results/lighthouse_performance.svg)
![Lighthouse PWA Badge](./test_results/lighthouse_pwa.svg)
![Lighthouse SEO Badge](./test_results/lighthouse_seo.svg)

This is my personal blog, you can check out the live [version here](https://logan.codes). I write about web development, math and anything I find interesting. You can also check out my personal projects and see that I am currently working on.

## Tech Stack

- [React](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Markdown](https://logan.codes/blog/markdown)

## Features

### Build time

This website is build with [nextjs](https://nextjs.org/) (v10) and is compiled to static html. At build time my blog posts (written in markdown) are fetched from the file system and the projects readme files are fetched from github (markdown). This information is then rendered into html using [react-markdown](https://www.npmjs.com/package/react-markdown)

### RSS feed

When build this sets generates an RSS feed by looking at the markdown files it has in its content folder

### TinaCMS

If you [are on the site](https://logan.codes) you will notice a button at the bottom of the page that says "See spelling errors? Click here to edit the site". When clicked this button allows one to log in with there github, make new branch, and edit the sites content in github (pretty cool). Everything is editable on the site its self so no need to look at a backend CMS. Just simply edit the page inline.

## Running locally

Dev Mode

```bash
pnpm dev
```

Build the site

```bash
pnpm build
```

Start the local server

```
pnpm start
```
