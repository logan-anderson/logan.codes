import { useContext } from "react";
import BlogCard from "../components/BlogCard";
import { Post } from "../interfaces";
import { TagContext } from "../components/Context/Tagcontext";

interface PostsProps {
    posts: Post[]
}
const PostList = ({ posts }: PostsProps) => {
    const { tags } = useContext(TagContext)
    return (
        <section>
            {posts.filter((post) => {
                const selectedTags: string[] = tags
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
                })

            }
        </section>
    )
}

export default PostList