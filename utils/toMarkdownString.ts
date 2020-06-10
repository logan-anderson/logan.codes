import * as yaml from "js-yaml";

export default function toMarkdownString(remark: any) {
  return (
    "---\n" +
    yaml.dump(remark.rawFrontmatter) +
    "---\n" +
    (remark.rawMarkdownBody || "")
  );
}
