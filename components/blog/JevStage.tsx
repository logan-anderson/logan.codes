import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

// Scripted replays of the three ways I tried to make Jev "talk". The picks
// are real outputs from testing, the animation just slows each call down.

export type JevStageName = "letters" | "words" | "categories";

interface Option {
  key: string;
  // What Jev sees for this option (a candidate reply, or a category description)
  detail: string;
}

interface Step {
  label: string;
  options: Option[];
  hiddenCount: number;
  pick: string;
  // Category picks don't add anything to the reply
  addsToken: boolean;
}

interface Script {
  title: string;
  userMessage: string;
  // Letters are glued together, words get a space between them
  joiner: "" | " ";
  steps: Step[];
  caption: string;
}

const USER_MESSAGE = "hi! how are you today?";
const WORD_QUESTION = "Which candidate is the best reply so far?";

const quote = (s: string) => JSON.stringify(s);
const join = (reply: string, token: string, joiner: string) =>
  reply ? `${reply}${joiner}${token}` : token;
const stopOption = (reply: string): Option => ({
  key: "stop",
  detail: `${quote(reply)} (finished)`,
});

const letterStep = (reply: string, pick: string): Step => {
  const letters = ["a", "b", "e", "h", "i", "l", "o", "q", "s", "y"];
  return {
    label: WORD_QUESTION,
    options: [
      ...letters.map((l) => ({ key: l, detail: quote(reply + l) })),
      { key: "space", detail: quote(`${reply} `) },
      stopOption(reply),
    ],
    hiddenCount: 26 - letters.length,
    pick,
    addsToken: pick !== "stop",
  };
};

const SMALL_WORDS = ["I", "you", "hi", "hello", "am", "is", "good", "thanks", "what", "the"];
const wordStep = (reply: string, pick: string): Step => ({
  label: WORD_QUESTION,
  options: [
    ...SMALL_WORDS.map((w) => ({ key: w, detail: quote(join(reply, w, " ")) })),
    stopOption(reply),
  ],
  hiddenCount: 167 - SMALL_WORDS.length,
  pick,
  addsToken: pick !== "stop",
});

const CATEGORIES: Record<string, { description: string; sample: string[]; size: number }> = {
  pronouns: {
    description: "pronouns for people and things (I, you, they, someone...)",
    sample: ["I", "me", "you", "we", "they", "it", "someone"],
    size: 43,
  },
  greetings_reactions: {
    description: "greetings, thanks, apologies and short reactions (hello, thanks, wow...)",
    sample: ["hello", "hi", "hey", "thanks", "sorry", "yes", "wow"],
    size: 40,
  },
  question_words: {
    description: "question words (what, why, how, when, where, who, which...)",
    sample: ["what", "why", "how"],
    size: 14,
  },
  connectors: {
    description: "words that join ideas (and, but, so, because, if, then...)",
    sample: ["and", "or", "but", "so", "because", "if", "then"],
    size: 31,
  },
  positive_adjectives: {
    description: "positive describing words (good, great, happy, helpful, easy...)",
    sample: ["good", "great", "nice", "happy", "fine", "perfect", "calm"],
    size: 61,
  },
  feelings: {
    description: "names for emotions and moods (happiness, fear, stress, joy...)",
    sample: [],
    size: 0,
  },
  food_daily_life: {
    description: "food, drink and daily routine (breakfast, coffee, eat, sleep, cook...)",
    sample: [],
    size: 0,
  },
  names: {
    description: "names of people and AI models (Jev, Claude, Emma, Liam, ChatGPT...)",
    sample: [],
    size: 0,
  },
};
const TOTAL_CATEGORIES = 34;

const categoryStep = (reply: string, pick: string): Step => {
  const keys = Object.keys(CATEGORIES);
  return {
    label: "Call 1 of 2: what kind of word comes next?",
    options: [
      ...keys.map((k) => ({ key: k, detail: quote(CATEGORIES[k].description) })),
      stopOption(reply),
    ],
    hiddenCount: TOTAL_CATEGORIES - keys.length,
    pick,
    addsToken: false,
  };
};

const wordInCategoryStep = (reply: string, category: string, pick: string): Step => {
  const { sample, size } = CATEGORIES[category];
  return {
    label: `Call 2 of 2: pick a word from ${category}`,
    options: sample.map((w) => ({ key: w, detail: quote(join(reply, w, " ")) })),
    hiddenCount: size - sample.length,
    pick,
    addsToken: true,
  };
};

