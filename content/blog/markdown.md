---
title: What is Markdown
description: Learn more about markdown and what it is
date: 'Sunday, May 31st, 2020'
author: Logan Anderson
---
# .MD?

While browsing through **GitHub** or **GitLab** you may have noticed styled README files with a strange .md file extension. The MD stands for markdown. If that is strange or new to you you’re in the right spot! Keep reading and you will learn more about what markdown is and how to use it!

## What is markdown?

Markdown is similar to HTML in that it is a standard for structuring documents. Markdown and HTML both fall under the umbrella of languages called **markup languages.** A markup language is just a way to structure a document or file and tell a system how to display it. In the case of HTML, it tells the browser how to display the content. Markdown is no different; it allows one to write things with "_tags_" and tell a markdown transcompiler how to display the text.

## Why bother with markdown?

As mentioned markdown is used when writing documents with GitHub or GitLab, but some of the syntaxes are also supported in Google Docs, Slack, and many many other platforms. You can even use [Pandoc and markdown together](https://pandoc.org/MANUAL.html#pandocs-markdown "Pandoc and markdown together") to make beautiful documents, and even presentations if you use a tool like Beamer. I am even writing this blog in markdown.

## Ok, let's learn some stuff.

> Although there are different flavors/standards of markdown, they all of the same basic structure.

Headings are simple just a "#" followed by the text you want your heading to me. More #s the smaller the heading

Example

```markdown
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

```markdown
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

```markdown
1. thing one
2. thing two
3. thing three
```

would look like

1. thing one
2. thing two
3. thing three

Links are also easy the basic syntax is

```markdown
[This is the link to the source code of this page](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/blob/master/content/blog/markdown.md)
```

looks like

[This is the link to the source code of this page](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/blob/master/content/blog/markdown.md)

But the **Best thing of all** is code syntax highlighting
just put

```markdown
    ```{name of language}
    code goes here
    ```
```

So for example

```markdown
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

This is not a complete list you can do so much more with markdown for a full cheat sheet of all the cool stuff you can do [look here](https://www.markdownguide.org/cheat-sheet/).