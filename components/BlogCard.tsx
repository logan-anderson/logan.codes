import Link from "next/link";

const navBar = () => {
  return (
    <div className="lg:w-1/3 px-4 mb-8 lg:mb-0">
      <div className="h-full">
        {/* <img className="mb-4" src="placeholders/pictures/work.jpg" alt=""><small>22 Oct 2019</small> */}
        <h3 className="text-2xl mt-2 mb-4 font-heading">
          Dwight doesn’t understand the paper
        </h3>
        <a className="text-blue-700 hover:underline" href="#">
            <Link href='/blog/[slug]' as='/blog/test'>
            
          Read more &raquo;
            </Link>
        </a>
      </div>
    </div>
  );
};

export default navBar;
