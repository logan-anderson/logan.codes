---
draft: false
title: 'Can a Classifier Chat? Turning Jev into a (Tiny) LLM'
date: 2026-09-19T04:00:00.000Z
minRead: 5
author: content/authors/logan_anderson.md
description: >-
  Jev is a classifier. You give it some state and a question with a fixed set
  of choices, and it picks one. So naturally I tried to make it hold a
  conversation. I tried one letter at a time, one word at a time, and finally a
  1,700 word vocabulary split into categories. Here's what worked, what didn't,
  and why.
tags:
  - AI
  - ML
featurePosts:
  - post: content/blog/achieving-consistent-output-from-chatgpt.md
  - post: content/blog/machine-learning.md
---

> Check out the [code on Github](https://github.com/logan-anderson/jev-as-a-llm "Github Code")

[Jev](https://typesafe.ai) (TypeSafe AI's `systemOne`) is not a text generator. You give it some **state** and a **question with a fixed set of choices**, and it picks one. It's built for things like "is this support ticket about billing, technical, or other?"

So naturally I wanted to see if it could hold a conversation.

## Attempt 1: One letter at a time ❌

This is the crazy idea. What if the choices are **the next letter**?

- Options: `a`–`z`, `space`, and `stop`
- Jev returns a probability for every option. Take the most likely letter, add it to the reply, and ask Jev again
- Loop until Jev picks `stop` (or the reply hits a 100 character cap)

Here's what a reply looks like, slowed down so you can see each Jev call:

<JevStage stage="letters" />

Even in the best case, a simple "hello" takes six calls, and every call is a choice between candidates that only differ by one character. Most of them are gibberish anyway. In practice it usually replied with just `"a"` and stopped. I was asking a classifier to _spell_, which is about the worst thing you could ask it to do.

## Attempt 2: One word at a time ✅

Next I swapped letters for a vocabulary of **~167 common conversational words**: pronouns, greetings ("hello", "thanks"), common verbs ("help", "think", "want"), question words ("what", "how"), prepositions, and a few nouns and adjectives. Plus `stop`.

Each option isn't just the word. It's described as the full reply it would produce, so Jev is comparing whole candidate replies:

```text
reply so far: "hi how"
options:  are: "hi how are"   can: "hi how can"   ...   stop: "hi how" (finished)
```

<JevStage stage="words" />

**This works much better.** My guess at why:

- **Every option is a real word**, so every candidate is at least plausible text. Jev isn't choosing between `"hela"` and `"helb"`.
- **The candidates actually differ in meaning.** "hi how are" vs "hi how banana" is a real judgment call, and making that kind of call is what a classifier is for.
- **Far fewer steps.** A 100 character reply is ~20 decisions instead of ~100, so there are fewer chances to go off the rails.

Asked "hi! how are you today?", it replied **"I am good"**. Not exactly Shakespeare, but that's a real answer from a model that was never meant to write anything.

## Attempt 3: A much bigger vocabulary, in categories 🤔

~170 words is limiting, so next I wanted **1,000–2,000 words**. The problem: putting 1,700 options, each containing the whole reply so far, into every call would bloat the request.

The fix is to split the vocabulary into **34 categories** (pronouns, names, greetings, question words, time words, people, places, food, feelings...). Each category has a short plain English description. Then each word takes **two Jev calls**:

1. **Pick a category (or stop).** Jev sees the 34 category descriptions.
2. **Pick a word from that category.** Same as the word version, but only that category's ~15–110 words are options.

Here's what the first call's options look like:

```text
greetings_reactions: "greetings, thanks, apologies and short reactions (hello, thanks, wow...)"
question_words:      "question words (what, why, how, when, where, who, which...)"
stop:                "hi how" (finished; send this as the final reply)
```

That's twice as many calls, but no single call sees more than about 110 options.

<JevStage stage="categories" />

One category is **proper nouns**: Jev itself, common first names, and AI models and companies (Claude, ChatGPT, Gemini...). They're capitalized, so replies can say things like "hi Emma" or "I am Jev".

**Results are mixed.** Sometimes it's great, like the reply above:

> "hi! how are you today?" → **"hi thanks fine and you"**

But it gets stuck repeating itself quite often:

> "can you recommend a good hobby for the weekend?" → "can do which which hiking hiking hiking hiking hiking..."

> "hi! how are you today?" → "hi you are are am fine and so and so and and and and..."

My guess: once a word is in the reply, adding it again still looks "on topic", and nothing tells Jev that repeating is bad. The category step may also make this worse. Once Jev picks "connectors", it has to add a connector, even if the best move was to stop.

## Lessons

1. **Play to the model's strengths.** Jev is good at comparing meaningful options. Anything that made the options more meaningful helped. Anything that made it "spell" hurt.
2. **Describe your options, don't just label them.** An option's description is the only thing Jev sees, so make it carry the meaning.
3. **Bigger chunks beat smaller ones.** Letters → words was the big jump.
4. **Categories keep requests small**, but they add a second decision that can go wrong, and more words didn't automatically mean better replies.

## Known limitations

- **Fixed vocabulary.** It can only say words in the list. No punctuation.
- **Repetition.** The category version often loops on one word until it hits the 100 character cap.
- **Slow.** One Jev call per word (two with categories), one after another, and nothing shows in the chat until the whole reply is done.
- **Big requests.** In the word version, every call sends ~168 options, each containing the full reply so far.
- **Fragile.** If one call fails midway, the whole reply is lost.

## Ideas to try next

- Stop repetition: leave out the previous word as an option, or stop automatically when the same word repeats
- Allow `stop` in the second step too, so picking a category doesn't force a word
- Add punctuation (`.`, `?`, `,`) as options that attach without a space
- Send the state as a plain transcript ending mid-reply (`...\nAssistant: hi how`) instead of a separate field
- Stream each word to the page as it's chosen, so you can watch it "type" (like the animations above, but for real)
- Try short phrases ("how are you", "nice to meet you") as options alongside single words
- Sample from Jev's probabilities instead of always taking the top pick, for more variety

## Conclusion

Can a classifier chat? Sort of! It will never replace an actual LLM, but it was a fun way to learn what a classifier is actually good at. The big takeaway for me is that the way you describe your options matters way more than how many options you give it.

The code is available on [Github](https://github.com/logan-anderson/jev-as-a-llm "Code on Github"). If you have ideas for what to try next, let me know in the comments below!
