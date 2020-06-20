import { PreviewData } from "next-tinacms-github";

import getPosts from "../../utils/getPosts";
import Layout from "../../components/layout/Layout";
import BlogCard from "../../components/BlogCard";
import useCreateBlogPage from "../../hooks/useCreateBlogPage";
import { Post, Tag } from "../../interfaces";
import Button from "../../components/Buttons/ToggleButton";
import { useState } from "react";

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
      <h4>Filter by tags:</h4>
      <div className="tags">
        {result.map((tag: Tag) => {
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
  posts: Array<Post>;
  tags: Tag[];
  preview: boolean;
}

const BlogList = ({ posts, preview, tags }: BlogListProps) => {
  useCreateBlogPage(posts);
  let [stateTags, setStateTags] = useState(tags);

  return (
    <Layout title="Blog" preview={preview}>
      <Tags tags={stateTags} setTags={setStateTags} />
      {posts
        .filter((post) => {
          const selectedTags: string[] = stateTags
            .filter((t) => t.selected)
            .map((el) => el.name);
          // if nothing is selected return everything
          if (selectedTags.length === 0) {
            return true;
          }
          return selectedTags.every((currentTag: string) => {
            return post.data.frontmatter.tags?.includes(currentTag);
          });
        })
        .map((post: Post) => {
          return <BlogCard key={post.fileName} post={post} />;
        })}
    </Layout>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
interface Props {
  previewData: PreviewData<any>;
  preview: boolean;
}
export const getStaticProps = async function ({ preview, previewData }: Props) {
  try {
    const { posts, tags } = await getPosts(
      preview,
      previewData,
      "content/blog"
    );

    return {
      props: {
        posts,
        tags,
        preview: preview ?? false,
      },
    };
  } catch (e) {
    return {
      props: {
        previewError: { ...e }, //workaround since we cant return error as JSON
      },
    };
  }
};

export default BlogList;
