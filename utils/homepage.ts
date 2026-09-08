import type { Post } from "~/interfaces";

type HomepageProject = {
  slug: string;
  featuredOnHome?: boolean;
  website?: string;
};

export const HOME_PROJECT_SLUG = "the-fairway";

export type HomepagePostEdge = {
  node?: {
    draft?: boolean | null;
    homepageFeatured?: boolean | null;
    date?: string | null;
    title?: string | null;
    description?: string | null;
    tags?: (string | null)[] | null;
    minRead?: number | null;
    author?: {
      name?: string | null;
      avatar?: string | null;
    } | null;
    _sys?: {
      filename?: string;
    };
  } | null;
};

export function formatPostDate(date?: string | null): string | null {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function sortPostsByDateDesc<T extends HomepagePostEdge>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.node?.date || "").getTime() -
      new Date(a.node?.date || "").getTime()
  );
}

/**
 * Pick the homepage featured post:
 * pinned (`homepageFeatured` and not draft), newest date wins if multiple;
 * otherwise the latest non-draft by date.
 */
export function resolveHomepagePosts<T extends HomepagePostEdge>(
  edges: (T | null | undefined)[] | null | undefined
): { featured: T | null; secondary: T[] } {
  const posts = (edges || []).filter((edge): edge is T => {
    return Boolean(edge?.node) && edge?.node?.draft !== true;
  });

  if (posts.length === 0) {
    return { featured: null, secondary: [] };
  }

  const pinned = posts.filter((edge) => edge.node?.homepageFeatured === true);
  const featured =
    (pinned.length > 0 ? sortPostsByDateDesc(pinned) : sortPostsByDateDesc(posts))[0] ??
    null;
  const featuredFilename = featured?.node?._sys?.filename;
  const secondary = sortPostsByDateDesc(posts)
    .filter((edge) => edge.node?._sys?.filename !== featuredFilename)
    .slice(0, 2);

  return { featured, secondary };
}

export function toCardPost(post: NonNullable<HomepagePostEdge["node"]>): Post {
  return {
    fileName: post._sys?.filename || "",
    fileRelativePath: post._sys?.filename || "",
    data: {
      markdownBody: "",
      frontmatter: {
        author: post.author?.name || "",
        avatar: post.author?.avatar || "",
        date: post.date || "",
        description: post.description || "",
        minRead: post.minRead || 2,
        tags: (post.tags || []).filter((tag): tag is string => Boolean(tag)),
        title: post.title || "",
      },
    },
  };
}

export function getHomepageProject<T extends HomepageProject>(
  projects: T[] | null | undefined
): T | null {
  if (!projects?.length) return null;
  const featured = projects.filter((project) => project.featuredOnHome);
  if (featured.length > 0) {
    return featured[0];
  }
  return projects.find((project) => project.slug === HOME_PROJECT_SLUG) ?? null;
}
