---
draft: false
title: Achieving Consistent Output from ChatGPT
date: 2023-07-03T04:00:00.000Z
minRead: 5
author: content/authors/logan_anderson.md
tags:
  - chatGPT
  - ML
  - code
featurePosts:
  - post: content/blog/machine-learning.md
  - post: content/blog/does-a-math-degree-help-in-software-engineering.md
description: >-
  Discover how to achieve consistent and reliable output from  the ChatGPT API,
  the advanced language model by OpenAI. Explore the concept of leveraging
  function calling to ensure predictable responses in JSON format. Learn how
  function calling allows users to define custom functions and obtain consistent
  output, enabling easier integration with other systems. Unlock the full
  potential of ChatGPT and enhance the usability of your applications.
---

# Achieving Consistent Output from ChatGPT

## Introduction

ChatGPT, an advanced language model developed by OpenAI, has revolutionized the tech industry. However, one of the challenges that users often face is obtaining consistent and reliable output from the model. Due to its probabilistic nature, ChatGPT can generate varied responses to the same prompts, leading to unpredictability. This output can be hard to parse and use with other systems. To address this issue, we will look at using ["Function calling," ](https://platform.openai.com/docs/guides/gpt/function-calling "Function Calling docs")which enables users to exert greater control over ChatGPT's responses. In this blog post, we will explore the concept of leveraging Function calling to achieve more consistent and reliable output from ChatGPT.

## What is "Function Calling"

Function calling is a feature of the ChatGPT API that allows users to define one or more functions in their requests. Instead of receiving the direct output from the model, users can specify a function for the API to respond with. This function can be used to format the response in a desired way, perform actions on behalf of the user, or even extend the model's capabilities beyond its built-in knowledge base.

## Using Function Calling to get a consistent output

To address the issue of inconsistent output from GPT API, we can utilize function calling in our API requests. Let's consider an example scenario where we want to build a quiz app and generate a list of quiz questions using GPT API. By leveraging function calling, we can ensure that the generated output is consistent.

Here's an example code snippet in TypeScript that demonstrates how to achieve this:

```typescript
import { Configuration, OpenAIApi } from "openai";

// Set up OpenAI client
const configuration = new Configuration({
  apiKey: "<Your API Key>",
});
const openai = new OpenAIApi(configuration);

// Define example message
const messages = [
  {
    role: "user",
    content: "Generate a list of fun and interesting questions for a quiz",
  },
];

// Define the function to generate quiz questions
const functions = [
  {
    name: "generateQuiz",
    description: "Generate a list of quiz questions.",
    parameters: {
      type: "object",
      properties: {
        questions: {
          type: "array",
          description: "A list of questions for a quiz",
          items: {
            type: "object",
            properties: {
              question: {
                type: "string",
                description: "The question to be asked",
              },
              answer: {
                type: "string",
                description: "The answer to the question",
              },
            },
          },
        },
      },
    },
  },
];

// Make the API request with function calling
const res = await openai.createChatCompletion({
  // Use "gpt-3.5-turbo-0613" or "gpt-4-061" models for function calling
  model: "gpt-3.5-turbo-0613",
  functions,
  // Force the result to be a function call
  function_call: { name: "generateQuiz" },
  messages,
});

// Extract the function arguments from the API response and parse them
const args = res.data.choices[0].message?.function_call?.arguments || "";
const result = JSON.parse(args);
console.log(result);
```

The output of this code snippet will be a consistent array of quiz questions:

```typescript
{
  questions: [
    { question: "What is the capital of France?", answer: "Paris" },
    {
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
    },
    {
      question: "Which country is famous for the Great Wall?",
      answer: "China",
    },
    { question: "What is the chemical symbol for gold?", answer: "Au" },
    {
      question: "Who wrote the novel 'Pride and Prejudice'?",
      answer: "Jane Austen",
    },
    {
      question: "In which city was the first Olympics held?",
      answer: "Athens",
    },
    {
      question: "What is the tallest mammal on Earth?",
      answer: "Giraffe",
    },
    {
      question: "Who is the current President of the United States?",
      answer: "Joe Biden",
    },
    {
      question: "What is the largest ocean in the world?",
      answer: "Pacific Ocean",
    },
  ];
}
```

Now, by utilizing function calling, we can rely on the GPT API to consistently generate a list of quiz questions for our app.

It's important to note a couple of things with this approach:

* Function calling requires the use of "gpt-3.5-turbo-0613" or "gpt-4-061" models, as they have been specifically trained to support this feature.
* In the example code, we force the output from the API to be a function call by passing `function_call: { name: "generateQuiz" }`.
* Function calling was originally designed to allow the AI agent to respond with arguments to a function that can be called in the user's code. However, in this example, we utilize it primarily to obtain consistent output.

## Conclusion

Obtaining consistent output from ChatGPT is crucial for many applications, and function calling provides a powerful solution. By leveraging function calling in the ChatGPT API, users can define custom functions and ensure that the model's responses are consistent and reliable. This enables easier integration with other systems and enhances the overall usability of ChatGPT. Incorporating function calling into your projects will help you unlock the full potential of ChatGPT and create more robust and dependable applications.
