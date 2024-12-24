import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { HeroTypingText } from "~/components/HeroTypeing";

import NavBar from "~/components/layout/Navbar";
import profilePic from "~/public/img/me.jpeg";

const HeroTyping = dynamic(() => import("./HeroTypingLazy"), {
  ssr: false,
  loading: () => <HeroTypingText />,
});

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
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

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Hi, I'm Logan</span>
                <span className="block text-3xl sm:text-4xl md:text-5xl mt-4 text-blue-600 dark:text-blue-500">
                  I enjoy <HeroTyping />
                </span>
              </h1>

              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 sm:text-2xl max-w-2xl leading-relaxed">
                I am a dedicated husband, skilled full stack web developer at{" "}
                <Link
                  href="https://stripe.com/"
                  className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                  target="_blank"
                  rel="noreferrer"
                >
                  Stripe
                </Link>
                , and a{" "}
                <a
                  href="https://www.instagram.com/logan_discgolf/"
                  target="_blank"
                  className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  disc golf enthusiast
                </a>
                .
              </p>

              <div className="mt-10 flex gap-4 justify-center lg:justify-start">
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Read My Blog
                </Link>
                <a
                  href="https://buymeacoffee.com/logana"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-gray-200 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Buy Me a Coffee ☕️
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
          <Image
            src={profilePic}
            alt="A picture of Logan Anderson"
            placeholder="blur"
            priority
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
