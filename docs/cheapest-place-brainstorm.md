# Where is this rung cheapest? — Opus 5.5 brainstorm

Date: 2026-11-20. Model: `anthropic/claude-opus-5.5` via OpenRouter, max-tokens 4000, one call, returned in full. This file is the model's answer, lightly edited for formatting only. Numbers in section 6 are the model's estimates and placeholders, not quotes. Do not quote them as facts.

## 1. Real cost drivers, per rung

| Driver | Varies by country? | Notes |
|---|---|---|
| Labour (tech time) | Yes, strongly | The biggest lever for cell work. Wages differ 3 to 10x. |
| Animal housing per diem | Yes | Cage-day rates differ by institution and country. This dominates the mouse rung. |
| Reagents, antibodies, cell lines | Barely | Global vendors and global prices. Often higher outside the US because of import margins. |
| Shipping and customs | Yes | Cell lines on dry ice, customs holds, and MTAs add cost and weeks. |
| Regulatory and ethics | Yes, in time more than money | US IACUC, EU project authorisation, UK Home Office licence. Timelines differ by months. |
| Language and reporting | Somewhat | Risk of unusable reports. Real, but not priceable. |
| Time to start | Yes | Queue length, contracting, MTA. Often worth more than the price gap. |

Rungs 1 and 2 are free everywhere, so no comparison is needed. Rung 3 (cell test) is mostly labour plus reagents, so the gap is modest. Rung 4 is the same. Rung 5 (mouse) is mostly per diem, colony transfer and licensing. That is where place matters most and where data is thinnest.

Key point: cost varies more between providers than between countries. Rank providers, not nations.

## 2. Data sources, honestly

Usable on day one:
- University core facility price lists. Many cores publish internal and external rates for services like western blot, qPCR and cell culture. Cage per diem rates are often public too. They are scattered and must be curated by hand.
- PPP and wage data. OECD and World Bank PPP factors, plus national statistics. Good for estimates only.
- Your own US baseline. The $1,200 the app already shows.

Usable, but quote-only:
- CROs and marketplaces. Science Exchange and Scientist.com route requests to providers. Large CROs (WuXi, Pharmaron, Syngene, Charles River) do not publish price lists. You get a quote per request.
- Cloud labs. Emerald Cloud Lab runs on a subscription. It is not a per-assay list price you can scrape.

Not usable as a price source:
- Numbeo itself. It measures consumer cost of living. It is a rough proxy at best, and its API is licensed. Use it for the pattern, not the data.

When no price list exists: show a PPP-scaled estimate, labelled as such, plus a "Get a real quote" action. Every quote a user gets, with consent, becomes a dated data point.

## 3. Ranking method

- Quality gate first, then price. A provider only appears if it can run the exact readout (ATN1 protein level in the specified cells). It must also return raw data and accept your cell line or MTA. No gate, no row.
- Sort by landed cost. Landed cost = price + shipping and customs + one expected repeat x provider failure risk. Use a flat 20% repeat assumption until real data exists, and say so.
- Show time to result as its own column. Do not convert it into dollars. Researchers weigh time differently.
- Show at most 3 rows, with the US baseline always pinned. Never show a ranked list of 40 countries.
- Confidence label on every price:
  - Quote. Provider-specific, dated, expires after 90 days.
  - Published rate. From a public price list, with a link.
  - Estimate. Derived from PPP and wage data.
  - Placeholder. No basis yet.

## 4. UX inside the one-screen app

Each paid rung gets one quiet link on the right: "Cheaper elsewhere?"

Tapping it expands inline, under that rung only. Top to bottom:

> Rung 3, Cell test, where to run it
> Landed cost includes shipping and one likely repeat.

| | Place | Landed | Result in | Basis |
|---|---|---|---|---|
| ● | US (baseline) | $1,200 | 3 wk | Estimate |
| ● | Spain, univ. core | $780 | 5 wk | Estimate |
| ○ | China, CRO | ? | 4 to 6 wk | Quote needed |

> Reagents cost about the same everywhere. Savings come from labour.
> [Request quotes from these 3]

Collapsed by default:
- "Why this price" per row: the breakdown, the source link and the date.
- "Show more places."
- The method note.

Rung 5 (locked): the link reads "Where can this run? (quote only)". It lists places that can house or import AT-FL-65Q, if any can, with ethics lead time and no prices.

Ladder total line: "Total $1,800, from ~$1,380 elsewhere (estimate)". This only appears if at least one non-placeholder row exists.

Tone: calm, no flags, no "Save 35%!" badges. One accent colour for the confidence dot only.

## 5. What not to build in v1

- No global map, country league table or "cheapest country" score.
- No live CRO price scraping. It does not exist to scrape.
- No mouse rung prices.
- No currency fluctuation tracking beyond a monthly rate.
- No provider reviews.

The v1 slice a researcher would trust:
- Rung 3 and Rung 4 only.
- 3 to 5 hand-curated providers with published rates or real quotes.
- PPP estimates clearly labelled.
- A quote request button that actually works, even if it is just a routed email.

## 6. Example rows: DRPLA cell test (Rung 3)

1. US, academic core or CRO: $1,200. Estimate (the app's baseline). Reason: US tech time plus vendor reagents. Confidence: Estimate, not a quote.
2. Spain or Portugal, university core external rate: ~$780 landed. Estimate, from PPP-scaled labour, near-equal reagents, +$80 dry-ice shipping and the repeat allowance. Reason: lower tech wages, same antibodies. Confidence: Estimate until a real core price list is linked.
3. China, contract CRO: no number shown. Placeholder. Reason: large CROs quote per project, minimums may exceed a $1,200 job, and cell line export or MTA adds weeks. Confidence: Quote needed. Do not show a guessed figure.

## Recommended v1 design

Add one inline link, "Cheaper elsewhere?", to Rungs 3 and 4 only. Tapping it expands a three-row table under that rung: the US baseline pinned, plus up to two providers. These must pass a quality gate for the exact readout. Rows are sorted by landed cost, which is price plus shipping plus one expected repeat. Time to result sits in its own column. Every price carries a visible label: Quote, Published rate, Estimate or Placeholder. Rows without a basis show "Quote needed" instead of a number. Breakdowns and sources stay collapsed. The only action is "Request quotes from these 3." Each returned quote becomes dated, real data that gradually replaces the estimates.
