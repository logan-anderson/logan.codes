import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export interface FlyoutMenuProps {
  label: string;
  text: string;
  href: string;
}

const FlyoutMenuItem: React.FC<FlyoutMenuProps> = (props) => {
  return (
    <Link
      href={props.href}
      className="-m-3 p-3 block rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition ease-in-out duration-150"
    >
      <p className="text-base font-medium text-gray-900 dark:text-gray-100">
        {props.label}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
        {props.text}
      </p>
    </Link>
  );
};

const FlyoutMenuItems: FlyoutMenuProps[] = [
  {
    href: "/about",
    label: "About",
    text: "Learn more about my skills, passions and interests",
  },
  {
    href: "/contact",
    label: "Contact Me",
    text: "Ask me about anything",
  },
  {
    href: "/resources",
    label: "Resources",
    text: "Resources that I recommend for learning programming and web development",
  },
];

export const AboutFlyout: React.FC<{
  className?: string;
  absolute?: boolean;
}> = ({ className, absolute = true }) => {
  const [show, setShow] = useState(false);
  const node = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        node.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setShow(false);
      e.stopImmediatePropagation();
      e.stopPropagation();
    };
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return (
    <div className={`relative ${className || ""}`}>
      <button
        ref={buttonRef}
        onClick={() => {
          setShow(!show);
        }}
        type="button"
        className={`group rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
          show
            ? "text-gray-900 dark:text-gray-300"
            : "text-gray-700 dark:text-gray-200"
        }`}
      >
        <span>About</span>
        {/*
  Heroicon name: chevron-down
  Item active: "text-gray-600", Item inactive: "text-gray-400"
      */}
        <svg
          className={`ml-2 h-5 w-5 transform transition-transform duration-150 ${
            show ? "rotate-180" : ""
          } ${
            show
              ? "text-gray-600 dark:text-gray-300"
              : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Transition
        show={show}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div
          ref={node}
          className={`${
            absolute && "absolute left-1/2 -translate-x-1/2"
          } z-10 transform mt-3 px-2 w-screen max-w-xs sm:px-0 text-left`}
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
              {FlyoutMenuItems.map((item, i) => (
                <FlyoutMenuItem key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};
