import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { okaidia as Theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
export const MarkdownBody: React.FC<{ source: string }> = ({ source }) => {
  return (
    <ReactMarkdown
      renderers={{
        heading: ({ children, level }) => {
          if (level === 1) {
            return (
              <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 ">
                {children}
              </h1>
            );
          } else {
            return (
              <h2 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 ">
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
      source={source}
    />
  );
};
