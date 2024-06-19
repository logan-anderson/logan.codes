---
draft: true
title: You Need Suspense in Your Next.js App
date: 2024-06-18T03:00:00.000Z
minRead: 2
author: content/authors/logan_anderson.md
description: >-
  Next.js has evolved from a static rendering React framework to a dynamic
  full-stack solution, with features like page.ts and loading.ts for server-side
  rendering and loading states. Using Suspense, developers can show static
  content while fetching dynamic data, improving user experience and page
  performance.
tags:
  - react
  - nextjs
featurePosts:
  - post: content/blog/what-is-nextjs.md
  - post: content/blog/rss-feeds-in-a-nextjs-site.md
---

## You Need Suspense in Your Next.js App

<img src="/img/suspense-cover-photo.png" alt="Loading spinner image" class="w-1/2 mx-auto" />

Next.js is a great framework that I've been using since it was primarily known for static rendering of React applications. Over time, it has evolved into a dynamic full-stack framework.

One feature I always liked about Next.js (and maybe don't love anymore) is the use of `page.ts` and `loading.ts` files. These make it easy to implement server components and display a loading state while waiting for data to load. However, most of the time, your page comprises both **static** and **dynamic** data.

Let's look at a common example of a dashboard page:

```tsx
// app/dashboard/users/page.tsx
import { getUsers } from "~/db";

const Dashboard = async () => {
  const users = await getUsers();
  return (
    <UserView>
      <UserTable users={users} />
    </UserView>
  );
};
export default Dashboard;
```

```tsx
// app/dashboard/users/loading.tsx
import { Spinner } from "@ui/components/ui/spinner";

export default Spinner;
```

In this example, Next.js will automatically show a loading spinner while the data is being fetched.

<video autoplay loop muted="true">
  <source src="/img/loading_spinner_nextjs.mov" type="video/mp4" />
</video>

While this setup is functional, it only displays a loading spinner, missing an opportunity to show static content on the page.

This is where React Suspense comes into play. With Suspense, we can display static content while dynamic content is being fetched, enhancing the user experience.

```tsx
// app/dashboard/users/page.tsx
import { Suspense } from "react";
import { Spinner } from "@ui/components/ui/spinner";

import { getUsers } from "~/db";

// This is a server component
const Users = async () => {
  const users = await getUsers();
  return <UserTable users={users} />;
};

const Dashboard = () => {
  return (
    <UserView>
      <Suspense fallback={<Spinner />}>
        <Users />
      </Suspense>
    </UserView>
  );
};
export default Dashboard;
```

Now, we can provide much more context while the data is being fetched from the server, improving the user experience and making the page feel faster.

<video autoplay loop muted="true">
  <source src="/img/loading_spinner_suspense_nextjs.mov" type="video/mp4" />
</video>

If you're not already using Suspense in your Next.js app, I highly recommend giving it a try. It significantly enhances the user experience by making your pages feel faster and more responsive.
