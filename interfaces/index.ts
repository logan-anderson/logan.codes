// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type Post = {
  fileName: string;
  fileRelativePath: string;
  data: {
    frontmatter: {
      avatar: string;
      description: string;
      title: string;
      date: string;
      author: string;
      tags: string[];
    };
    markdownBody: string;
  };
};
export type Tag = {
  name: string;
  selected: Boolean;
};
