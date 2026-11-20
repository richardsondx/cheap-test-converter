# TestRung — Brand Guide v1

## Name

**TestRung** — one word, two parts, eight letters.

- **Test**: what it does. It tests a prediction.
- **Rung**: the ladder. Each rung is a cheaper, smaller test. You climb down in cost, not up.

Say it out loud: "Test Rung." It reads as a noun and as an instruction: test one rung at a time.

Full product name: TestRung. The long form "Cheap-Test Converter" is the description, not the name. It stays in the README and in the RareGap context, not in the header.

Tagline (unchanged from the app hero):
> Turn one idea into the cheapest test that could prove it wrong.

One-line descriptor:
> A test ladder, a cost, and a next step, in under a minute.

## Domain

Primary: **testrung.nshipyard.com**

No new domain to buy. It is a subdomain of nshipyard.com, which Richardson already owns. When the app deploys, point the subdomain at the host. Until then it does not resolve, and the app has no live URL.

`testrung.com` was checked by RDAP on 2026-11-20 and looked unregistered, and `testrung.io` too, but neither is the plan now. Do not buy either unless the subdomain plan changes.

Buy plan (only if the subdomain plan changes):
1. Check `testrung.com` at Cloudflare Registrar or Porkbun first. Buy the .com first.
2. If the .com price is under $20 for year one, buy it for 2 years and turn on auto-renew.
3. Buy `testrung.io` only if it is also cheap. It is a backup, not a second home.
4. Point DNS to the host only after the app is deployed. Until then the domain can sit parked.
5. Set the canonical URL to `https://testrung.nshipyard.com`, with `www` redirecting to it if used.

Handles to claim when the product goes public, in this order: GitHub `richardsondx/testrung` (repo rename, optional), X `@testrung`, and the same name on the app stores if ever needed. None are claimed in v1.

## Why this name, and what was rejected

- **TestRung** — chosen. Only collision found: a small student Ruby repo called TestRung on GitHub, no product, no site, no domain. No live product uses the name.
- **Rung** — rejected. Crowded: Rung productivity app (rungdaily.com), `rung-cli` on PyPI, `rung` on npm. Bare "Rung" would be confused with all three.
- **Falsify** — rejected. It is already a real product: `falsify` on PyPI, `registry.falsify.dev`, Falsify OÜ. The science word is perfect, the name is taken.
- **RungTest** — the same idea in reverse order. TestRung reads better: test, then rung.
- **ProofRung, LadderTest, RungLab, CheapTest** — checked by RDAP, the .coms are registered. CheapTest.io looked free, but the name is generic and the .com is taken.

## Logo

Original mark, drawn in `brand/logo.svg`. No stock icon, no emoji, no clip art.

Construction: a rounded square, blue. Inside, three white horizontal bars, left-aligned, shrinking: 26, 19, 12 units wide. The bars are the rungs. They get shorter as the cost gets lower. Read it three ways and it still works: a ladder from the side, a cost bar chart going down, three steps.

- Mark: `brand/logo.svg` (blue square, white bars)
- Dark version: `brand/logo-dark.svg` (white square, blue bars, for dark backgrounds)
- Mono: `brand/logo-mono.svg` (ink square, white bars, for one-colour printing)
- Wordmark: `brand/wordmark.svg` (mark plus "Test" in ink and "Rung" in blue)
- Favicon: `brand/favicon.svg` (same as the mark, also wired as `app/icon.svg`)
- Social card: `brand/social-card.svg` (1280 by 640, white, mark, wordmark, tagline, testrung.nshipyard.com)

Rules:
- Clear space: at least one bar height on every side.
- Minimum size: 24px on screen, 16px only as a favicon.
- Do not stretch, rotate, recolour, add a shadow, or put text inside the square.
- Do not use the RareGap blue knot for TestRung. TestRung is its own product. It can say "by RareGap" in small text, it is not the RareGap logo.
- The red colour is only for "Stop if" text. Never use red in the logo.

## Colour

One accent, the same as the app.

- Ink: #111827 — text, wordmark "Test"
- Blue: #2563eb — logo, button, links, wordmark "Rung"
- Blue dark: #1d4ed8 — hover, focus
- Grey 500: #6b7280 — meta text, subline
- Grey 200: #e5e7eb — borders, dividers
- Surface: #f9fafb — locked rung background only
- Red: #dc2626 — "Stop if" text only, never fills
- White: #ffffff — background

No gradients, no second accent, no pastel wash. The app is white, the logo is blue, the text is ink. That is the brand.

## Type

Inter, or the system UI font if Inter is not loaded. No other font.

- Hero: 32/40, weight 600, letter-spacing -0.02em
- Section heads: 20/28, weight 600
- Body: 16/24, weight 400
- Meta: 14/20, weight 400, grey 500
- Wordmark: 28px, weight 600, letter-spacing -0.02em

## Voice

Plain, short, and checkable. The same rules as the app copy.

- One idea per sentence. Short sentences.
- Numbers first: "Testable for about $1,800. Start free."
- Say what would kill the idea, in plain words: "Stop if ATN1 does not drop at safe doses."
- No slogans, no hype adjectives, no jargon without a one-clause explanation.
- No em dashes, anywhere.

Do not say: "AI-powered", "revolutionary", "cutting-edge", "the future of science".
Say: what it costs, how long it takes, and what would prove it wrong.

## In the app

The app header is the wordmark: mark at 32px plus "TestRung" in text. It sits above the hero, left-aligned, quiet. The page title is "TestRung — Turn one idea into the cheapest test that could prove it wrong." The favicon is the mark.

The hero copy does not change. The brand does not add a second headline, a banner, or a menu. One screen, one action.

## Files

- `brand/logo.svg`, `logo-dark.svg`, `logo-mono.svg`
- `brand/wordmark.svg`, `brand/favicon.svg`, `brand/social-card.svg`
- `brand/logo.png`, `brand/logo-512.png`, `brand/social-card.png` — PNG renders, made from the SVGs
- `brand/BRAND.md` — this file
- `brand/brand-board.png` — the board screenshot, in `screenshots/`
