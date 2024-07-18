---
draft: true
title: Tips for writing Truly Beautiful React Code
date: 2024-07-22T03:00:00.000Z
minRead: 6
author: content/authors/logan_anderson.md
description: Learn how to write beautiful React code
tags:
  - react
featurePosts:
  - post: content/blog/you-need-suspense.md
  - post: content/blog/what-is-nextjs.md
---

# Tips for writing "Truly Beautiful" React Code

<img src="/img/swan_dark.png" alt="Loading spinner image" class="w-1/2 mx-auto" />

> Note: This article represents my own thoughts and opinions and is not representative of my employer's views.

I started working at stripe 6 months ago and dove into a massive React codebase. When you have thousands of developers over 10+ years contributing to a codebase, things can get messy. I have seen some truly beautiful React code and some truly "Not so beautiful" React code. In this article, I will share some tips for writing "truly beautiful" and (possibly more import) some common pitfalls to avoid.

The goal of this article help you write more **readable** and **maintainable** React code so that future developers (including yourself) can easily understand and modify the code at a later date. Its hard to understand the impact of writing "bad" code in the moment but it can have a huge impact on the future of the codebase.

I before I get into the list its worth noting that this for every suggestion there will be a time and place that it makes sense to ignore (I have broken all of these myself at some point). These are not meant to be rules they are guidelines and should raise a flag in your mind when your breaking them.

## Limit the number of props used by a component

When lots of props are passed to a component, it makes it hard to comprehend what the component it supposed to do. This also makes the component harder to test and maintain. If your passing more then 8ish props to a component, you should consider refactoring into multiple components. If your passing the same props into many components, you should consider using React context.

## Use React context (try and avoid prop drilling)

Prop drilling is when you pass props down through multiple layers of components. This can make your code harder to read and maintain. React context is a way to pass data through the component tree without having to pass props down manually at every level. This can make your code cleaner and easier to maintain.

## Use early returns

Often when writing React code we want to render components conditionally. A pattern I often see is doing this with `&&` embedded into the JSX.

```tsx
// Bad
const MyComponent = () => {
  return (
    <div>
      {loading && <div>loading...</div>}
      {!loading && <div>hello</div>}
    </div>
  );
};
```

or with ternary operators

```tsx
// Bad
const MyComponent = () => {
  return <div>{loading ? <div>loading...</div> : <div>hello</div>}</div>;
};
```

or with variables

```tsx
const MyComponent = () => {
  let body = <div>hello</div>;
  if (loading) {
    body = <div>loading...</div>;
  }
  if (somethingElse) {
    body = <div>something else</div>;
  }
  return <Layout>{body}</Layout>;
};
```

While these examples are readable using this pattern often leads to hard to read and unmaintainable code. Instead use early returns, this makes the logic more **readable** and **maintainable**.

```tsx
// Good
const MyComponent = () => {
  if (loading) {
    return <div>loading...</div>;
  }
  return <div>hello</div>;
};
```

Some times you will need to break out the early return into a separate component.

```tsx
const Inner = () => {
  if (loading) {
    return <div>loading...</div>;
  }
  if (somethingElse) {
    return <div>something else</div>;
  }
  return <div>hello</div>;
};
const MyComponent = () => {
  return (
    <Layout>
      <Inner />
    </Layout>
  );
};
```

As the number of states grow the early return path becomes more readable and maintainable.

## Make custom hooks

Often I see a bunch of hooks at the at the start of a React component. While at surface level this seems fine as the number of hooks grows the component becomes harder to read and understand.

For example this is a pretty common pattern

```tsx
const MyComponent = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  return <SomeForm>...</SomeForm>;
};
```

Instead of this pattern consider making a custom hook.

```tsx
const useLoginForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  return {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
  };
};
const MyComponent = () => {
  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
  } = useLoginForm();

  return <SomeForm>...</SomeForm>;
};
```

This also has the added benefited of being able to reuse the hook in other components.

## Don't use `renderSomething` methods

Often I see components with methods like `renderSomething` or `renderSomethingElse`. I am not sure why folks do this, my guess is it comes from the class component days where it was common to have multiple render\_something methods on a class. We have functional components now, so there is no need for renderMethods. Render methods are just bad functional components. React gives us functional components so lets use them how they are meant to be used.

Example of a render method

```tsx
const renderMyComponent = () => {
  return <div>hello</div>;
};
const SomeOtherComponent = () => {
  return <div>{renderMyComponent()}</div>;
};
```

Let's refactor this to a functional component

```tsx
const MyComponent = () => {
  return <div>hello</div>;
};
const SomeOtherComponent = () => {
  return (
    <div>
      <MyComponent />
    </div>
  );
};
```

## Conclusion

I hope you found these tips helpful. I have found that following these tips has helped me write more readable and maintainable React code. If you have any tips you would like to share please leave a comment below. I would love to hear them.
