import { MarkdownFieldPlugin } from "react-tinacms-editor";
import { DateFieldPlugin } from "react-tinacms-date";
import { useCMS, usePlugins } from "tinacms";
import { useEditState } from "tina-graphql-gateway";

export const useSetupPlugins = () => {
  usePlugins([MarkdownFieldPlugin, DateFieldPlugin]);
};

export const useExitTina = () => {
  const cms = useCMS();
  const { setEdit } = useEditState();
  cms.events.subscribe("cms:disable", () => {
    setEdit(false);
  });
};
