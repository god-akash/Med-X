"use client";

import { useEffect, useState } from "react";
import MedGuardLanding from "./components/MedGuardLanding";

/*
|--------------------------------------------------------------------------
| Shared autonomous scan timeline
|--------------------------------------------------------------------------
| Every animated part of the landing page reads from this one state.
| Hero → Architecture → Layers → Live Console → Risk Engine
| all move together.
*/

const STAGES = [
  {
    key: "ingest",
    label: "MODEL INGESTION",
    title: "Model artifact loaded",
    description: "Checkpoint received and validated.",
    progress: 12,
    risk: 8,
  },
  {
    key: "fingerprint",
    label: "FINGERPRINTING",
    title: "Creating cryptographic identity",
    description: "Generating SHA-256 model fingerprint.",
    progress: 25,
    risk: 19,
  },
  {
    key: "weights",
    label: "WEIGHT FORENSICS",
    title: "Inspecting model weights",
    description: "Distribution, entropy and precision analysis.",
    progress: 42,
    risk: 42,
  },
  {
    key: "structure",
    label: "STRUCTURAL ANALYSIS",
    title: "Comparing architecture",
    description: "Layer, tensor and dimensional comparison.",
    progress: 58,
    risk: 58,
  },
  {
    key: "behavior",
    label: "BEHAVIORAL ANALYSIS",
    title: "Running behavioral probes",
    description: "Testing unusual and trigger-like responses.",
    progress: 74,
    risk: 82,
  },
  {
    key: "integrity",
    label: "INTEGRITY & PROVENANCE",
    title: "Verifying lineage",
    description: "Checking identity, provenance and consistency.",
    progress: 88,
    risk: 81,
  },
  {
    key: "decision",
    label: "RISK DECISION",
    title: "Generating deployment decision",
    description: "Evidence consolidated for governance.",
    progress: 100,
    risk: 93,
  },
];

const STAGE_DURATION = 2400;

export default function Page() {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  /*
  |--------------------------------------------------------------------------
  | Main stage clock
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((current) => (current + 1) % STAGES.length);
    }, STAGE_DURATION);

    return () => clearInterval(timer);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Progress inside current stage
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let frame;
    const start = performance.now();

    setProgress(0);

    const animate = (time) => {
      const value = Math.min(
        ((time - start) / STAGE_DURATION) * 100,
        100
      );

      setProgress(value);

      if (value < 100) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [stage]);

  const currentStage = STAGES[stage];

  return (
    <MedGuardLanding
      stages={STAGES}
      stage={stage}
      progress={progress}
      risk={currentStage.risk}
    />
  );
}