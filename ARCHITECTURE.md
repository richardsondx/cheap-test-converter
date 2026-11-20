# Architecture

## Decision

Build v1 as a deterministic, client-first Next.js app. No database, no auth, no model call in the hot path. The ladder must be checkable, cheap, and fast, even with no funds and no lab.

## Honest note on Gemini 4 Neon

Neon was asked, via OpenRouter (`google/gemini-4-neon`, 2026-11-20), to plan this architecture. The call was accepted (exit 0, about 30 seconds) but the helper printed literally `None` as the assistant content. No plan came back. The fallback (`google/gemini-2.5-pro`) also returned blank.

So there is no Neon architecture plan to quote here, and none is invented. The architecture below was written by Muse Spark from the RareGap brainstorm and the Opus 5.5 UI spec. Neon is kept as the v2 generation layer, behind one interface, so the same plan can be re-run through Neon once the OpenRouter Gemini response shape is fixed.

Neon facts used, from public launch reporting: Gemini 4 Neon launched Nov 18, 2026, Google claims comparable quality to Gemini 4 Carbon at 3x speed and 60% of the cost, 1M-token context, 70.5% on Terminal-Bench Science.

## Opus 5.5 UI spec

Opus 5.5 (`anthropic/claude-opus-5.5` on OpenRouter, one call, 2026-11-20) produced the UI spec this app implements:

- One screen, top to bottom: hero, one sentence, input, one button, verdict, total cost as one big number, ladder (3 to 4 rungs, cheapest first, collapsed), kill criteria, next-step card, quiet footer.
- Copy: hero "Turn one idea into the cheapest test that could prove it wrong." Button "Build my test ladder". Verdict "Testable for about $1,800. Start free."
- Visual system: Inter or system UI, 32/40 hero, 20/28 section heads, 16/24 body, 14/20 meta, 600 headings, 400 body, 4px spacing base, sections 48px apart, rungs 12px apart, 24px card padding, max 640px centered, white background, gray-900 text, gray-500 meta, gray-200 borders, one accent (blue-600) for button and focus only, red-600 text marker for kill items, no red fills, 1px border, 12px radius, no shadows, no icons except a chevron.
- Interaction: only one filled button at a time, one rung open at a time, 150ms height animation, cost shows one large number first with a "See the breakdown" toggle, loading skeleton, focus moves to the verdict, Cmd/Ctrl+Enter submits, button disabled until 10 or more characters.
- Mobile: single column, 20px side padding, hero 26/32, button full width 48px tall, next-step card at the bottom, never sticky.
- Accessibility: full keyboard path, rungs are buttons with aria-expanded, visible 2px blue focus ring, contrast 4.5:1 or better, live region announces loading then ready, kill items labelled "Stop if" (not colour alone), prefers-reduced-motion turns off animation.

One deliberate change from the Opus spec: a locked fifth rung was added for the mouse test. Opus listed 4 rungs totalling $1,800. The mouse test is the thing the user actually wants, so hiding it would be dishonest. It is shown, locked, with "Quote needed", and explicitly not in the $1,800 total.

## Stack

- Next.js 15, App Router, TypeScript, React 19
- Tailwind is not installed in v1; the visual system is 120 lines of plain CSS in `app/globals.css`. That is intentional: the design is small enough to read, and a utility layer would hide it.
- No component library, no chart library, no database.

## Repo layout

```
app/
  layout.tsx      metadata, font stack
  page.tsx        the whole flow (Hero, PredictionInput, LadderRung, CostSummary, KillList, NextStep)
  globals.css     visual system
lib/
  ladder.ts       data model, ladder engine, cost model, export text
  generate.ts     generation interface, v2 model plug-in point
  strings.ts      all user-facing copy in one place
```

## Data model

```ts
type CostLine = { label: string; amount: number };
type Rung = {
  id: number; title: string; cost: number; costLabel: string;
  summary: string; whatToDo: string; whatYouNeed: string;
  howLong: string; go: string; stop: string;
  locked?: boolean; costs: CostLine[];
};
type Ladder = {
  prediction: string; verdict: string; total: number; currency: string;
  rungs: Rung[]; killCriteria: string[]; nextStep: string;
  searchTerms: string[]; isExample: boolean;
  detected: { drug: string | null; target: string | null; disease: string | null };
};
```

## Ladder logic, v1

Deterministic rules in `lib/ladder.ts`, not LLM magic:

1. Detect entities by keyword: TAK-418 / tranylcypromine, LSD1 / KDM1A / ATN1, DRPLA.
2. If DRPLA / ATN1 is detected, use the specific ladder: Ross 1999, Zhang 2014, Takeda 2021, Drosophila polyQ Atrophin, CureDRPLA iPSC repository, search terms for that prediction.
3. Otherwise, use the generic ladder with the user's drug / target / disease inserted.
4. Costs are fixed and summed, never invented per run: Rung 1 $0, Rung 2 $0, Rung 3 $1,200 (cells $400, assay $500, labour $300), Rung 4 $600 (second line $250, dose range $200, repeat $150). Total $1,800.
5. Rung 5 is locked, cost $0 in the total, label "Quote needed".

## Cost ledger

The ledger is the product, not a footnote. One big number first, then a two-column breakdown on tap. Every cost line has a label and an amount. No cost is hidden in a total. The mouse cost is not estimated in v1; a quote is the next step, and the UI says so.

## State

Client state only, in `app/page.tsx`: prediction, ladder, loading, error, open rung, cost breakdown open, copied feedback, live-region status. No server state in v1. Export is local: copy as text, download a preregistration draft (.md).

## v2, deliberately not built

- `generateLadder()` in `lib/generate.ts` is the single plug-in point. A Neon call goes there, returns the same `Ladder` type, and may only add evidence, never change a cost or a kill criterion without a source.
- Cloud-lab quotes (Emerald Cloud Lab, Strateos, Opentrons) behind an API route, with a cached quote per rung.
- Saved ladders, share links, and a public pass/fail record. Needs auth and a database; out of scope for v1.
- A fly / zebrafish rung as a first-class rung, not just a note in Rung 2.

## What is not built, on purpose

No dashboard, no account, no settings page, no admin, no analytics, no email. One prediction, one ladder, one next step.
