---
date: '2021-05-05'
minRead: '6'
title: Learn what Machine Learning is
author: content/authors/logan_anderson.md
description: >-
  From the very basics, lean what machine learning is in a way that is easy to
  understand and assessable for all backgrounds. 
tags:
  - code
  - ML
_template: basic
---

# What is Machine Learning?

> Success in creating AI would be the biggest event in human history. Unfortunately, it might also be the last, unless we learn how to avoid the risks

\- [Stephen Hawking](https://www.hawking.org.uk/biography) 

Machine learning and artificial intelligence have had grown in popularity significantly over the past years. With this growth comes benefits and consequences. This article introduces the basic concepts of machine learning with intuitive visuals and little or no math/calculations. The goal is to give one a feel for how  machine learning works. Understanding will play a key role in the future of machine learning as not having a good understanding of what is happening can have dire consequences . 

## Intuitive Understanding

At its core machine learning is algorithm (or a set of instructions) for updating a parameters. For example, If I had a function that looked like this.

    def housePriceModel(x0,x1):
    	return x0 + squareFootage*x1

This function takes an **x0** and **x1** and returns and returns the price of the house with the given square footage. Without machine learning we would pick an **x0** and **x1** a