import { buildLadder, type Ladder } from "./ladder";

/**
 * Generation interface, v1.
 *
 * v1 is deterministic and rules-based on purpose: the ladder, the costs,
 * and the kill criteria must be checkable without trusting a model.
 *
 * v2 plugs a model in here, behind this one function, with the same
 * return type. The intended model is Gemini 4 Neon (google/gemini-4-neon
 * on OpenRouter, 1M-token context): it reads the papers, the protocol,
 * and the quote, and proposes rung text. The deterministic ladder stays
 * as the floor, and the model may only add evidence, never change a
 * cost or a kill criterion without a source.
 *
 * Note, 2026-11-20: a Neon call was attempted via OpenRouter for the
 * architecture plan. The call was accepted but returned no content
 * (helper printed `None`), and the fallback also returned blank.
 * The architecture in ARCHITECTURE.md was therefore written by Muse
 * Spark from the Opus 5.5 UI spec and the RareGap brainstorm, not
 * invented and attributed to Neon.
 */
export type GenerateInput = { prediction: string; isExample?: boolean };

export async function generateLadder(input: GenerateInput): Promise<Ladder> {
  // Small artificial delay so the loading state is honest and readable.
  await new Promise((r) => setTimeout(r, 700));
  return buildLadder(input.prediction.trim(), input.isExample ?? false);
}
