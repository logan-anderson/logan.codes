---
title: How to add a new action to a tinaCMS form
author: Logan Anderson
description: >-
  How to add a new action to a tinaCMS form. This brief tutorial will show you
  how to make a new action specifically,  a delete action. 
frontmatter:
  tags:
    - nextjs
    - tinaCMS
    - code
date: 'Mon Jul 13 2020 09:42:46 GMT-0300 (Atlantic Daylight Time)'
---
# how to make a form action

In this post, I will be going over how to make a form of action in tinaCMS. In my case, I wanted to make an action so that I could delete blog posts from my website.

A form action in TinaCMS is just a react component that loads with in the alt menu of the form.  See below.

In my example I an using [open authoring with nextjs](asdf) and a GitHub backend. This blog is hosted on vercel and takes advantage of there [api serverless functions](asdf).

## A simple action

> Notte: for my examples I will be using typescript. But everything should also work in javascript (just take out the types)

Let's say we wanted a picture of a lama to show up in our actions (because who doesn't like lamas). This would be pretty simple let's just create a react component that contains an image of lamas.

```ts
import { Form } from  "tinacms";
import  *  as  React  from  "react";

export  default  function  Lama({ form }: { form: Form }) {
return (
	<img
		crossOrigin="anonymous"
		src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Llama_lying_down.jp	g/1024px-Llama_lying_down.jpg"
		alt="Llama lying down.jpg"
		width="836"
		height="559"
	/>);
}
```

and then on our page we can do

```ts
 const formOptions = {
    actions: [lamaAction],
    label: "Home Page",
    fields: [
      {
        label: "Subtitle",
        name: "posts_title",
        component: "text",
      },
    ],
  };
const [data, form] = useGithubJsonForm(file, formOptions);
usePlugin(form);
```

:smile: look at that :fireworks:
<link to img>

Note for other frameworks we may have to switch `useGithubJsonForm` to `useForm` or some else.

## Getting started

Ok, let's get to make the `delete action`.

First, we are going to use the tinaCMS buttons and modal to the skelton of our delete action.

```ts
import * as React from "react";
import {
  ActionButton,
  useCMS,
  Form,
  Modal,
  ModalPopup,
  ModalHeader,
  ModalBody,
  ModalActions,
} from "tinacms";
import { Button } from "@tinacms/styles";

const DeleteAction = ({ form }: { form: Form }) => {
  const cms = useCMS();
  const [active, setActive] = React.useState(false);
  const open = () => setActive(true);
  const close = () => setActive(false);
  const title = "temp title";
  const filePath = "./some/file/path";

  return (
    <React.Fragment>
      <ActionButton onClick={open}>{`Delete ${title}`}</ActionButton>
      {active && (
        <Modal>
          <ModalPopup>
            <ModalHeader close={close}>{`Delete ${title}`} </ModalHeader>
            <ModalBody>{`Are you sure you want to delete ${title}`}</ModalBody>
            <ModalActions>
              <Button
                onClick={async () => {
                  try {
                    close();
                    await cms.alerts.info(`${filePath} was deleted`);
                  } catch (error) {
                    close();
                    cms.alerts.error(`Error in deleting ${filePath}`);
                  } finally {
                    window.history.back();
                  }
                }}
              >
                Yes
              </Button>
              <Button onClick={close}>No</Button>
            </ModalActions>
          </ModalPopup>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default DeleteAction;
```

in our blog post file, we can add this

```ts
import  DeleteAction  from  "../../plugins/delete-test";
//...
 const formOptions = {
    label: "Edit doc page",
    actions: [DeleteAction],
    fields: [
      {
        name: "frontmatter.title",
        label: "Title",
        component: "text",
      },
      //...
 }
const [data, form] = useGithubMarkdownForm(props.file, formOptions);
usePlugin(form);
//..
```

(screenshot here)

:smile: now we have a popup and button next let make it do something.

Next, we are going to get access to our tinaCMS client and call delete on it when the `yes` button is clicked.  To do this we are going to use a factory function to allow us to change the way we access the form title and path.

```ts
import * as React from "react";
import {
  ActionButton,
  useCMS,
  Form,
  Modal,
  ModalPopup,
  ModalHeader,
  ModalBody,
  ModalActions,
} from "tinacms";
import { Button } from "@tinacms/styles";

const getTitleDefault = (form: Form) => {
  return form.name;
};

interface options {
  getTitle?: (form: Form) => string;
  getFilePath?: (form: Form) => string;
}

export const createMarkdownDeleteAction = (
  { getTitle = getTitleDefault, getFilePath = getTitleDefault }: options = {
    getTitle: getTitleDefault,
    getFilePath: getTitleDefault,
  }
) => {
  const DeleteAction = ({ form }: { form: Form }) => {
    const cms = useCMS();
    const [active, setActive] = React.useState(false);
    const open = () => setActive(true);
    const close = () => setActive(false);
    const title = getTitle!(form);
    const filePath = getFilePath!(form);

    return (
      <React.Fragment>
        <ActionButton onClick={open}>{`Delete ${title}`}</ActionButton>
        {active && (
          <Modal>
            <ModalPopup>
              <ModalHeader close={close}>{`Delete ${title}`} </ModalHeader>
              <ModalBody>
                {`Are you sure you want to delete ${title}`}
              </ModalBody>
              <ModalActions>
                <Button
                  onClick={async () => {
                    try {
                      close();
                      await cms.api.github.delete!(filePath);
                      await cms.alerts.info(`${filePath} was deleted`);
                    } catch (error) {
                      close();
                      cms.alerts.error(`Error in deleting ${filePath}`);
                      console.error(error);
                    } finally {
                      window.history.back();
                    }
                  }}
                >
                  Yes
                </Button>
                <Button onClick={close}>No</Button>
              </ModalActions>
            </ModalPopup>
          </Modal>
        )}
      </React.Fragment>
    );
  };

  return DeleteAction;
};
```

Since we are using a factory function our blog file will look slighty differnt.

```diff
- import  DeleteAction  from  "../../plugins/delete-test";
+ import  {createMarkdownDeleteAction}  from  "../../plugins/delete-test";
//...
+ const deleteAction = createMarkdownDeleteAction()
 const formOptions = {
    label: "Edit doc page",
    actions: [DeleteAction],
    fields: [
      {
        name: "frontmatter.title",
        label: "Title",
        component: "text",
      },
      //...
 }
const [data, form] = useGithubMarkdownForm(props.file, formOptions);
usePlugin(form);
//...
```