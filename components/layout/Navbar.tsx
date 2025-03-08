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
import { AboutFlyout } from "~/components/FlyoutMenu";
// import BlobButton from "../Buttons/HamburgerButton";

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
      className={`inline-block ${
        props.disableMargin ? "" : "ml-1"
      } text-blue-900 dark:text-blue-100 hover:text-blue-700 hover:scale-110 transform transition-all duration-200`}
      target="_blank"
      rel="noreferrer"
    >
      <FontAwesomeIcon icon={props.icon} className="inline-block h-5" />
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
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto my-2 px-4 sm:px-6 lg:px-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <nav className="relative flex items-center justify-between py-3">
            <Link href="/" aria-label="Home" className="no-underline mr-2">
              <strong className="text-blue-600 text-2xl font-bold hover:text-blue-700 transition-colors duration-200">
                {"<Home/>"}
              </strong>
            </Link>
            {/* <BlobButton>Hi</BlobButton> */}

            <div className="hidden md:flex md:items-center">
              <div className="flex items-center gap-8">
                <AboutFlyout className="text-center" />
                <Link
                  href="/blog"
                  className={`font-medium px-3 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-all duration-200 ${
                    blogActive
                      ? "text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"
                      : ""
                  }`}
                >
                  Blog
                </Link>
                <Link
                  href="/projects"
                  className={`font-medium px-3 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-all duration-200 ${
                    projectsActive
                      ? "text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"
                      : ""
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/experience"
                  className={`font-medium px-3 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-all duration-200 ${
                    experienceActive
                      ? "text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"
                      : ""
                  }`}
                >
                  Experience
                </Link>
              </div>

              <div className="flex items-center space-x-4 ml-6 pl-6 border-l dark:border-gray-800">
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

            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
          </nav>
        </div>
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
      className={`block rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
        props.active
          ? "bg-gray-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
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
      className="fixed top-0 left-0 z-30 origin-top-right w-full"
      show={showMobile}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {(ref) => (
        <div ref={ref} className="p-4 transition transform md:hidden">
          <div className="rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 max-w-5xl mx-auto">
            <div className="px-5 pt-4 pb-3 flex items-center justify-between">
              <Link href="/" aria-label="Home" className="no-underline">
                <strong className="text-blue-600 h-8 w-auto sm:h-10 no-underline text-3xl">
                  {"<Home/>"}
                </strong>
              </Link>
              <div className="-mr-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="px-4 pt-3 pb-4 space-y-2">
              <AboutFlyout absolute={false} />
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
              <div className="block px-4 py-3 mt-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
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
      )}
    </Transition>
  );
};
export default NavBar;
