import { useEditState } from "../../utils/editState";

// import Link from 'next/link';
const AppFooter = () => {
  const { edit, setEdit } = useEditState();
  const canEdit = process.env.NEXT_PUBLIC_EDIT;

  return (
    <footer className="flex flex-wrap items-center justify-between p-4">
      <div className="w-full lg:w-auto lg:mr-6 mb-4 lg:mb-0 text-center dark:text-gray-50">
        &copy; Logan
      </div>
      {canEdit && (
        <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
          <div className="mx-auto lg:mx-0 lg:ml-auto text-black dark:text-white">
            <button
              onClick={() => {
                setEdit(!edit);
              }}
            >
              {edit ? "Exit edit mode" : "Edit as Admin"}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
export interface EditLinkProps {
  editMode: boolean;
}
export const EditLink = ({ editMode }: EditLinkProps) => {
  // const github = useGithubEditing();

  return (
    <button
      // onClick={editMode ? github.exitEditMode : github.enterEditMode}
      className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
    >
      {editMode
        ? "Exit Edit Mode"
        : "See a spelling Error? (I make lots) click here to edit this site"}
    </button>
  );
};
export default AppFooter;
