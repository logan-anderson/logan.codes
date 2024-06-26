import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import { FlyoutMenu } from "../FlyoutMenu";

export interface NavProps {
  showMobile: boolean;
  setShowMobile: (state: boolean) => void;
}

const AppIcon: React.FC<{
  icon: any;
  link: string;
  disableMargin?: boolean;
}> = (props) => {
  return (
    <a
      href={props.link}
      className={`inline-block mt-0 ${
        props.disableMargin ? "" : "ml-1"
      } text-blue-900 dark:text-blue-100 hover:text-blue-700 no-label transition duration-150 ease-in-out`}
      target="_blank"
      rel="noreferrer"
    >
      <FontAwesomeIcon icon={props.icon} className="inline-block h-6" />
    </a>
  );
};

const NavBar = () => {
  const router = useRouter();
  const blogActive = router.pathname.startsWith("/blog");
  const projectsActive = router.pathname.startsWith("/projects");
  const experienceActive = router.pathname.startsWith("/experience");
  const [showMobile, setShowMobile] = useState(false);
  return (
    <>
      <div className="relative pt-6 px-4 sm:pl-6 sm:pr-0 lg:pl-8 lg:pr-0">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/" aria-label="Home" className="no-underline">
                <strong
                  className={`text-blue-600 h-8 w-auto sm:h-10 no-underline text-3xl`}
                >
                  {"<Home/>"}
                </strong>
              </Link>
              <div className="mr-2 flex items-center md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                  id="main-menu"
                  aria-label="Main menu"
                  aria-haspopup="true"
                  onClick={() => setShowMobile(true)}
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="grid-cols-5 gap-1 hidden md:ml-10 md:grid">
            <FlyoutMenu className="text-center" />
            <div className="text-center">
              <Link
                href="/blog"
                className={`font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition duration-150 ease-in-out ${
                  blogActive ? "text-gray-900 dark:text-gray-200" : ""
                }`}
              >
                Blog Posts
              </Link>
            </div>
            <div className="text-center">
              <Link
                href="/projects"
                className={`font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition duration-150 ease-in-out  ${
                  projectsActive ? "text-gray-900 dark:text-gray-200" : ""
                }`}
              >
                Projects
              </Link>
            </div>
            <div className="text-center">
              <Link
                href="/experience"
                className={`font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition duration-150 ease-in-out  ${
                  experienceActive ? "text-gray-900 dark:text-gray-200" : ""
                }`}
              >
                Experience
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <AppIcon
                icon={faGithub}
                link="https://github.com/logan-anderson"
              />
              <AppIcon
                icon={faTwitter}
                link="https://twitter.com/logan_codes"
              />
              <AppIcon
                icon={faLinkedin}
                link="https://www.linkedin.com/in/logan-anderson-tech/"
              />
            </div>
          </div>
        </nav>
      </div>
      <MobileNav setShowMobile={setShowMobile} showMobile={showMobile} />
    </>
  );
};

const MobileMenuItem = (props: {
  href: string;
  title: string;
  active: boolean;
}) => {
  return (
    <Link
      href={props.href}
      className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-50 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700  focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out ${
        props.active
          ? "text-gray-900 bg-green-50 dark:bg-gray-700 dark:text-gray-200"
          : ""
      }`}
      role="menuitem"
    >
      {props.title}
    </Link>
  );
};

export const MobileNav: React.FC<NavProps> = ({
  showMobile,
  setShowMobile,
}) => {
  const router = useRouter();
  const blogActive = router.pathname.startsWith("/blog");
  const projectsActive = router.pathname.startsWith("/projects");
  const experienceActive = router.pathname.startsWith("/experience");
  return (
    <Transition
      show={showMobile}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {(ref) => (
        <div
          ref={ref}
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-30"
        >
          <div className="rounded-lg shadow-md">
            <div
              className="rounded-lg bg-white shadow-xs overflow-hidden dark:bg-gray-800"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="main-menu"
            >
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <Link href="/" aria-label="Home" className="no-underline">
                    <strong className="text-blue-600 h-8 w-auto sm:h-10 no-underline text-3xl">
                      {"<Home/>"}
                    </strong>
                  </Link>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                    aria-label="Close menu"
                    onClick={() => setShowMobile(false)}
                  >
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3">
                <FlyoutMenu
                  absolute={false}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                />
                <MobileMenuItem
                  title="Blog Posts"
                  href="/blog"
                  active={blogActive}
                />
                <MobileMenuItem
                  title="Projects"
                  href="/projects"
                  active={projectsActive}
                />
                <MobileMenuItem
                  title="Experience"
                  href="/experience"
                  active={experienceActive}
                />
                <div className="block nowrap px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50  dark:hover:bg-gray-600 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                  <AppIcon
                    icon={faGithub}
                    link="https://github.com/logan-anderson"
                  />
                  <AppIcon
                    icon={faTwitter}
                    link="https://twitter.com/logan_codes"
                  />
                  <AppIcon
                    icon={faLinkedin}
                    link="https://www.linkedin.com/in/logan-anderson-tech/"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};
export default NavBar;
