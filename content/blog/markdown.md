---
minRead: '2'
date: 'May 31, 2020'
title: What is Markdown
author: content/authors/logan_anderson.md
description: Learn more about Markdown and what it is
tags:
  - markdown
  - code
_template: basic
---

# .MD?

While browsing through **GitHub** or **GitLab** you may have noticed styled README files with a strange `.md` file extension. The MD stands for Markdown. If that is strange or new to you you’re in the right spot! Keep reading and you will learn more about what Markdown is and how to use it!

## What is Markdown?

Markdown is similar to HTML in that it is a [standard](https://commonmark.org/) for structuring documents. Markdown and HTML both fall under the umbrella of languages called **markup languages.** A markup language is just a way to structure a document or file and tell a system how to display it. In the case of HTML, it tells the browser how to display the content. Markdown is no different; it allows one to write things with "_tags_" and tell a Markdown transcompiler how to display the text.

## Why bother with Markdown?

As mentioned Markdown is used when writing documents with GitHub or GitLab, but some of the syntaxes are also supported in Google Docs, Slack, and many many other platforms. You can even use [Pandoc and Markdown together](https://pandoc.org/MANUAL.html#pandocs-markdown "Pandoc and Markdown together") to make beautiful documents, and even presentations if you use a tool like Beamer. I am even writing this blog in Markdown.

## Ok, let's learn some stuff.

> Although there are different flavors/standards of Markdown, they all of the same basic structure.

Headings are simple just a "#" followed by the text you want your heading to me. More #s the smaller the heading

Example

```md
# heading one
## heading two
### heading three
...
###### heading 6
```

This will look like

# heading one

## heading two

### heading 3

...

###### Heading 6

Lists are also easy just use a "-" or "*" of unordered lists and numbers for an ordered list.

```md
- This
- is
- a
- list
```

would look like

* this
* is
* a
* list
  and

```md
1. thing one
2. thing two
3. thing three
```

would look like

1. thing one
2. thing two
3. thing three

Links are also easy the basic syntax is

```md
[This is the link to the source code of this page](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/blob/master/content/blog/markdown.md)
```

looks like

[This is the link to the source code of this page](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/blob/master/content/blog/markdown.md)

But the **Best thing of all** is code syntax highlighting
just put

```md
    ```{name of language}
    code goes here
    ```
```

So for example

```md
    ```js
    const logan = new Person();
    let age = 20;
    if(logan.isBirthday()){
        age++;
    }
    ```
```

would look like

```js
const logan = new Person();
let age = 20;
if( logan.isBirthday() ){
    age++;
}
```

This is not a complete list you can do so much more with Markdown for a full cheatsheet of all the cool stuff you can do [look here](https://www.markdownguide.org/cheat-sheet/).
