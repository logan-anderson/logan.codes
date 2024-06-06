import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { HeroTypingText } from "./HeroTypeing";

import NavBar from "./layout/Navbar";
import profilePic from "../public/img/me.jpeg";

const HeroTyping = dynamic(() => import("./HeroTypingLazy"), {
  ssr: false,
  loading: () => <HeroTypingText />,
});

export const Hero: React.FC = () => {
  return (
    <>
      <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-gray-900 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <NavBar />

            <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900  dark:text-white sm:text-5xl sm:leading-none md:text-6xl">
                  Hi 👋 Im Logan! {"     "}
                  <br />
                  <span
                    className={
                      "text-3xl sm:text-4xl md:text-5xl mt-2 mb-6 leading-tight font-heading"
                    }
                  >
                    I enjoy {"  "}
                    <HeroTyping />
                  </span>
                </h2>
                <p className="my-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  I am a dedicated husband, a skilled full stack web developer,
                  and a{" "}
                  <a
                    href="https://www.instagram.com/logan_discgolf/"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    disc golf enthusiast
                  </a>
                  . I currently work at{" "}
                  <Link
                    href="https://stripe.com/"
                    className="text-blue-600 hover:underline group"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      viewBox="0 0 60 25"
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="24"
                      className="inline fill-current"
                    >
                      <title>Stripe logo</title>
                      <path
                        d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"
                        fill-rule="evenodd"
                      ></path>
                      {/* <path d=" M0 23, L60, 20" /> */}
                      <line
                        x1="0"
                        y1="23"
                        x2="60"
                        y2="23"
                        stroke-width={2}
                        className="group-hover:stroke-blue-600"
                      />
                    </svg>
                    {/* <svg
                      width="400"
                      height="35"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-none group-hover:fill-current"
                    >
                    
                    </svg> */}
                  </Link>{" "}
                  as a{" "}
                  <Link
                    href={"/experience/stripe"}
                    className="text-blue-600 hover:underline"
                  >
                    full stack software engineer
                  </Link>
                  . I am passionate about{" "}
                  <Link
                    href="/blog?tags=ml"
                    className="text-blue-600 hover:underline"
                  >
                    machine learning
                  </Link>{" "}
                  and full stack web development.
                </p>
                <div className="flex justify-center lg:justify-start mt-6 ">
                  <div className="group relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 dark:text-gray-300 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-white/10 dark:hover:ring-white/20">
                    If you ❤️ work I have done consider{" "}
                    <a
                      href="https://buymeacoffee.com/logana"
                      target="_blank"
                      rel="noreferrer"
                      className="whitespace-nowrap font-semibold text-blue-600 group-hover:underline"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      Buying me a coffee <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full z-40">
            <Image
              src={profilePic}
              alt="A picture of Logan Anderson"
              placeholder="blur"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </>
  );
};
