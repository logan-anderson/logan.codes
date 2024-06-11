---
draft: true
title: You Need Suspense in Your Next.js App
date: 2024-06-05T03:00:00.000Z
minRead: 5
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

Next.js is a great framework, I have been using it since it was mostly known for static rending react applications. It has since involve into a dynamic full stack framework.

One thing I love about Next.js is the the page.ts and loading.ts files that make it easy to use server components and show a loading state while I you wait for the data. While this is great, most of the time your page is made up of both **static** and **dynamic** data.

Lets look at a pretty common example of a dashboard page;

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

This is great and next.js will automatically show a loading spinner while the data is being fetched.

<video autoplay loop muted="true">
  <source src="/img/loading_spinner_nextjs.mov" type="video/mp4" />
</video>

At the same time this is now so great because we can only see a loading spinner, when there is a lot of static content on the page we could show the user.

This is where suspense comes in. With suspense we can show the static content while the dynamic content is being fetched.

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
      <Suspense fallback={<Loading users={[]} />}>
        <Users />
      </Suspense>
    </UserView>
  );
};
export default Dashboard;
```

Now, we can get a lot more context while the data is being fetched from the server. This impoves the user experience and makes the page feel a lot faster.

<video autoplay loop muted="true">
  <source src="/img/loading_spinner_suspense_nextjs.mov" type="video/mp4" />
</video>

If you're not already using Suspense in your Next.js app, I highly recommend giving it a try. You won't be disappointed!
