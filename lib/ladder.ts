export type CostLine = { label: string; amount: number };
export type Rung = {
  id: number;
  title: string;
  cost: number;
  costLabel: string;
  summary: string;
  whatToDo: string;
  whatYouNeed: string;
  howLong: string;
  go: string;
  stop: string;
  locked?: boolean;
  costs: CostLine[];
};
export type Ladder = {
  prediction: string;
  verdict: string;
  total: number;
  currency: string;
  rungs: Rung[];
  killCriteria: string[];
  nextStep: string;
  searchTerms: string[];
  isExample: boolean;
  detected: { drug: string | null; target: string | null; disease: string | null };
  usualPath: { title: string; detail: string };
};

const DRUGS = ["tak-418", "tranylcypromine", "tcp"];
const TARGETS = ["l sd1", "lsd1", "kdm1a", "atn1", "atrophin-1"];

function detect(text: string) {
  const t = text.toLowerCase();
  const drug = t.includes("tak-418")
    ? "TAK-418"
    : t.includes("tranylcypromine")
      ? "tranylcypromine"
      : null;
  const target = t.includes("lsd1") || t.includes("kdm1a") ? "LSD1" : t.includes("atn1") ? "ATN1" : null;
  const disease = t.includes("drpla") ? "DRPLA" : null;
  return { drug, target, disease };
}

export function buildLadder(prediction: string, isExample = false): Ladder {
  const detected = detect(prediction);
  const isDrpla = detected.disease === "DRPLA" || detected.target === "ATN1";
  const drug = detected.drug ?? "your drug";
  const target = detected.target ?? "your target";
  const disease = detected.disease ?? "your disease";

  const searchTerms = isDrpla
    ? [
        "TAK-418 ATN1 DRPLA",
        "LSD1 inhibition ATN1 Zhang 2014",
        "TAK-418 Kabuki mouse brain 2021",
        "AT-FL-65Q rotarod Ross 1999",
        "CureDRPLA ATN1 lowering iPSC",
      ]
    : [
        `${drug} ${target}`,
        `${target} ${disease} mouse model`,
        `${drug} brain exposure dose`,
        `${target} lowering ${disease} cell model`,
      ];

  const rungs: Rung[] = [
    {
      id: 1,
      title: "Check what is already known",
      cost: 0,
      costLabel: "Free",
      summary: isDrpla
        ? "Search papers and trial records for TAK-418 and ATN1."
        : "Search papers for your drug, target, and disease.",
      whatToDo: isDrpla
        ? "Read Ross 1999 (AT-FL-65Q model), Zhang et al. 2014 (LSD1 drives ATN1), and the 2021 Takeda study (TAK-418 rescues a mouse brain phenotype at the same dose). Check PubMed and ClinicalTrials.gov for any LSD1 inhibitor tested in DRPLA."
        : "Search PubMed for your drug and target together, then for your target and disease together. Note the dose, the model, and the readout in each paper.",
      whatYouNeed: "PubMed, Google Scholar, and your prediction above.",
      howLong: "30 minutes",
      go: "No paper has already tested this exact combination.",
      stop: "Someone already tested it and it failed, or it worked and you should build on it, not repeat it.",
      costs: [{ label: "Literature search", amount: 0 }],
    },
    {
      id: 2,
      title: "Look in public data",
      cost: 0,
      costLabel: "Free",
      summary: isDrpla
        ? "See if LSD1 changes ATN1 levels in existing datasets."
        : "See if your target changes your disease gene in existing datasets.",
      whatToDo: isDrpla
        ? "Check GEO and published RNA-seq for LSD1 inhibition or knockdown: does ATN1 fall? Check the Drosophila polyQ Atrophin data (Fanto et al. 2011) for the same direction of effect."
        : "Check GEO, GTEx, and any public RNA-seq for your target: does perturbing it move your disease gene in the expected direction?",
      whatYouNeed: "GEO, a spreadsheet, and the search terms below.",
      howLong: "1 to 2 hours",
      go: "Public data points the same way as your prediction.",
      stop: "Public data points the other way, or shows no link at all.",
      costs: [{ label: "Public data review", amount: 0 }],
    },
    {
      id: 3,
      title: "Run one small cell test",
      cost: 1200,
      costLabel: "About $1,200",
      summary: isDrpla
        ? "Treat cells with TAK-418 and measure ATN1."
        : "Treat cells with your drug and measure your target.",
      whatToDo: isDrpla
        ? "In cells expressing mutant ATN1, run a TAK-418 dose response plus tranylcypromine as a second LSD1 inhibitor. Measure ATN1 protein by automated western blot or immunofluorescence at 48 to 72 hours. Ask first whether the CureDRPLA Weill Cornell iPSC repository can be reused instead of building a new line."
        : "In cells expressing your disease gene, run a dose response of your drug. Measure the target protein at 48 to 72 hours. Use an existing cell line first, not a new iPSC line.",
      whatYouNeed: "An existing mutant cell line, drug, and an automated protein readout.",
      howLong: "1 week",
      go: "ATN1 falls at a safe dose, in a dose-dependent way.",
      stop: "ATN1 does not fall at safe doses. The prediction dies here, before any mouse is used.",
      costs: [
        { label: "Cells and reagents", amount: 400 },
        { label: "Assay and readout", amount: 500 },
        { label: "Labour and contingency", amount: 300 },
      ],
    },
    {
      id: 4,
      title: "Confirm the effect",
      cost: 600,
      costLabel: "About $600",
      summary: "Repeat with a second cell line and a dose range.",
      whatToDo:
        "Repeat the cell test in a second cell line, with a full dose range and a vehicle control. Preregister the dose, the readout, and the kill line before you start.",
      whatYouNeed: "A second line, the same readout, and a written preregistration.",
      howLong: "1 week",
      go: "The effect repeats, in a second line.",
      stop: "It does not repeat. Treat Rung 3 as a one-off, not a result.",
      costs: [
        { label: "Second cell line", amount: 250 },
        { label: "Dose range", amount: 200 },
        { label: "Repeat readout", amount: 150 },
      ],
    },
    {
      id: 5,
      title: "Mouse test, only if the cell test passes",
      cost: 0,
      costLabel: "Quote needed",
      summary: "TAK-418 in AT-FL-65Q mice, rotarod at 4 months. Not in the $1,800.",
      whatToDo: isDrpla
        ? "Only now ask a lab for a written quote: breeding and aging to 4 months, daily gavage for 14 days, rotarod, and 120 kDa mutant ATN1 fragments. Ask if a cohort is already aging, or if historical controls can cut the control group."
        : "Only now ask a lab for a written quote for the animal test. Ask if a cohort is already aging, or if historical controls can cut the control group.",
      whatYouNeed: "A written quote, an animal protocol, and a pass from the cell tests.",
      howLong: "4 months, plus breeding",
      go: "Cell effect repeats, and the lab confirms a cohort and a price.",
      stop: "No cell effect, no cohort, or no quote. Do not start a colony.",
      locked: true,
      costs: [{ label: "Mouse test", amount: 0 }],
    },
  ];

  const total = rungs.filter((r) => !r.locked).reduce((s, r) => s + r.cost, 0);

  return {
    prediction,
    verdict: `Testable for about $${total.toLocaleString()}.`,
    total,
    currency: "USD",
    rungs,
    killCriteria: isDrpla
      ? [
          "ATN1 does not drop at safe doses.",
          "ATN1 drops but cells look no healthier.",
          "Public data shows no link between LSD1 and ATN1.",
        ]
      : [
          `${target} does not move at safe doses.`,
          `${target} moves but cells look no healthier.`,
          "Public data shows no link between your target and your disease.",
        ],
    nextStep: "Get a quote for the cell test. That is the first money this ladder spends.",
    searchTerms,
    isExample,
    detected,
    usualPath: isDrpla
      ? {
          title: "Usual path: straight to the mouse test",
          detail:
            "TAK-418 in AT-FL-65Q-150 mice, rotarod at 4 months. Months of housing and daily dosing. Cost: quote needed.",
        }
      : {
          title: "Usual path: straight to the animal test",
          detail: "Months of housing and dosing. Cost: quote needed.",
        },
  };
}

