---
draft: false
title: Achieving Consistent Output from ChatGPT
date: 2023-07-01T04:00:00.000Z
minRead: 8
author: content/authors/logan_anderson.md
tags:
  - chatGPT
  - ML
  - code
featurePosts:
  - post: content/blog/machine-learning.md
  - post: content/blog/does-a-math-degree-help-in-software-engineering.md
---

# Achieving Consistent Output from ChatGPT

## Introduction

ChatGPT, an advanced language model developed by OpenAI, has revolutionized the tech industry. However, one of the challenges that users often face is obtaining consistent and reliable output from the model. Due to its probabilistic nature, ChatGPT can generate varied responses to the same prompts, leading to unpredictability. This output can be hard to parse and use with other systems. To address this issue, we will look at using ["Function calling," ](https://platform.openai.com/docs/guides/gpt/function-calling "Function Calling docs")which enables users to exert greater control over ChatGPT's responses. In this blog post, we will explore the concept of leveraging Function calling to achieve more consistent and reliable output from ChatGPT.

## What is "Function Calling"

Function calling is a part of the request to the chatGPT API that allows users to define one or more functions. Instead of the API responding with the output from it (may) respond with arguments to one of the describe function. This is useful for allowing the agent to reach outside its knowledge base or preform actions on behalf of the user but is can also be used to force a responses to be in a JSON format.

## Using Function Calling to get a consistent output

When making a request to openAI we can pass one or more functions to the chat completion endpoint. For example let's say we are making a quiz app and we want chatGPT to generate an array of quiz questions. We could use function calling to make sure the output is consistent.

```typescript
import { Configuration, OpenAIApi } from "openai";

// Setup OpenAI client
const configuration = new Configuration({
  apiKey: <Your API Key>,
});
const openai = new OpenAIApi(configuration);
// Example Message
const messages = [
  {
    role: "user" as const,
    content: "Generate a list of fun and intresting question for a quiz",
  },
];

// Example Function that has aruments of the shape we want to return
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
                description: "The answer of the question",
              },
            },
          },
        },
      },
    },
  },
];

const res = await openai.createChatCompletion({
  // We need to use "gpt-3.5-turbo-0613" or gpt-4-061
  model: "gpt-3.5-turbo-0613",
  functions,
  // Force the result to be a function call (we could also use function_call: "auto" if we wanted the AI to decide weather or not it wants to generate it)
  function_call: { name: "generateQuiz" },
  messages,
});

const args = res.data.choices[0].message?.function_call?.arguments || "";
const result = JSON.parse(args);
console.log(result);

```

The output of this is the following

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

Now we have an output from ChatGPT that we can rely on and know it will always be the same.

A couple of things to note with this approch

* Must use use "gpt-3.5-turbo-0613" or "gpt-4-061" models as they have been trained for function calling
* We are forcing the output from the api to be a function argument by passing function\_call: { name: "generateQuiz" },
* Function calling was designed so that for so that the AI could respond with arguments to a function that could be called in the users code but in this example we are using to get a consistent output.

## Conclusion

Obtaining consistent output from ChatGPT is crucial for many applications, and function calling provides a powerful solution. By leveraging function calling in the ChatGPT API, users can define custom functions and ensure that the model's responses are consistent and reliable. This enables easier integration with other systems and enhances the overall usability of ChatGPT. Incorporating function calling into your projects will help you unlock the full potential of ChatGPT and create more robust and dependable applications.
