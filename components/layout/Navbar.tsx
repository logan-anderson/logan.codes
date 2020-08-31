import Link from "next/link";
import NavItem from "./NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const AppIcon: React.FC<{ icon: any; link: string }> = (props) => {
  return (
    <a
      href={props.link}
      className="inline-block mt-0 ml-3 text-blue-900 hover:text-blue-700 no-label"
      target="_blank"
    >
      <FontAwesomeIcon width="25px" icon={props.icon} />
    </a>
  );
};

const navBar = () => {
  return (
    <nav className="flex flex-wrap items-top justify-between py-4 text-xl">
      {/* main  nav */}
      <div className="order-2 flex w-auto text-center">
        <div className="text-xl color-primary font-semibold">
          <Link href="/">
            <a className="no-label">Home</a>
          </Link>
        </div>
      </div>
      {/* left side */}
      <div className="navbar-menu order-1 flex w-1/3 text-left">
        <a
          href="https://logan.bio"
          className="inline-block  text-blue-900 hover:text-blue-700 no-label my-auto"
        >
          More about me
        </a>
        <NavItem name="Resources" link="/resources" />
      </div>
      <div className="navbar-menu order-3 flex w-1/3 text-right justify-end">
        {/* <div className="flex"> */}
        <NavItem name="All posts" link="/blog" />
        <AppIcon icon={faGithub} link="https://github.com/logan-anderson" />
        <AppIcon icon={faTwitter} link="https://twitter.com/logan_anders0n" />
        <AppIcon
          icon={faLinkedin}
          link="https://www.linkedin.com/in/logan-anderson-tech/"
        />
        {/* </div> */}
      </div>
    </nav>
  );
};

export default navBar;
