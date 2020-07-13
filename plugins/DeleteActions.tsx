import * as React from "react";
import {
  ActionButton,
  useCMS,
  Form,
  Modal,
  ModalPopup,
  ModalHeader,
  ModalBody,
  ModalActions,
} from "tinacms";
import { Button } from "@tinacms/styles";

// import {
//   Modal,
//   ModalPopup,
//   ModalHeader,
//   ModalBody,
//   ModalActions,
// } from "@tinacms/modals";
// import { Form, ActionButton } from "@tinacms/react-forms";
// import { useCMS } from "@tinacms/react-core";

const getTitleDefault = (form: Form) => {
  return form.name;
};

interface options {
  getTitle?: (form: Form) => string;
  getFilePath?: (form: Form) => string;
}

export const createMarkdownDeleteAction = (
  { getTitle = getTitleDefault, getFilePath = getTitleDefault }: options = {
    getTitle: getTitleDefault,
    getFilePath: getTitleDefault,
  }
) => {
  const DeleteAction = ({ form }: { form: Form }) => {
    const cms = useCMS();
    const [active, setActive] = React.useState(false);
    const open = () => setActive(true);
    const close = () => setActive(false);
    const title = getTitle!(form);
    // const title = form.label;
    const filePath = getFilePath!(form);

    return (
      <React.Fragment>
        <ActionButton onClick={open}>{`Delete ${title}`}</ActionButton>
        {active && (
          <Modal>
            <ModalPopup>
              <ModalHeader close={close}>{`Delete ${title}`} </ModalHeader>
              <ModalBody>
                {`Are you sure you want to delete ${title}`}
              </ModalBody>
              <ModalActions>
                <Button
                  onClick={async () => {
                    try {
                      close();
                      await cms.api.github.delete!(filePath);
                      await cms.alerts.info(`${filePath} was deleted`);
                    } catch (error) {
                      close();
                      cms.alerts.error(`Error in deleting ${filePath}`);
                      console.error(error);
                    } finally {
                      window.history.back();
                    }
                  }}
                >
                  Yes
                </Button>
                <Button onClick={close}>No</Button>
              </ModalActions>
            </ModalPopup>
          </Modal>
        )}
      </React.Fragment>
    );
  };

  return DeleteAction;
};
