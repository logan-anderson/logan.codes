import Layout from "../../components/layout/Layout";
import BlogCard from "../../components/BlogCard";
import { Tag } from "../../interfaces";
import Button from "../../components/Buttons/ToggleButton";
import { useState } from "react";
import { BreadCrumb } from "../../components/BreadCrumb";
import { Slide } from "react-awesome-reveal";
import { GetStaticProps } from "next";
import { createLocalClient } from "../../utils";
import { AllPostsQuery, AllPostsQueryRes } from "../../graphql-queries";

const Tags = ({
  tags,
  setTags,
}: {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}) => {
  const result = [];
  const map = new Map();
  for (const item of tags) {
    if (!map.has(item.name)) {
      map.set(item.name, true); // set any value to Map
      result.push(item);
    }
  }
  // const uniqueTags = tags.filter()
  return (
    <>
      <h4 className="dark:text-gray-50">Filter by tags:</h4>
      <div className="tags">
        {result?.map((tag: Tag) => {
          return (
            <span key={tag.name}>
              <Button
                clickAction={(e) => {
                  const newTags = tags.map((tag) => {
                    // @ts-ignore
                    if (tag.name === e.target.innerHTML) {
                      return {
                        name: tag.name,
                        selected: !tag.selected,
                      };
                    } else {
                      return tag;
                    }
                  });
                  setTags(newTags);
                }}
                active={tag.selected}
              >
                {tag.name}
              </Button>
            </span>
          );
        })}
      </div>
    </>
  );
};

interface BlogListProps {
  data: AllPostsQueryRes;
}

const BlogList = ({ data }: BlogListProps) => {
  // useCreateBlogPage(posts);
  let alltags: Tag[] = [];
  let tagMap = new Map();
  data.getPostsList.forEach((doc) => {
    doc.data?.tags?.forEach((tag) => {
      if (tag && !tagMap.has(tag)) {
        alltags.push({
          name: tag,
          selected: false,
        });
      }
      tagMap.set(tag, true);
    });
  });
  let [stateTags, setStateTags] = useState<Tag[]>(alltags);

  return (
    <Layout title="Blog" preview={false}>
      <div className="max-w-prose mx-auto">
        <BreadCrumb links={[{ label: "Blog", href: "/blog" }]} />
        <Tags tags={stateTags} setTags={setStateTags} />
        <Slide direction="up" cascade duration={700} damping={0.1} triggerOnce>
          {data.getPostsList
            .filter((post) => {
              const selectedTags: string[] = stateTags
                .filter((t) => t.selected)
                .map((el) => el.name);
              // if nothing is selected return everything
              if (selectedTags.length === 0) {
                return true;
              }
              return selectedTags.every((currentTag: string) => {
                return post.data?.tags?.includes(currentTag);
              });
            })
            .map((post) => {
              return (
                <BlogCard
                  key={post.id}
                  post={{
                    fileName: post.sys?.filename || "",
                    fileRelativePath: post.sys?.filename || "",
                    data: {
                      markdownBody: post.data?._body || "",
                      frontmatter: {
                        minRead: post.data?.minRead || "",
                        avatar: post.data?.author?.data?.avatar || "",
                        author: post.data?.author?.data?.name || "",
                        date: post.data?.date || "",
                        description: post.data?.description || "",
                        tags: post.data?.tags as string[],
                        title: post.data?.title || "",
                      },
                    },
                  }}
                />
              );
            })}
        </Slide>
      </div>
    </Layout>
  );
};

const client = createLocalClient();
export const getStaticProps: GetStaticProps = async () => {
  const blogPosts = await client.request<AllPostsQueryRes>(AllPostsQuery, {
    variables: {},
  });
  // sort based on date added
  blogPosts.getPostsList.sort(
    (x, y) =>
      new Date(y.data?.date || "").getTime() -
      new Date(x.data?.date || "").getTime()
  );
  return {
    props: {
      data: blogPosts,
      query: AllPostsQuery,
    },
  };
};
export default BlogList;
