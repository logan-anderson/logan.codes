import { useEffect, createRef } from "react";
import Link from "next/link";
import { TextPlugin } from "gsap/dist/TextPlugin";
import { gsap } from "gsap";
import profilePic from "../public/img/me.jpeg";
import NavBar from "./layout/Navbar";
import Image from "next/image";

export const Hero: React.FC = () => {
  const words = ["Coding", "Coffee", "Math", "Frontend dev", "Backend dev"];
  let container = createRef<HTMLSpanElement>();
  let cursor = createRef<HTMLSpanElement>();
  useEffect(() => {
    gsap.killTweensOf({});
    gsap.registerPlugin(TextPlugin);
    gsap.to(cursor, 0.7, {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
    });

    // words
    const masterTL = gsap.timeline({ repeat: -1 });
    words.forEach((word) => {
      const animationLen = word.length * 0.2;
      let tl = gsap.timeline();
      tl.to(container, animationLen, {
        text: word,
        repeat: 1,
        yoyo: true,
        repeatDelay: 1.2,
      });
      masterTL.add(tl);
    });
  }, []);
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
                    <span className="text-blue-600">
                      <span
                        ref={(div) => {
                          // @ts-ignore
                          if (div) container = div;
                        }}
                      />
                      <span
                        ref={(span) => {
                          // @ts-ignore
                          if (span) cursor = span;
                        }}
                      >
                        _
                      </span>
                    </span>
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
                    href="/experience/tinacms"
                    className="text-blue-600 hover:underline"
                  >
                    TinaCMS
                  </Link>{" "}
                  as a{" "}
                  <Link
                    href={"/experience/tinacms"}
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
              alt="A picture of logan anderson"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </>
  );
};
