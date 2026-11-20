# Cheap-Test Converter

Turn one idea into the cheapest test that could prove it wrong.

Paste a prediction. Get a test ladder, a cost, and a next step in under a minute.

## How it works, in 30 seconds

1. Paste a prediction, or tap "Try the DRPLA example".
2. Tap "Build my test ladder".
3. Read the verdict first: one line, one total cost.
4. Open one rung at a time, cheapest first.
5. Rungs 1 and 2 are free. Rung 3 is one small cell test, about $1,200. Rung 4 confirms it, about $600. Total: about $1,800.
6. The mouse test is a locked fifth rung. It only opens if the cell test passes, and it is quoted separately. It is not in the $1,800.

## The example, pre-loaded

"LSD1 inhibition lowers mutant ATN1 and rescues DRPLA, using TAK-418 at 1 mg/kg/day in AT-FL-65Q mice, with rotarod at 4 months as the endpoint"

That is the RareGap DRPLA prediction. The Ross lab at Johns Hopkins offered advice but has no spare funds to run the mouse test, so the converter answers the real question: what can be tested without new mouse money, and what would kill the idea first?

Kill criteria for the example:
- ATN1 does not drop at safe doses.
- ATN1 drops but cells look no healthier.
- Public data shows no link between LSD1 and ATN1.

Do this today: spend 30 minutes on Rung 1. If nothing kills the idea, move to Rung 2.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build
npm start
```

## What v1 is, and is not

v1 is deterministic and rules-based on purpose. The ladder, the costs, and the kill criteria are checkable without trusting a model. The generation interface in `lib/generate.ts` is the one place a model plugs in for v2.

v1 does not call any model, does not store anything on a server, and does not quote a real lab. Costs are planning estimates, not quotes. A lab must review the preregistration draft before use.

## Files

- `app/page.tsx` — the whole flow, one screen
- `app/globals.css` — the visual system, no component library
- `lib/ladder.ts` — the ladder engine, cost model, kill criteria, export text
- `lib/generate.ts` — the generation interface, ready for Gemini 4 Neon in v2
- `lib/strings.ts` — all user-facing copy in one place
- `ARCHITECTURE.md` — the Neon architecture plan, and an honest note on what Neon did and did not return

## UI

One screen, max 640px, white, one accent colour, one filled button at a time. Full spec is in `ARCHITECTURE.md`, from Opus 5.5.
