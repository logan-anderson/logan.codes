import Link from "next/link";
import NavItem from './NavItem'

const navBar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between p-4">
      <div className="lg:order-2 w-auto lg:w-1/3 lg:text-center">
        <div className="text-xl text-indigo-500 font-semibold">
          {/* main nav */}
          {/* <Link href="/"> */}
              Home
          {/* </a> */}
          {/* </Link> */}
        </div>
      </div>
      {/* mobile button */}
      <div className="block lg:hidden">
        <button className="navbar-burger flex items-center py-2 px-3 text-indigo-500 rounded border border-indigo-500">
          <svg
            className="fill-current h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"> </path>
          </svg>
        </button>
      </div>
      {/* left side */}
      <div className="navbar-menu hidden lg:order-1 lg:block w-full lg:w-1/3 lg:text-left">
      <a
        href="https://logan.bio"
        className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-blue-700"
      >
        More about me
         </a>
      </div>
      <div className="navbar-menu hidden lg:order-3 lg:block w-full lg:w-1/3 lg:text-right">
        <NavItem name="All blogs" link="/blog" />

      </div>
    </nav>
  );
};

export default navBar;
