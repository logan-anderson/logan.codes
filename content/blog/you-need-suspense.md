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

Couple of things to note in this example:

- The `Dashboard` component is a **server component** that fetches data from the server using `getUsers`.
- The `UserTable` component is a **client component** that displays the data fetched by the `Dashboard` component.
- The `Spinner` displays a loading spinner while the data is being fetched.

```tsx
// app/dashboard/users/page.tsx
import { getUsers } from "~/db";

const Dashboard = async () => {
  // Load the users from the database
  const users = await getUsers();
  // Render the table with the users
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

In this example, Next.js will automatically show a loading spinner while the data is being fetched frm the server.

<video autoplay loop muted controls>
  <source src="/img/loading_spinner_nextjs.mov" type="video/mp4" />
</video>

While this setup is functional, it only displays a loading spinner, missing an opportunity to show static content on the page and leaving the user with no context of what's happening.

### Naive Solution: Show static content in your loading state

One way we can improve this is by **duplicating our entire page** in our `loading.ts` file.

```tsx
// app/dashboard/users/loading.tsx
import { Spinner } from "@ui/components/ui/spinner";

const LoadingState = () => {
  return (
    <UserView>
      <Spinner />
    </UserView>
  );
};
export default LoadingState;
```

<video autoplay loop muted controls>
  <source src="/img/loading_spinner_suspense_nextjs.mov" type="video/mp4" />
</video>

This approach works, but it's not ideal. We're duplicating our page, which can lead to inconsistencies. In our example our page was very simple, but in most "Real World" applications this is almost never the case. Imagine having to duplicate your changes every time you make a change to your `page.tsx` file? Sounds like a nightmare.

### Naive Solution 2: Use `layout.ts`

You might be thinking, "Dude, this is why they added **`layout.ts` files to Next.js.**". And your right, this could work. Lets create a `layout.ts` file and move our `UserView` component into it.

```tsx
// app/dashboard/users/page.tsx
import { getUsers } from "~/db";

const Dashboard = async () => {
  // Load the users from the database
  const users = await getUsers();
  // Render the table with the users
  return <UserTable users={users} />;
};
export default Dashboard;
```

```tsx
// app/dashboard/users/loading.tsx
import { Spinner } from "@ui/components/ui/spinner";

export default Spinner;
```

```tsx
// app/dashboard/users/layout.tsx

const UserLayout = ({ children }) => {
  return <UserView>{children}</UserView>;
};
export default UserLayout;
```

Again, this achieves the result we want. Issues will come up later when we want to add a "user detail" page (`/app/dashboard/users/[id].tsx`) to our dashboard and we don't want to wrap it in the `UserView` component (from `layout.ts`)? We could use [route groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) but that gets messy fast and is not a great solution for this problem.

The bigger issue comes when we want to add more dynamic content to our user view page. Maybe we want to add a section above the `<UserView />` for "Most viewed products". Since we cant have "multiple children" in a layout this would be impossible.

The matter of the fact is there is almost always static content that should not live in a layout but also does not need to wait for the data to load.

### A better Solution: Use React Suspense

This is where React Suspense comes into play. With Suspense, we can display static content while dynamic content is being fetched (server side), enhancing the user experience. Let's refactor our example to use Suspense.

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

<video autoplay loop muted controls>
  <source src="/img/loading_spinner_suspense_nextjs.mov" type="video/mp4" />
</video>

If we look at our example from before where we wanted to add a "Most viewed products" section before the table, we can now do that without any issues.

```tsx
// app/dashboard/users/page.tsx
import { Suspense } from "react";
import { Spinner } from "@ui/components/ui/spinner";

import { getUsers, getProducts } from "~/db";

// This is a server component
const Users = async () => {
  const users = await getUsers();
  return <UserTable users={users} />;
};

// This is a server component
const MostViewedProducts = async () => {
  const products = await getProducts();
  return <ProductTable products={products} />;
};

const Dashboard = () => {
  return (
    <UserView>
      <Suspense fallback={<Spinner />}>
        <Users />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Users />
      </Suspense>
    </UserView>
  );
};
export default Dashboard;
```

We can even have separate loading states for each component. This is a huge improvement over the naive solutions we discussed earlier.

If you're not already using Suspense in your Next.js app, I highly recommend giving it a try. It significantly enhances the user experience by making your pages feel faster and more responsive.
