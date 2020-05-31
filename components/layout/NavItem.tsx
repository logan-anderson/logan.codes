import Link from "next/link";

interface PropTypes {
    name?: string,
    link: string,
    children?: React.Component,
}

const NavItem = ( props : PropTypes) => { 
  return (
        <Link href={props.link}>
          <a 
          className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-blue-700"
          >
          {props.name || props.children}
         </a>
        </Link>
  );
};

export default NavItem;
