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

const DeleteAction = ({ form }: { form: Form }) => {
  const cms = useCMS();
  const [active, setActive] = React.useState(false);
  const open = () => setActive(true);
  const close = () => setActive(false);
  const title = "temp title";
  const filePath = "./some/file/path";

  return (
    <React.Fragment>
      <ActionButton onClick={open}>{`Delete ${title}`}</ActionButton>
      {active && (
        <Modal>
          <ModalPopup>
            <ModalHeader close={close}>{`Delete ${title}`} </ModalHeader>
            <ModalBody>{`Are you sure you want to delete ${title}`}</ModalBody>
            <ModalActions>
              <Button
                onClick={async () => {
                  try {
                    close();
                    await cms.alerts.info(`${filePath} was deleted`);
                  } catch (error) {
                    close();
                    cms.alerts.error(`Error in deleting ${filePath}`);
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

export default DeleteAction;
