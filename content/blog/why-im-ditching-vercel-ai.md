---
draft: false
date: 2024-01-16T05:00:00.000Z
minRead: 6
title: >-
  Enhancing Real-time Interactivity with Lang Chain: A Critical Look at Vercel
  AI Package
author: content/authors/logan_anderson.md
description: >-
  Unlocking real-time interactivity with Lang Chain: A critical examination of
  the limitations in the Vercel AI package and a custom solution using XState.
  Discover how a state machine approach enhances user engagement and feedback.
  Learn more about bridging the gap and streamlining your AI-powered
  applications.
tags:
  - ml
  - ai
---

> Don't want to read the post? Check out the video below!

<Iframe url="https://www.youtube.com/embed/UluvYK3JZs4" width="700" height="500" />

## Introduction:

> Check out the [code on Github](https://github.com/logan-anderson/llm-xstate-demo "Github Code")

Before diving into today's topic, I want to preface this discussion with a shout out to Vercel. As a dedicated user of their products for over four years, I've found immense value in their offerings, particularly Next.js. The wealth of tutorials available online has been instrumental in my journey through the web development world. However, there's one aspect where I've found myself somewhat disappointed—the Vercel AI package.

## The Promise of Vercel AI:

The Vercel AI package boasts an impressive array of features, allowing developers to seamlessly integrate tools like Lang Chain, Anthropic, Hugging Face, or even ChatGPT directly into their front-end applications. With minimal backend configuration and a simple frontend hook, developers can quickly get their applications up and running.

## The Shortfall:

Despite the initial promise, my experience with the Vercel AI package has left me wanting. One significant drawback is the inability to stream intermediate steps back to the user in real time. This limitation becomes apparent when, for example, building a ChatGPT clone that generates images using a tool provided by the agent. Unfortunately, the current setup doesn't allow for providing real-time feedback to users about the ongoing processes.

## The Challenge:

To illustrate this point, let's consider an example. Imagine querying a ChatGPT interface about the sum from 1 to 10 and requesting a chart to visualize the calculation. With the Vercel package, you'd have to wait for the backend to complete the execution before receiving any response. This lack of real-time feedback hinders the user experience.

## A Proposed Solution:

To address this issue, I turned to a custom solution using Lang Chain and a state machine library called XState. By modeling the interaction between the agent and the user, I created a system that not only streams data but also does so in real time. This allows users to receive feedback as tools are being utilized, enhancing the overall interactivity.

## The XState Machine:

The state machine handles the back-and-forth communication between the agent and the user, tracking tool usage, execution, and user messages. The front end is designed to display these interactions, providing users with a dynamic and engaging experience. This approach not only addresses the real-time streaming limitation but also offers a consistent API for both frontend and backend operations.

## Conclusion:

In conclusion, while the Vercel AI package offers a robust set of features, the limitation in real-time streaming of intermediate steps can be a significant hindrance for certain applications. The custom solution using Lang Chain and XState demonstrates the potential for a more interactive and engaging user experience. State machines prove to be a valuable tool in managing the complexities of language models like ChatGPT.

The code is available on [Github](https://github.com/logan-anderson/llm-xstate-demo "Code on Github") and I welcome any feedback or suggestions for improvement. Feel free to let me know your thoughts in the comments below. Don't hesitate to reach out with any questions or comments!
