// import Link from 'next/link';
import { useCMS } from 'tinacms';
const AppFooter = () => {
  return (
    <footer className="flex flex-wrap items-center justify-between p-4">
      <div className="w-full lg:w-auto lg:mr-6 mb-4 lg:mb-0 text-center">
        &copy; Logan
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
        <div className="mx-auto lg:mx-0 lg:ml-auto">
         <EditLink/>
        </div>
      </div>
    </footer>
  );
};
export interface EditLinkProps {
  editMode: boolean
}
export const EditLink = () => {
  const cms = useCMS()

  return (
    <button onClick={() => cms.toggle()} className="bg-transparent hover:bg-indigo-500 text-indigo-700 hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded-full">
      {cms.enabled ? 'Exit Edit Mode' : 'See a spelling Error? (I make lots) click here to edit this site'}
    </button>
  )
}
export default AppFooter;