const SCRIPTS: Record<JevStageName, Script> = {
  letters: {
    title: "Letters",
    userMessage: USER_MESSAGE,
    joiner: "",
    steps: [
      letterStep("", "h"),
      letterStep("h", "e"),
      letterStep("he", "l"),
      letterStep("hel", "l"),
      letterStep("hell", "o"),
      letterStep("hello", "stop"),
    ],
    caption:
      "Six Jev calls for one word, and every candidate is one character away from the others. Most of them are gibberish.",
  },
  words: {
    title: "Words",
    userMessage: USER_MESSAGE,
    joiner: " ",
    steps: [
      wordStep("", "I"),
      wordStep("I", "am"),
      wordStep("I am", "good"),
      wordStep("I am good", "stop"),
    ],
    caption:
      "Every candidate is a real word, so Jev is comparing replies that actually mean different things. One call per word.",
  },
  categories: {
    title: "Categories",
    userMessage: USER_MESSAGE,
    joiner: " ",
    steps: [
      categoryStep("", "greetings_reactions"),
      wordInCategoryStep("", "greetings_reactions", "hi"),
      categoryStep("hi", "greetings_reactions"),
      wordInCategoryStep("hi", "greetings_reactions", "thanks"),
      categoryStep("hi thanks", "positive_adjectives"),
      wordInCategoryStep("hi thanks", "positive_adjectives", "fine"),
      categoryStep("hi thanks fine", "connectors"),
      wordInCategoryStep("hi thanks fine", "connectors", "and"),
      categoryStep("hi thanks fine and", "pronouns"),
      wordInCategoryStep("hi thanks fine and", "pronouns", "you"),
      categoryStep("hi thanks fine and you", "stop"),
    ],
    caption:
      "~1,700 words split into 34 categories. Jev picks a category first, then a word from it, so no single call sees more than ~110 options.",
  },
};

type Phase = "scan" | "pick" | "commit" | "done";

// Timings in ms
const SCAN_TICK = 140;
const SCAN_TICKS = 9;
const PICK_HOLD = 700;
const COMMIT_HOLD = 600;
const DONE_HOLD = 3200;

// A deterministic "wandering" highlight that ends on the picked option
const scanPath = (count: number, pickIdx: number, seed: number) => {
  const path: number[] = [];
  let n = seed * 7 + 3;
  for (let i = 0; i < SCAN_TICKS - 1; i++) {
    n = (n * 31 + 17) % 97;
    path.push(n % count);
  }
  path.push(pickIdx);
  return path;
};

// Tokens that were added by each step, so the newest one can be animated in
const buildTokens = (script: Script, upTo: number) => {
  const tokens: string[] = [];
  for (let i = 0; i < upTo; i++) {
    const step = script.steps[i];
    if (step.addsToken) {
      tokens.push(step.pick === "space" ? " " : step.pick);
    }
  }
  return tokens;
};

