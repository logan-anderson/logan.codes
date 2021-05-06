import { useRouter } from "next/router";
import React from "react";
import {
  TinaCloudAuthWall,
  useGraphqlForms,
  useDocumentCreatorPlugin,
} from "tina-graphql-gateway";
import { TinaCMS } from "tinacms";
import { createClient } from "../utils";
import { useExitTina, useSetupPlugins } from "../utils/tinacms";
import { Spinner } from "./spinner";

export const TinaWrapper: React.FC<any> = (props) => {
  console.log("Tina Wrapper being rendered");
  const cms = React.useMemo(
    () =>
      new TinaCMS({
        toolbar: true,
        apis: {
          tina: createClient(),
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

  return (
    <TinaCloudAuthWall cms={cms}>
      {/* this is to prevent from trying to query non editable pages */}
      {props.query ? <Inner {...props} /> : props.children(props)}
    </TinaCloudAuthWall>
  );
};

const Inner = (props: any) => {
  const router = useRouter();
  const [payload, isLoading] = useGraphqlForms({
    query: (gql) => gql(props.query || ""),
    variables: props.variables || {},
    formify: ({ createForm, formConfig }) => {
      // this doesnt feel right
      formConfig.fields?.forEach((field) => {
        if (field.name === "blocks") {
          field.templates.longFormText.fields[0].component = "markdown";
        }
        if (field.name === "_body" || field.name === "longFormText") {
          field.component = "markdown";
        }
      });
      return createForm(formConfig);
    },
  });
  // sets up date and markdown plugin
  useSetupPlugins();
  // sets up a event listener that exits tina the way with using global state
  useExitTina();
  // creates documents
  useDocumentCreatorPlugin((args) => {
    switch (args.collection.slug) {
      case "posts":
        router.push(`/blog/${args.relativePath.replace(".md", "")}`);
    }
  });
  return (
    <>
      {isLoading ? (
        <>
          <div
            className="fixed w-full h-full z-40"
            style={{
              pointerEvents: "none",
              background: "rgba(255,255, 255, .3)",
            }}
          >
            <div className="fixed top-1/2 bottom-1/2  text-center w-full h-full font-bold z-50 text-black dark:text-white">
              Wait a bit, Tina is loading data from GitHub
              <div className="mx-auto">
                <Spinner />
              </div>
            </div>
          </div>
          <div
            style={{
              pointerEvents: "none",
            }}
          >
            {props.children(props)}
          </div>
        </>
      ) : (
        // pass the new edit state data to the child
        props.children({ ...props, data: payload })
      )}
    </>
  );
};
export default TinaWrapper;
