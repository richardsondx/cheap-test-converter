# Contributing to TestRung

Thank you for helping make lab tests cheaper to run. This project is small on purpose, and contributions should stay small too.

## What helps most

1. **A real price.** A published core facility rate, a dated CRO quote, or a per diem rate, with a link or a date. Real prices replace estimates. See `docs/cheapest-place-brainstorm.md` for how prices are labelled (Quote, Published rate, Estimate, Placeholder).
2. **A better ladder.** A rung that is cheaper, faster, or more falsifiable than the one we show, for a real prediction.
3. **A kill criterion.** A clean, checkable way an idea could be proven wrong earlier.
4. **A bug fix or a clearer sentence.** Short sentences, plain words, no jargon without a one-clause explanation.

## How to contribute

1. Fork the repo and create a branch from `main`.
2. Run `npm install`, then `npm run build`. The build must pass.
3. Keep the UI minimal: one screen, max 640px, one accent colour, no new libraries unless the change needs one.
4. If you add a cost, say where it came from and when. No invented numbers.
5. Open a pull request with one change in it, and say what you checked.

## What we will not merge

- A new dashboard, menu, account system, or settings page.
- A price with no source and no date.
- A "cheapest country" league table. We rank providers, not nations. See `docs/cheapest-place-brainstorm.md`.
- Hype copy. No "revolutionary", no "AI-powered", no "cutting-edge".

## Code of conduct

Be kind, be precise, and be honest about what is proven and what is not. Researchers reading this repo are deciding whether to spend real money and real animals. That deserves care.
