import React from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "tinacms/dist/rich-text";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { okaidia as Theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
export const STYLES =
  "prose prose-blue prose-lg text-lg max-w-prose mx-auto mb-6 dark:prose-dark";

export const components: Components<any> = {
  h1: (props) => {
    return (
      <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 dark:text-gray-50">
        {props?.children}
      </h1>
    );
  },
  p: (props) => {
    return <p className="text-gray-500 mx-auto">{props?.children}</p>;
  },
  code_block: (props) => {
    return (
      <SyntaxHighlighter
        style={Theme}
        language={props?.lang}
        children={props?.value}
      />
    );
  },
};
export const componentsTemp = {
  heading: ({ children, level }: any) => {
    if (level === 1) {
      return (
        <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 dark:text-gray-50">
          {children}
        </h1>
      );
    } else {
      return (
        <h2 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 dark:text-gray-50">
          {children}
        </h2>
      );
    }
  },
  paragraph: ({ children }: any) => {
    return <p className="text-gray-500 mx-auto">{children}</p>;
  },
  code: ({ language, value }: any) => {
    return (
      <SyntaxHighlighter style={Theme} language={language} children={value} />
    );
  },
};
export const MarkdownBody: React.FC<ReactMarkdown.ReactMarkdownProps> = (
  props
) => {
  return (
    // @ts-ignore
    <ReactMarkdown
      renderers={{
        heading: ({ children, level }) => {
          if (level === 1) {
            return (
              <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 dark:text-gray-50">
                {children}
              </h1>
            );
          } else {
            return (
              <h2 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 dark:text-gray-50">
                {children}
              </h2>
            );
          }
        },
        paragraph: ({ children }) => {
          return <p className="text-gray-500 mx-auto">{children}</p>;
        },
        code: ({ language, value }) => {
          return (
            <SyntaxHighlighter
              style={Theme}
              language={language}
              children={value}
            />
          );
        },
      }}
      {...props}
    />
  );
};
