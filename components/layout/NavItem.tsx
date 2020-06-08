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
          className="block inline-block mt-0 text-blue-900 hover:text-blue-700 no-label"
          >
          {props.name || props.children}
         </a>
        </Link>
  );
};

export default NavItem;
