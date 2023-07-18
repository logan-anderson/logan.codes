import { createRef, useEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";

const words = ["Coding", "Coffee", "Math", "Frontend dev", "Backend dev"];

export default () => {
  let container = createRef<HTMLSpanElement>();
  let cursor = createRef<HTMLSpanElement>();
  useEffect(() => {
    const run = async () => {
      gsap.killTweensOf({});
      gsap.registerPlugin(TextPlugin);
      gsap.to(cursor, 0.7, {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
      });

      // words
      const masterTL = gsap.timeline({ repeat: -1 });

      const tlBack = gsap.timeline();
      tlBack.to(container, words[0].length * 0.1, {
        text: "",
      });
      masterTL.add(tlBack);

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
    };
    run();
  }, []);

  return (
    <span className="text-blue-600">
      <span
        ref={(div) => {
          // @ts-ignore
          if (div) container = div;
        }}
      >
        Coding
      </span>
      <span
        ref={(span) => {
          // @ts-ignore
          if (span) cursor = span;
        }}
      >
        _
      </span>
    </span>
  );
};
