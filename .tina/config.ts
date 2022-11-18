import { defineConfig } from "tinacms";
import schema from "./schema";

const config = defineConfig({
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  schema,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.NEXT_PUBLIC_TINA_TOKEN || "",
});

console.log({ config });
export default config;
