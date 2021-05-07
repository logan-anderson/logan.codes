import { MarkdownFieldPlugin } from "react-tinacms-editor";
import { DateFieldPlugin } from "react-tinacms-date";
import { useCMS, usePlugins } from "tinacms";
import { useEditState } from "../editState";
import { BranchSwitcherPlugin } from "../../tina-components/BranchSwitcher";

export const useSetupPlugins = () => {
  usePlugins([MarkdownFieldPlugin, DateFieldPlugin, BranchSwitcherPlugin]);
};

export const useExitTina = () => {
  const cms = useCMS();
  const { setEdit } = useEditState();
  cms.events.subscribe("cms:disable", () => {
    setEdit(false);
  });
};
