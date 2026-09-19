import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

// Scripted replays of the three ways I tried to make Jev "talk". Each Jev call
// returns a probability for every option, and the loop takes the top one.
// The probabilities here are illustrative, not recorded from real calls.

export type JevStageName = "letters" | "words" | "categories";

interface Option {
  key: string;
  // What Jev sees for this option (a candidate reply, or a category description)
  detail: string;
  probability: number;
}

interface Step {
  label: string;
  options: Option[];
  hiddenCount: number;
  hiddenProbability: number;
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
const stopDetail = (reply: string) => `${quote(reply)} (finished)`;

// Gives every visible option a probability. `top` sets the interesting ones,
// the rest of the visible options split a small slice of what's left, and the
// hidden options get the remainder.
const buildStep = (
  label: string,
  options: { key: string; detail: string }[],
  hiddenCount: number,
  top: Record<string, number>,
  addsToken: boolean
): Step => {
  const rest = options.filter((o) => !(o.key in top));
  const remaining = 1 - Object.values(top).reduce((a, b) => a + b, 0);
  const visibleShare = hiddenCount > 0 ? remaining * 0.35 : remaining;
  const weights = rest.map((_, i) => 1 + ((i * 7) % 5) / 4);
  const totalWeight = weights.reduce((a, b) => a + b, 0) || 1;
  const withProbs = options.map((o) => ({
    ...o,
    probability:
      o.key in top
        ? top[o.key]
        : (visibleShare * weights[rest.indexOf(o)]) / totalWeight,
  }));
  const pick = Object.entries(top).sort((a, b) => b[1] - a[1])[0][0];
  return {
    label,
    options: withProbs,
    hiddenCount,
    hiddenProbability: hiddenCount > 0 ? remaining - visibleShare : 0,
    pick,
    addsToken: addsToken && pick !== "stop",
  };
};

const LETTERS = ["a", "e", "h", "i", "l", "o", "s", "y"];
const letterStep = (reply: string, top: Record<string, number>) =>
  buildStep(
    WORD_QUESTION,
    [
      ...LETTERS.map((l) => ({ key: l, detail: quote(reply + l) })),
      { key: "space", detail: quote(`${reply} `) },
      { key: "stop", detail: stopDetail(reply) },
    ],
    26 - LETTERS.length,
    top,
    true
  );

const SMALL_WORDS = ["I", "you", "hi", "hello", "am", "is", "good", "thanks", "what"];
const wordStep = (reply: string, top: Record<string, number>) =>
  buildStep(
    WORD_QUESTION,
    [
      ...SMALL_WORDS.map((w) => ({ key: w, detail: quote(join(reply, w, " ")) })),
      { key: "stop", detail: stopDetail(reply) },
    ],
    167 - SMALL_WORDS.length,
    top,
    true
  );

const CATEGORIES: Record<string, { description: string; sample: string[]; size: number }> = {
  pronouns: {
    description: "pronouns for people and things (I, you, they, someone...)",
    sample: ["I", "you", "we", "they", "it"],
    size: 43,
  },
  greetings_reactions: {
    description: "greetings, thanks, apologies and short reactions (hello, thanks, wow...)",
    sample: ["hello", "hi", "hey", "thanks", "sorry", "wow"],
    size: 40,
  },
  question_words: {
    description: "question words (what, why, how, when, where, who, which...)",
    sample: [],
    size: 14,
  },
  connectors: {
    description: "words that join ideas (and, but, so, because, if, then...)",
    sample: ["and", "or", "but", "so", "because"],
    size: 31,
  },
  positive_adjectives: {
    description: "positive describing words (good, great, happy, helpful, easy...)",
    sample: ["good", "great", "nice", "happy", "fine"],
    size: 61,
  },
  feelings: {
    description: "names for emotions and moods (happiness, fear, stress, joy...)",
    sample: [],
    size: 30,
  },
  names: {
    description: "names of people and AI models (Jev, Claude, Emma, Liam, ChatGPT...)",
    sample: [],
    size: 110,
  },
};
const TOTAL_CATEGORIES = 34;

const categoryStep = (reply: string, top: Record<string, number>) => {
  const keys = Object.keys(CATEGORIES);
  return buildStep(
    "Call 1 of 2: what kind of word comes next?",
    [
      ...keys.map((k) => ({ key: k, detail: quote(CATEGORIES[k].description) })),
      { key: "stop", detail: stopDetail(reply) },
    ],
    TOTAL_CATEGORIES - keys.length,
    top,
    false
  );
};

const wordInCategoryStep = (
  reply: string,
  category: string,
  top: Record<string, number>
) => {
  const { sample, size } = CATEGORIES[category];
  return buildStep(
    `Call 2 of 2: pick a word from ${category}`,
    sample.map((w) => ({ key: w, detail: quote(join(reply, w, " ")) })),
    size - sample.length,
    top,
    true
  );
};

const SCRIPTS: Record<JevStageName, Script> = {
  letters: {
    title: "Letters",
    userMessage: USER_MESSAGE,
    joiner: "",
    steps: [
      letterStep("", { h: 0.14, a: 0.12, i: 0.08, s: 0.06 }),
      letterStep("h", { e: 0.17, i: 0.15, a: 0.1, o: 0.08 }),
      letterStep("he", { l: 0.16, y: 0.14, space: 0.1, stop: 0.08 }),
      letterStep("hel", { l: 0.19, o: 0.11, stop: 0.1, space: 0.08 }),
      letterStep("hell", { o: 0.24, stop: 0.13, space: 0.09, a: 0.05 }),
      letterStep("hello", { stop: 0.31, space: 0.18, o: 0.06, s: 0.05 }),
    ],
    caption:
      "Six Jev calls for one word. Every candidate is one character away from the others, so the probabilities are spread thin and the top pick barely wins.",
  },
  words: {
    title: "Words",
    userMessage: USER_MESSAGE,
    joiner: " ",
    steps: [
      wordStep("", { I: 0.34, hi: 0.22, hello: 0.15, thanks: 0.08 }),
      wordStep("I", { am: 0.46, good: 0.12, stop: 0.06, is: 0.04 }),
      wordStep("I am", { good: 0.51, stop: 0.12, thanks: 0.09, you: 0.03 }),
      wordStep("I am good", { stop: 0.58, thanks: 0.09, you: 0.06, what: 0.05 }),
    ],
    caption:
      "Every candidate is a real word, so the candidates actually mean different things and Jev can be much more confident. One call per word.",
  },
  categories: {
    title: "Categories",
    userMessage: USER_MESSAGE,
    joiner: " ",
    steps: [
      categoryStep("", { greetings_reactions: 0.48, pronouns: 0.21, question_words: 0.07 }),
      wordInCategoryStep("", "greetings_reactions", { hi: 0.38, hello: 0.27, hey: 0.14 }),
      categoryStep("hi", { greetings_reactions: 0.31, pronouns: 0.24, question_words: 0.13, stop: 0.09 }),
      wordInCategoryStep("hi", "greetings_reactions", { thanks: 0.33, hello: 0.12, wow: 0.05 }),
      categoryStep("hi thanks", { positive_adjectives: 0.29, pronouns: 0.18, stop: 0.14, connectors: 0.11 }),
      wordInCategoryStep("hi thanks", "positive_adjectives", { fine: 0.36, good: 0.31, great: 0.12 }),
      categoryStep("hi thanks fine", { connectors: 0.34, stop: 0.27, pronouns: 0.1, question_words: 0.06 }),
      wordInCategoryStep("hi thanks fine", "connectors", { and: 0.57, but: 0.09, so: 0.08 }),
      categoryStep("hi thanks fine and", { pronouns: 0.52, question_words: 0.12, stop: 0.05 }),
      wordInCategoryStep("hi thanks fine and", "pronouns", { you: 0.62, I: 0.06, we: 0.04 }),
      categoryStep("hi thanks fine and you", { stop: 0.44, question_words: 0.16, pronouns: 0.1, connectors: 0.08 }),
    ],
    caption:
      "~1,700 words split into 34 categories. Jev picks a category first, then a word from it, so no single call sees more than ~110 options.",
  },
};

type Phase = "score" | "pick" | "commit" | "done";

// Timings in ms
const SCORE_HOLD = 1300;
const PICK_HOLD = 900;
const COMMIT_HOLD = 600;
const DONE_HOLD = 3200;

const formatPercent = (p: number) => {
  const pct = p * 100;
  if (pct < 1) return "<1%";
  return `${Math.round(pct)}%`;
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
  const [phase, setPhase] = useState<Phase>("score");
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const running = inView && !paused;

  const step = script.steps[Math.min(stepIdx, script.steps.length - 1)];

  useEffect(() => {
    if (!running) return;
    let delay: number;
    let next: () => void;

    if (phase === "score") {
      delay = SCORE_HOLD;
      next = () => setPhase("pick");
    } else if (phase === "pick") {
      delay = PICK_HOLD;
      next = () => setPhase("commit");
    } else if (phase === "commit") {
      delay = COMMIT_HOLD;
      next = () => {
        if (stepIdx + 1 >= script.steps.length) {
          setStepIdx(script.steps.length);
          setPhase("done");
        } else {
          setStepIdx((i) => i + 1);
          setPhase("score");
        }
      };
    } else {
      delay = DONE_HOLD;
      next = () => {
        setStepIdx(0);
        setPhase("score");
      };
    }

    const id = window.setTimeout(next, delay);
    return () => window.clearTimeout(id);
  }, [running, phase, stepIdx, script.steps.length]);

  const restart = () => {
    setStepIdx(0);
    setPhase("score");
    setPaused(false);
  };

  const committed = phase === "commit" || phase === "done";
  const tokens = buildTokens(script, committed ? Math.min(stepIdx + 1, script.steps.length) : stepIdx);
  const isDone = phase === "done";
  const showPick = phase === "pick" || phase === "commit";
  const callCount = Math.min(stepIdx + 1, script.steps.length);
  // Sorted like a bar chart, so the option the loop takes is always on top
  const sortedOptions = [...step.options].sort((a, b) => b.probability - a.probability);
  const maxProbability = sortedOptions[0].probability;
  const keyWidth = `${Math.max(...step.options.map((o) => o.key.length)) + 1}ch`;
  const focused =
    step.options.find((o) => o.key === hovered) ||
    (showPick ? step.options.find((o) => o.key === step.pick) : undefined);

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

      {/* Probabilities Jev returned for the current call */}
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
              <div className="mb-2 flex items-baseline justify-between gap-2 text-xs">
                <span className="font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {step.label}
                </span>
                <span className="shrink-0 text-gray-400 dark:text-gray-500">probability</span>
              </div>
              <div className="space-y-0.5">
                {sortedOptions.map((option, i) => {
                  const picked = showPick && option.key === step.pick;
                  const width = (option.probability / maxProbability) * 100;
                  return (
                    <div
                      key={option.key}
                      onMouseEnter={() => setHovered(option.key)}
                      onMouseLeave={() => setHovered(null)}
                      className={`flex items-center gap-2 rounded px-1.5 py-1 font-mono text-xs transition-colors ${
                        picked
                          ? "bg-blue-50 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100"
                          : hovered === option.key
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span
                        style={{ width: keyWidth }}
                        className={`max-w-[45%] shrink-0 truncate ${picked ? "font-semibold" : ""}`}
                      >
                        {option.key}
                      </span>
                      <span className="relative h-2 flex-1 rounded bg-gray-100 dark:bg-gray-800">
                        <motion.span
                          className={`absolute inset-y-0 left-0 rounded ${
                            picked ? "bg-blue-600 dark:bg-blue-500" : "bg-blue-300 dark:bg-blue-800"
                          }`}
                          initial={reduceMotion ? false : { width: "0%" }}
                          animate={{ width: `${width}%` }}
                          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.1 + i * 0.03, ease: "easeOut" }}
                        />
                      </span>
                      <span className="w-9 shrink-0 text-right tabular-nums text-gray-500 dark:text-gray-400">
                        {formatPercent(option.probability)}
                      </span>
                    </div>
                  );
                })}
              </div>
              {step.hiddenCount > 0 && (
                <div className="mt-1 px-1.5 text-xs text-gray-400 dark:text-gray-500">
                  +{step.hiddenCount} more options sharing {formatPercent(step.hiddenProbability)}
                </div>
              )}
              <div className="mt-3 min-h-[2.5rem] rounded-md bg-gray-50 px-3 py-2 font-mono text-xs text-gray-600 dark:bg-gray-800/60 dark:text-gray-300">
                {focused ? (
                  <>
                    <span className="text-gray-400 dark:text-gray-500">what Jev sees → </span>
                    <span className="font-semibold">{focused.key}</span>: {focused.detail}
                  </>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500">
                    Jev scores every option at once, then the loop takes the highest…
                  </span>
                )}
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
