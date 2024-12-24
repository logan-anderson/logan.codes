import { client } from "~/tina/__generated__/client";
import type { PostFilter } from "~/tina/__generated__/types";

export const getPosts = async () => {
  const showDrafts = Boolean(process.env.NEXT_PUBLIC_SHOW_DRAFTS || "");

  let filter: PostFilter = {};

  const today = new Date().toISOString();

  if (!showDrafts) {
    filter = { draft: { eq: false }, date: { before: today } };
  }

  const res = await client.queries.postConnection({
    filter,
  });
  return res;
};
