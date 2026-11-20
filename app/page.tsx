"use client";

import { useCallback, useRef, useState } from "react";
import { Wordmark } from "@/components/Logo";
import { generateLadder } from "@/lib/generate";
import { ladderAsText, preregistrationAsMarkdown, type Ladder } from "@/lib/ladder";
import { DRPLA_EXAMPLE, STRINGS } from "@/lib/strings";

export default function Home() {
  const [prediction, setPrediction] = useState("");
  const [ladder, setLadder] = useState<Ladder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openRung, setOpenRung] = useState<number | null>(null);
  const [showCosts, setShowCosts] = useState(false);
  const [copied, setCopied] = useState("");
  const [status, setStatus] = useState("");
  const verdictRef = useRef<HTMLHeadingElement>(null);

  const build = useCallback(async (text: string, isExample: boolean) => {
    if (text.trim().length < 10) return;
    setLoading(true);
    setError("");
    setStatus("Loading");
    setLadder(null);
    setOpenRung(null);
    setShowCosts(false);
    try {
      const result = await generateLadder({ prediction: text, isExample });
      setLadder(result);
      setStatus("Test ladder ready");
      setTimeout(() => verdictRef.current?.focus(), 50);
    } catch {
      setError(STRINGS.error);
      setStatus("");
    } finally {
      setLoading(false);
    }
  }, []);

  const runExample = () => {
    setPrediction(DRPLA_EXAMPLE);
    void build(DRPLA_EXAMPLE, true);
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("Copy failed, select the text manually");
    }
  };

  const download = () => {
    if (!ladder) return;
    const blob = new Blob([preregistrationAsMarkdown(ladder)], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "preregistration-draft.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const startOver = () => {
    setLadder(null);
    setPrediction("");
    setError("");
    setStatus("");
    setOpenRung(null);
  };

  return (
    <main className="wrap">
      <header className="brand-header">
        <Wordmark />
      </header>
      <div aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {status}
      </div>

      <h1 className="hero">{STRINGS.hero}</h1>
      <p className="sub">{STRINGS.subline}</p>

      {!ladder && !loading && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void build(prediction, false);
          }}
        >
          <label className="label" htmlFor="prediction">
            {STRINGS.inputLabel}
          </label>
          <textarea
            id="prediction"
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                void build(prediction, false);
              }
            }}
            placeholder={STRINGS.placeholder}
            rows={4}
          />
          <p className="hint">
            {STRINGS.exampleHint}{" "}
            <button type="button" className="linklike" onClick={runExample}>
              {STRINGS.exampleLink}
            </button>
          </p>
          {error && <p role="alert" style={{ color: "#dc2626" }}>{error}</p>}
          <button type="submit" className="primary" disabled={prediction.trim().length < 10}>
            {STRINGS.button}
          </button>
        </form>
      )}

      {loading && (
        <section aria-label="Loading">
          <p className="meta">{STRINGS.building}</p>
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </section>
      )}

      {ladder && !loading && (
        <div className="fade">
          <section className="section" style={{ marginTop: 32 }}>
            <h2 className="verdict" ref={verdictRef} tabIndex={-1}>
              {ladder.verdict}
              {ladder.isExample && <span className="tag">Example</span>}
            </h2>
            <p className="meta">{ladder.prediction}</p>
          </section>

          <section className="section" aria-label="Test ladder">
            <h2>Your test ladder</h2>
            {ladder.rungs.map((rung) => {
              const open = openRung === rung.id;
              return (
                <div key={rung.id} className={`rung ${rung.locked ? "locked" : ""}`}>
                  <button
                    type="button"
                    className="rung-head"
                    aria-expanded={open}
                    aria-controls={`rung-${rung.id}`}
                    onClick={() => setOpenRung(open ? null : rung.id)}
                  >
                    <span className="num" aria-hidden="true">{rung.id}</span>
                    <span className="body">
                      <span className="title">{rung.title}</span>
                      <span className="summary" style={{ display: "block" }}>{rung.summary}</span>
                    </span>
                    <span className="cost">{rung.costLabel}</span>
                    <span className="chev" aria-hidden="true">{open ? "▾" : "▸"}</span>
                  </button>
                  {open && (
                    <div className="rung-detail" id={`rung-${rung.id}`}>
                      <p>{rung.whatToDo}</p>
                      <p><span className="k">What you need: </span>{rung.whatYouNeed}</p>
                      <p><span className="k">How long: </span>{rung.howLong}</p>
                      <p><span className="k">Go if: </span>{rung.go}</p>
                      <p><span className="k">Stop if: </span>{rung.stop}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          <section className="section">
            <h2>{STRINGS.costHeading}</h2>
            <p className="bigcost" aria-label={`Total cost about ${ladder.total.toLocaleString()} dollars`}>
              ${ladder.total.toLocaleString()}
            </p>
            <p className="meta">Total. Rungs 1 and 2 are free. The mouse test is gated and not in this total.</p>
            <p style={{ marginTop: 12 }}>
              <button type="button" className="linklike" onClick={() => setShowCosts(!showCosts)} aria-expanded={showCosts}>
                {showCosts ? STRINGS.breakdownHide : STRINGS.breakdownToggle}
              </button>
            </p>
            {showCosts && (
              <div>
                {ladder.rungs
                  .filter((r) => !r.locked)
                  .flatMap((r) => r.costs.map((c) => ({ rung: r.id, ...c })))
                  .map((c, i) => (
                    <div className="costline" key={i}>
                      <span>Rung {c.rung}: {c.label}</span>
                      <span>{c.amount === 0 ? "Free" : `$${c.amount.toLocaleString()}`}</span>
                    </div>
                  ))}
                <div className="costline" style={{ fontWeight: 600 }}>
                  <span>Total, Rungs 1 to 4</span>
                  <span>${ladder.total.toLocaleString()}</span>
                </div>
              </div>
            )}
          </section>

          <section className="section">
            <h2>{STRINGS.killHeading}</h2>
            <ul className="kill">
              {ladder.killCriteria.map((k) => (
                <li key={k}>
                  <span className="stop">Stop if</span>
                  {k}
                </li>
              ))}
            </ul>
          </section>

          <section className="section">
            <div className="nextcard">
              <h2 style={{ marginTop: 0 }}>{STRINGS.nextHeading}</h2>
              <p>{ladder.nextStep}</p>
              <button type="button" className="secondary" onClick={() => void copy(ladder.searchTerms.join("\n"), "Search terms copied")}>
                {STRINGS.copySearch}
              </button>
              {copied && <p className="meta" style={{ marginTop: 10 }}>{copied}</p>}
            </div>
          </section>

          <div className="footer">
            <button type="button" className="linklike" onClick={() => void copy(ladderAsText(ladder), "Copied as text")}>
              {STRINGS.copyText}
            </button>
            <button type="button" className="linklike" onClick={download}>
              {STRINGS.download}
            </button>
            <button type="button" className="linklike" onClick={startOver}>
              {STRINGS.startOver}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
