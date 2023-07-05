import Link from "next/link";

interface PropTypes {
  name?: string;
  link: string;
  children?: any;
}

const NavItem = (props: PropTypes) => {
  return (
    <Link
      href={props.link}
      className="inline-block ml-3 text-blue-900 hover:text-blue-700 no-label my-auto"
    >
      {props.name || props.children}
    </Link>
  );
};

export default NavItem;
