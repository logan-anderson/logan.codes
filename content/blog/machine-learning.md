---
blocks:
  - template: longFormText
    content: "# What is Machine Learning\n\n> Success in creating AI would be the biggest event in human history. Unfortunately, it might also be the last, unless we learn how to avoid the risks\n\n\\- [Stephen Hawking](https://www.hawking.org.uk/biography)\n\nMachine learning and artificial intelligence have had grown in popularity significantly over the past years. With this growth comes benefits and consequences. This article introduces the basic concepts of machine learning with intuitive visuals and little or no math/calculations. The goal is to give one a feel for how machine learning works. Understanding will play a key role in the future of machine learning as not having a good understanding of what is happening can have dire consequences.\n\n## Intuitive Understanding\n\nAt its core machine learning is an algorithm (or a set of instructions) for updating parameters. For example, If I had a function that looked like this.\n\n    def housePriceModel(x0,x1,squareFootage):\n    \treturn x0 + squareFootage*x1\n\nThe goal of this function is to guess the price of the house when given square footage and to do it as accurately as possible. It takes an **x0** and **x1** as parameters but we do not know what these parameters are. This is where machine learning comes to the rescue. Without machine learning, we would pick an **x0** and **x1** by trial and error. We could pick them and then look at how well these two parameters work on a set of data. I have coded up a demo below so you can play the role of machine learning and see how well you can make this model perform. The goal is to tweak and change **x0** and **x1** and try to make the error as small as possible (we will get into how this is calculated later). The data that is being used for this is a [subset of a housing dataset](https://www.kaggle.com/c/house-prices-advanced-regression-techniques). Go ahead, play the role of machine learning, tweak **x0** and **x1** in the form below and see how small you can make the error."
  - template: iframe
    url: 'https://logan-ml-demo.netlify.app/'
date: '2021-05-15'
minRead: '6'
title: An accessible intro to Machine Learning
author: content/authors/logan_anderson.md
description: >-
  From the very basics, learn what machine learning is in a way that is easy to
  understand, intuitive, and accessible for all backgrounds. Even if you are a
  beginner, learn about what is a Machine Learning model, cost function, and
  gain an intuitive understanding of how a model learns.
tags:
  - code
  - ML
_template: basic
---

If your anything like me you may have played around with **x1** or **x0** and looked at how the error was changing while you changed **x0** and **x1**. If it was going down one might keep changing the parameter and if it was going up we might change it in the other direction. What we just did was not machine learning but it was very close. Instead of you updating the parameters based on your intuition an algorithm updates the parameters based on mathematical principles.

Although important these mathematical principles often trip people up and can be a barrier to entry to learning machine learning. Let's go over some of them to gain further insight into how machine learning works.

### Machine learning model

The function that is learned in the machine learning process. In the example we just looked at it was the `housePriceModel`. This function has parameters that are learned. In our case, it was **x0** and **x1**. 

### Cost Function

A cost function is a function that lets provide a measure for how will that machine learning model is performing on a set of examples. The cost function takes a model as input and outputs how well it is doing.  If our model is doing well on a set of examples the cost will below. If it is doing poorly the cost is high. This is also sometimes called the Loss or Error function. In our example, the cost function was Cost(x, h) = (h(price) - RealPice)^2. Where **h** is our model.

I know this is a lot to take in but hopefully, you are still following. 

### But How does the model _Learn_

The model learns by calculating the gradient of the cost function. In basic terms, the gradient is how each parameter (**x0** and **x1**) changes in relation to the cost. A big change will mean it affects the cost a lot and a little change will mean it affects the cost a little. Similarly to how in our example we change **x0** and **x1** until we say a decrease in cost. The gradient is the same idea but expressed in terms of math, namely calculus. 

Now that we have some basic intuition we can see the learning process as a series of steps

1. Calculate the cost of your model
2. Is it good?
   1. If it is we can stop (we have a good model)
3. Not good?
   1. We calculate the gradient and make a small change to our model based on it
4. Go back to step one and repeat the process

There is a lot we have glossed over but hopefully, this provides some basic insight into how machine learning works and demystifies some of the magic.
