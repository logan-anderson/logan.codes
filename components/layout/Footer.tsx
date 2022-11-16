import { useEditState } from "tinacms/dist/react";

// import Link from 'next/link';
const AppFooter = () => {
  const { edit } = useEditState();
  const canEdit = Boolean(Number(process.env.NEXT_PUBLIC_EDIT) || 0);

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
                window.location.assign(`/admin#/~${window.location.pathname}`);
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
export default AppFooter;
