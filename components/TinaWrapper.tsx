import React from "react";
import { GithubClient } from "react-tinacms-github";
import { TinaCloudAuthWall } from "tina-graphql-gateway";
import { TinaCMS } from "tinacms";
import { createClient } from "../utils";

export const TinaWrapper: React.FC = ({ children }) => {
  const cms = React.useMemo(
    () =>
      new TinaCMS({
        apis: {
          tina: createClient(),
          github: new GithubClient({
            proxy: "/api/proxy-github",
            authCallbackRoute: "/api/create-github-access-token",
            clientId: process.env.GITHUB_CLIENT_ID || "err",
            baseRepoFullName: process.env.REPO_FULL_NAME || "err", // e.g: tinacms/tinacms.org,
            baseBranch: process.env.BASE_BRANCH || "err",
          }),
        },
        sidebar: {
          buttons: {
            save: `Publish`,
            reset: `Reset`,
          },
        },
        enabled: true,
      }),
    []
  );

  return <TinaCloudAuthWall cms={cms}>{children}</TinaCloudAuthWall>;
};

export default TinaWrapper;
