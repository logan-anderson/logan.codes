---
draft: true
title: 5 Biggest Mistakes Developers Make in Next.js
date: 2024-06-05T03:00:00.000Z
---

As developers, we've all had those "Oops!" moments—times when a small oversight or common mistake has led to unexpected bugs, setbacks or performance hits. I have had moments like that myself. While working on a pretty simple saas application I compiled a list of the common issues I have ran into and have been sucked into my self.\

In this post, we’ll explore the five biggest foot guns in Next.js—those tricky issues that can trip up even experienced developers (**including myself)**. Whether you're new to Next.js or a seasoned pro, knowing these common pitfalls can save you time, headaches, and ensure your applications run smoothly.\

> Note: In this post we are going to be focusing on Next.js 14+

## 1: Making Multiple Fetch Calls in a Server Component

Very often we need to fetch multiple items in a server component. \

```typescript
// app/dashboard/page.ts
import { getUsers, getProducts } from "~/db";

const Dashboard = async () => {
  const users = await getUsers();
  const products = await getProducts();
  return <DashboardPage users={users} products={products} />;
};
export default Dashboard;
```

On the service this does not look bad, It might even past code review. And really, it isn't *that *bad**. **The issue is that the getUsers and getProducts functions are **not** **running in parallel**. We wait for the getUsers function return and then the getProducts.

The issue here isn't *really *the performance issue and with two functions it might not be a big deal. The issue is that this sets a pattern, so that when you add more data fetching to the dashboard you will make it look the other functions.\

```typescript
const users = await getUsers();
const products = await getProducts();
const transactions = await getTransactions();
const clients = await getClients();
// ...
return <DashboardPage users={users} products={products} />;
```

This overtime will become a major performance hit to your app.

**The fix is to fetch all items in** **parallel**.

Ex:

```javascript
// app/dashboard/page.ts
import { getUsers, getProducts } from "~/db";

const Dashboard = async () => {
  const [users, products] = await Promise.all([getUsers(), getProducts()]);
  return <DashboardPage users={users} products={products} />;
};
export default Dashboard;
```

This will not only be more performant but it will set your app up for success in the future.

## 2: Unauthorized or Incorrectly Authorized Server Actions

## 3: Mixing server and client code

## 4: Not Using Suspense Boundaries

## 5: Caching