export const JevStage: React.FC<{ stage?: JevStageName }> = ({ stage = "words" }) => {
  const script = SCRIPTS[stage] || SCRIPTS.words;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("scan");
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const running = inView && !paused;

  const step = script.steps[Math.min(stepIdx, script.steps.length - 1)];
  const pickIdx = step.options.findIndex((o) => o.key === step.pick);
  const path = useMemo(
    () => scanPath(step.options.length, pickIdx, stepIdx),
    [step, pickIdx, stepIdx]
  );

  useEffect(() => {
    if (!running) return;
    let delay: number;
    let next: () => void;

    if (phase === "scan") {
      if (reduceMotion || tick >= path.length - 1) {
        delay = reduceMotion ? 900 : SCAN_TICK;
        next = () => setPhase("pick");
      } else {
        delay = SCAN_TICK;
        next = () => setTick((t) => t + 1);
      }
    } else if (phase === "pick") {
      delay = PICK_HOLD;
      next = () => setPhase("commit");
    } else if (phase === "commit") {
      delay = COMMIT_HOLD;
      next = () => {
        setTick(0);
        if (stepIdx + 1 >= script.steps.length) {
          setStepIdx(script.steps.length);
          setPhase("done");
        } else {
          setStepIdx((i) => i + 1);
          setPhase("scan");
        }
      };
    } else {
      delay = DONE_HOLD;
      next = () => {
        setStepIdx(0);
        setTick(0);
        setPhase("scan");
      };
    }

    const id = window.setTimeout(next, delay);
    return () => window.clearTimeout(id);
  }, [running, phase, tick, stepIdx, path, reduceMotion, script.steps.length]);

  const restart = () => {
    setStepIdx(0);
    setTick(0);
    setPhase("scan");
    setPaused(false);
  };

  const committed = phase === "commit" || phase === "done";
  const tokens = buildTokens(script, committed ? Math.min(stepIdx + 1, script.steps.length) : stepIdx);
  const isDone = phase === "done";
  const highlighted = phase === "scan" ? path[Math.min(tick, path.length - 1)] : pickIdx;
  const callCount = Math.min(stepIdx + 1, script.steps.length);

  return (
    <div
      ref={ref}
      className="not-prose my-10 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          <span className="inline-flex h-2 w-2 rounded-full bg-blue-500" />
          {script.title}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="tabular-nums">
            Jev calls: <span className="font-semibold text-gray-900 dark:text-gray-100">{callCount}</span>
          </span>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="rounded border border-gray-200 px-2 py-0.5 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button
            type="button"
            onClick={restart}
            className="rounded border border-gray-200 px-2 py-0.5 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Replay
          </button>
        </div>
      </div>

      {/* Chat */}
      <div className="space-y-2 px-4 pt-4">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-blue-600 px-3 py-1.5 text-sm text-white">
            {script.userMessage}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            layout
            className={`min-h-[2rem] max-w-[80%] rounded-2xl rounded-bl-sm px-3 py-1.5 font-mono text-sm transition-colors ${
              isDone
                ? "bg-green-50 text-green-900 ring-1 ring-green-300 dark:bg-green-900/30 dark:text-green-100 dark:ring-green-700"
                : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
            }`}
          >
            {tokens.map((token, i) => (
              <React.Fragment key={`${i}-${token}`}>
                {i > 0 && script.joiner}
                <motion.span
                  initial={reduceMotion ? false : { opacity: 0, y: 8, backgroundColor: "rgba(59,130,246,0.35)" }}
                  animate={{ opacity: 1, y: 0, backgroundColor: "rgba(59,130,246,0)" }}
                  transition={{ duration: 0.5 }}
                  className="whitespace-pre rounded"
                >
                  {token}
                </motion.span>
              </React.Fragment>
            ))}
            {!isDone && (
              <motion.span
                aria-hidden
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-gray-500"
              />
            )}
          </motion.div>
          <AnimatePresence>
            {isDone && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-medium text-green-700 dark:text-green-400"
              >
                sent ✓
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Options for the current Jev call */}
      <div className="px-4 pb-4 pt-5">
        <AnimatePresence mode="wait" initial={false}>
          {isDone ? (
            <motion.p
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              Jev picked <code className="font-mono">stop</code> after {script.steps.length} calls.
            </motion.p>
          ) : (
            <motion.div
              key={stepIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {step.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {step.options.map((option, i) => {
                  const active = i === highlighted;
                  const picked = active && phase !== "scan";
                  return (
                    <motion.div
                      key={option.key}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: picked ? 1.08 : 1 }}
                      transition={{ delay: reduceMotion ? 0 : i * 0.015, duration: 0.2 }}
                      className={`rounded-md border px-2 py-1 font-mono text-xs transition-colors duration-100 ${
                        picked
                          ? "border-blue-600 bg-blue-600 text-white"
                          : active
                          ? "border-blue-400 bg-blue-50 text-blue-900 dark:border-blue-500 dark:bg-blue-900/40 dark:text-blue-100"
                          : "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {option.key}
                    </motion.div>
                  );
                })}
                {step.hiddenCount > 0 && (
                  <div className="px-1 py-1 text-xs text-gray-400 dark:text-gray-500">
                    +{step.hiddenCount} more
                  </div>
                )}
              </div>
              <div className="mt-3 min-h-[2.5rem] rounded-md bg-gray-50 px-3 py-2 font-mono text-xs text-gray-600 dark:bg-gray-800/60 dark:text-gray-300">
                <span className="text-gray-400 dark:text-gray-500">what Jev sees → </span>
                <span className="font-semibold">{step.options[highlighted]?.key}</span>:{" "}
                {step.options[highlighted]?.detail}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="border-t border-gray-200 px-4 py-3 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        {script.caption}
      </p>
    </div>
  );
};

export default JevStage;
