---
blocks:
  - template: longFormText
    content: "# What is Machine Learning?\n\n> Success in creating AI would be the biggest event in human history. Unfortunately, it might also be the last, unless we learn how to avoid the risks\n\n\\- [Stephen Hawking](https://www.hawking.org.uk/biography)\n\nMachine learning and artificial intelligence have had grown in popularity significantly over the past years. With this growth comes benefits and consequences. This article introduces the basic concepts of machine learning with intuitive visuals and little or no math/calculations. The goal is to give one a feel for how  machine learning works. Understanding will play a key role in the future of machine learning as not having a good understanding of what is happening can have dire consequences .\n\n## Intuitive Understanding\n\nAt its core machine learning is algorithm (or a set of instructions) for updating a parameters. For example, If I had a function that looked like this.\n\n    def housePriceModel(x0,x1,squareFootage):\n    \treturn x0 + squareFootage*x1\n\nThe goal of this function is to guess the price of the house when given a square footage and to do as as accurately as possible. It takes an **x0** and **x1** as parameters but we do not know what these parameters are. This is where machine learning comes to the rescue. Without machine learning we would pick an **x0** and **x1** by trial and error. We could pick them and then look at how well these two parameters work on a set of data. I have coded up a demo below so you can play the role of machine learning and see how well you can make this model preform. The goal is to tweak and change **x0** and **x1** and try to make the error as small as possible (we will get into how this is calculated later). The data that is being used for this is a [subset of a housing dataset](https://www.kaggle.com/c/house-prices-advanced-regression-techniques). Go ahead, play the role of machine learning, tweak **x0** and **x1** in the form below and see how small you can make the error."
  - template: iframe
    url: 'https://logan-ml-demo.netlify.app/'
date: '2021-05-05'
minRead: '6'
title: Learn what Machine Learning is
author: content/authors/logan_anderson.md
description: >-
  From the very basics, lean what machine learning is in a way that is easy to
  understand and accessible for all backgrounds. 
tags:
  - code
  - ML
_template: basic
---

If your anything like me you may have played around with **x1** or **x0** and looked at how the error was changing while you changed **x0** and **x1**. If it was going down one might keep changing the parameter and if it was going up we might change it in the other direction. What we just did was not machine learning but it was very close. Instead of you updating the parameters based on your intuition an algorithm updates the parameters based on mathematical principles.

test

## 

## 