export function ladderAsText(l: Ladder): string {
  const lines = [
    `Prediction: ${l.prediction}`,
    ``,
    `Verdict: ${l.verdict}`,
    ``,
    `What it costs: $${l.total.toLocaleString()} total. The mouse test is gated and not in this total.`,
    ...l.rungs.map(
      (r) => `Rung ${r.id}: ${r.title} (${r.costLabel}). ${r.summary} Stop if: ${r.stop}`,
    ),
    ``,
    `What would prove it wrong:`,
    ...l.killCriteria.map((k) => `- ${k}`),
    ``,
    `Do this today: ${l.nextStep}`,
    ``,
    `Search terms: ${l.searchTerms.join("; ")}`,
  ];
  return lines.join("\n");
}

export function preregistrationAsMarkdown(l: Ladder): string {
  return [
    `# Preregistration (draft)`,
    ``,
    `Prediction: ${l.prediction}`,
    ``,
    `## Test ladder`,
    ...l.rungs.map((r) => `- Rung ${r.id}: ${r.title} (${r.costLabel}) — ${r.summary}`),
    ``,
    `## Kill criteria`,
    ...l.killCriteria.map((k) => `- ${k}`),
    ``,
    `## Primary readout`,
    `Rung 3: target protein level at 48 to 72 hours, dose response, vehicle control.`,
    ``,
    `## Total cost`,
    `$${l.total.toLocaleString()} USD. Mouse test (Rung 5) is gated and quoted separately.`,
    ``,
    `Generated by Cheap-Test Converter v1. This is a draft. A lab must review it before use.`,
    ``,
  ].join("\n");
}
