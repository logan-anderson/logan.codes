import { Slide } from "react-awesome-reveal";
import type { GetStaticPropsResult } from "next";

import Layout from "../../components/layout/Layout";
import BlogCard from "../../components/BlogCard";
import { Tag } from "../../interfaces";
import Button from "../../components/Buttons/ToggleButton";
import { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/BreadCrumb";
import type { PostConnectionQuery } from "../../tina/__generated__/types";
import { getPosts } from "../../utils/getPosts";
import { useRouter } from "next/router";

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

const BlogList = ({ data }: { data: PostConnectionQuery }) => {
  // sort based on date added
  data.postConnection.edges?.sort(
    (x, y) =>
      new Date(y?.node?.date || "").getTime() -
      new Date(x?.node?.date || "").getTime()
  );
  // useCreateBlogPage(posts);
  let alltags: Tag[] = [];
  let tagMap = new Map();
  data?.postConnection?.edges?.forEach((doc) => {
    doc?.node?.tags?.forEach((tag) => {
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

  const router = useRouter();
  useEffect(() => {
    if (typeof router.query?.tags === "string") {
      const tags = router.query?.tags
        .split(",")
        .map((tag) => tag.trim().toLocaleLowerCase());

      setStateTags((prev) => {
        return prev.map((tag) => {
          if (tags?.includes(tag.name.toLocaleLowerCase())) {
            return {
              name: tag.name,
              selected: true,
            };
          } else {
            return {
              name: tag.name,
              selected: false,
            };
          }
        });
      });
    }
  }, [router.query?.tags]);

  return (
    <Layout title="Blog" preview={false}>
      <div className="max-w-prose mx-auto">
        <BreadCrumb links={[{ label: "Blog", href: "/blog" }]} />
        <Tags tags={stateTags} setTags={setStateTags} />
        {/* @ts-ignore */}
        <Slide direction="up" cascade duration={700} damping={0.1} triggerOnce>
          {data.postConnection?.edges
            ?.filter((post) => {
              const selectedTags: string[] = stateTags
                .filter((t) => t.selected)
                .map((el) => el.name);
              // if nothing is selected return everything
              if (selectedTags.length === 0) {
                return true;
              }
              return selectedTags.every((currentTag: string) => {
                return post?.node?.tags?.includes(currentTag);
              });
            })
            .map((postData) => {
              const post = postData?.node;
              return (
                <BlogCard
                  key={post?.id}
                  post={{
                    fileName: post?._sys?.filename || "",
                    fileRelativePath: post?._sys?.filename || "",
                    data: {
                      markdownBody: "",
                      frontmatter: {
                        minRead: post?.minRead || 3,
                        avatar: post?.author?.avatar || "",
                        author: post?.author?.name || "",
                        date: post?.date || "",
                        description: post?.description || "",
                        tags: post?.tags as string[],
                        title: post?.title || "",
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

export const getStaticProps = async () => {
  const res = await getPosts();

  return {
    revalidate: 3600,
    props: {
      data: res.data,
      query: res.query,
    },
  } as GetStaticPropsResult<{ data: PostConnectionQuery; query: string }>;
};
export default BlogList;
