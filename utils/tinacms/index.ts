import { MarkdownFieldPlugin } from "react-tinacms-editor";
import { useCMS, usePlugins } from "tinacms";
import { useEditState } from "tinacms/dist/edit-state";

export const useSetupPlugins = () => {
  usePlugins([MarkdownFieldPlugin]);
};

export const useExitTina = () => {
  const cms = useCMS();
  const { setEdit } = useEditState();
  cms.events.subscribe("cms:disable", () => {
    setEdit(false);
  });
};
