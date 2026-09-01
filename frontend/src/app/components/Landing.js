"use client";


import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Ban,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Cpu,
  Database,
  Eye,
  FileCheck,
  Fingerprint,
  Gauge,
  GitCompare,
  KeyRound,
  Layers,
  Lock,
  Network,
  Radar,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Fingerprint,
    title: "Version fingerprinting",
    description:
      "Create a cryptographic identity for every checkpoint and model version.",
    category: "IDENTITY",
  },
  {
    icon: Layers,
    title: "Weight forensics",
    description:
      "Inspect distributions, entropy, precision, sparsity and unusual weight clusters.",
    category: "FORENSICS",
  },
  {
    icon: ScanSearch,
    title: "Weight distribution",
    description:
      "Surface statistical anomalies across tensors and model parameters.",
    category: "FORENSICS",
  },
  {
    icon: GitCompare,
    title: "Layer-wise diffing",
    description:
      "Compare approved and candidate model versions at structural level.",
    category: "STRUCTURE",
  },
  {
    icon: Activity,
    title: "Behavioral analysis",
    description:
      "Probe model behavior and detect suspicious response patterns.",
    category: "BEHAVIOR",
  },
  {
    icon: Eye,
    title: "Output analysis",
    description:
      "Inspect outputs for leakage, memorization and unexpected behavior.",
    category: "OUTPUT",
  },
  {
    icon: Network,
    title: "Provenance chain",
    description:
      "Trace model lineage from training through review and deployment.",
    category: "TRUST",
  },
  {
    icon: Radar,
    title: "Drift detection",
    description:
      "Track behavioral and distribution changes between releases.",
    category: "MONITOR",
  },
  {
    icon: ShieldAlert,
    title: "Integrity checks",
    description:
      "Verify model identity, consistency and artifact integrity.",
    category: "TRUST",
  },
  {
    icon: Ban,
    title: "Output leakage",
    description:
      "Surface potential memorization and sensitive-output signals.",
    category: "LEAKAGE",
  },
  {
    icon: KeyRound,
    title: "License compliance",
    description:
      "Keep model components and dependencies visible for governance.",
    category: "GOVERNANCE",
  },
  {
    icon: Workflow,
    title: "Deployment policy",
    description:
      "Connect security evidence to approval and deployment controls.",
    category: "CONTROL",
  },
];

const SECURITY_LAYERS = [
  {
    no: "01",
    title: "Model ingestion",
    label: "INPUT LAYER",
    description:
      "Accept model checkpoints, weights, metadata and registry artifacts.",
    icon: Database,
    tone: "teal",
  },
  {
    no: "02",
    title: "Artifact validation",
    label: "VALIDATION",
    description:
      "Validate format, completeness, metadata and artifact consistency.",
    icon: FileCheck,
    tone: "teal",
  },
  {
    no: "03",
    title: "Cryptographic fingerprint",
    label: "IDENTITY",
    description:
      "Generate a stable cryptographic identity for every model version.",
    icon: Fingerprint,
    tone: "teal",
  },
  {
    no: "04",
    title: "Weight forensics",
    label: "FORENSICS",
    description:
      "Inspect entropy, precision, sparsity, distributions and clusters.",
    icon: Layers,
    tone: "amber",
  },
  {
    no: "05",
    title: "Structural analysis",
    label: "ARCHITECTURE",
    description:
      "Compare layers, tensors, dimensions and structural changes.",
    icon: GitCompare,
    tone: "amber",
  },
  {
    no: "06",
    title: "Behavioral analysis",
    label: "BEHAVIOR",
    description:
      "Probe model outputs for unusual and trigger-like responses.",
    icon: Activity,
    tone: "coral",
  },
  {
    no: "07",
    title: "Threat signals",
    label: "THREAT",
    description:
      "Surface suspicious activation and behavioral signals for review.",
    icon: Radar,
    tone: "coral",
  },
  {
    no: "08",
    title: "Integrity & provenance",
    label: "TRUST",
    description:
      "Connect fingerprints, lineage, versions and evidence.",
    icon: ShieldCheck,
    tone: "teal",
  },
  {
    no: "09",
    title: "Risk engine",
    label: "SCORING",
    description:
      "Aggregate technical evidence into an explainable risk assessment.",
    icon: Gauge,
    tone: "coral",
  },
  {
    no: "10",
    title: "Governance",
    label: "CONTROL",
    description:
      "Route results to approval, quarantine, remediation or human review.",
    icon: Lock,
    tone: "teal",
  },
];

const RISK_SIGNALS = [
  ["Weight anomaly", 91],
  ["Behavioral signal", 84],
  ["Structural deviation", 76],
  ["Integrity signal", 63],
];

const NODES = [
  [48, 84],
  [105, 58],
  [166, 80],
  [244, 55],
  [286, 102],
  [260, 165],
  [225, 225],
  [168, 248],
  [92, 226],
  [45, 170],
  [125, 140],
  [190, 145],
  [165, 110],
  [145, 188],
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 0],
  [1, 12],
  [2, 12],
  [12, 10],
  [12, 11],
  [10, 11],
  [10, 13],
  [11, 13],
  [5, 11],
  [13, 8],
];

const TONE = {
  teal: {
    bg: "#eaf8f4",
    text: "#0d7668",
  },
  amber: {
    bg: "#fff7e5",
    text: "#a8711d",
  },
  coral: {
    bg: "#fff0ed",
    text: "#c85a4c",
  },
};

function SectionTag({ icon: Icon = Sparkles, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe4df] bg-white px-4 py-2 text-[9px] font-bold tracking-[.24em] text-[#0b7e6f] shadow-sm">
      <Icon size={12} />
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay + 120);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0)"
          : "translateY(22px)",
        transition:
          "opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1)",
      }}
    >
      {children}
    </div>
  );
}

function NeuralScanner({
  stage,
  progress,
  risk,
  stages,
}) {
  return (
    <div className="relative h-[690px] w-full">

      {/* =====================================================
          AMBIENT LIGHT
      ===================================================== */}

      <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7bd8c9]/20 blur-[120px]" />

      {/* =====================================================
          ORBIT SYSTEM
      ===================================================== */}

      <div
        className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8bcfc4]/20"
        style={{
          animation:
            "mg-spin 30s linear infinite",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8bcfc4]/30"
        style={{
          animation:
            "mg-spin-reverse 22s linear infinite",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8bcfc4]/20"
        style={{
          transform:
            "translate(-50%, -50%) rotateX(70deg)",
          animation:
            "mg-spin 18s linear infinite",
        }}
      />

      {/* satellites */}

      <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#0d8b79] shadow-[0_0_18px_#0d8b79]" />
      </div>

      <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute bottom-0 right-[18%] h-2.5 w-2.5 rounded-full bg-[#db7467] shadow-[0_0_18px_#db7467]" />
      </div>


      {/* =====================================================
          STATUS
      ===================================================== */}

      <div className="absolute left-1/2 top-0 z-40 -translate-x-1/2 rounded-full border border-[#cfe4df] bg-white px-4 py-2 text-[9px] font-bold tracking-[.22em] text-[#0b7e6f] shadow-lg">

        {stages[stage].label}

      </div>


      {/* =====================================================
          MAIN MODEL
      ===================================================== */}

      <div
        className="absolute left-1/2 top-[44%] z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate(-50%, -50%) perspective(1100px) rotateX(10deg) rotateY(${stage * 9}deg)`,
          transition:
            "transform 1.2s cubic-bezier(.2,.8,.2,1)",
        }}
      >

        <div className="absolute -inset-14 rounded-full bg-[#70d8c8]/20 blur-[75px]" />


        <div
          className="relative h-full w-full overflow-hidden rounded-full border-[9px] border-white shadow-[0_40px_120px_rgba(26,88,76,.22)]"
          style={{
            background:
              "radial-gradient(circle at 28% 22%, #ffffff 0%, #e6faf6 17%, #a7e1d7 37%, #59b0a2 63%, #24776d 100%)",
          }}
        >

          {/* internal grid */}

          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
              backgroundSize: "25px 25px",
            }}
          />


          {/* neural network */}

          <div
            className="absolute inset-0"
            style={{
              animation:
                "mg-network-spin 17s linear infinite",
            }}
          >

            <svg
              viewBox="0 0 330 280"
              className="h-full w-full"
            >

              {EDGES.map(([a, b], index) => (
                <line
                  key={`line-${index}`}
                  x1={NODES[a][0]}
                  y1={NODES[a][1]}
                  x2={NODES[b][0]}
                  y2={NODES[b][1]}
                  stroke="white"
                  strokeWidth="1.5"
                  opacity=".65"
                />
              ))}


              {NODES.map(([x, y], index) => (
                <circle
                  key={`node-${index}`}
                  cx={x}
                  cy={y}
                  r={index === 12 ? 7 : 4}
                  fill="white"
                >
                  <animate
                    attributeName="opacity"
                    values=".25;1;.25"
                    dur={`${1.6 + (index % 5) * .25}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

            </svg>

          </div>


          {/* scan beam */}

          <div
            className="absolute left-0 right-0 h-[3px] bg-white shadow-[0_0_28px_white]"
            style={{
              animation:
                "mg-scan 4s ease-in-out infinite",
            }}
          />


          {/* AI core */}

          <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/15 backdrop-blur-md">

            <BrainCircuit
              size={32}
              className="text-white"
            />

          </div>

        </div>

      </div>


      {/* =====================================================
          FLOATING SIGNAL
      ===================================================== */}

      <div
        className="absolute left-[1%] top-[24%] z-30 rounded-2xl border border-[#dce9e5] bg-white p-4 shadow-xl"
        style={{
          animation:
            "mg-float 4.5s ease-in-out infinite",
        }}
      >

        <div className="flex items-center gap-3">

          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#edf8f5] text-[#0d7668]">
            <Database size={16} />
          </div>

          <div>

            <div className="text-[9px] font-bold tracking-widest text-[#0d7668]">
              MODEL DETECTED
            </div>

            <div className="mt-1 text-xs font-bold text-[#17352f]">
              MedicalVision-7B
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          ANOMALY
      ===================================================== */}

      <div
        className={`absolute right-0 top-[27%] z-40 rounded-2xl border border-[#f0d3cd] bg-white p-4 shadow-xl transition-all duration-700 ${
          stage >= 2
            ? "translate-x-0 opacity-100"
            : "translate-x-7 opacity-0"
        }`}
      >

        <div className="flex items-center gap-3">

          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff0ed]">

            <AlertTriangle
              size={15}
              className="text-[#c85a4c]"
            />

          </div>

          <div>

            <div className="text-[9px] font-bold tracking-widest text-[#bc5548]">
              ANOMALY DETECTED
            </div>

            <div className="mt-1 text-[8px] text-[#8a9994]">
              suspicious weight cluster
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          METRIC CARDS
      ===================================================== */}

      <div
        className="absolute bottom-[28%] left-[3%] z-30 rounded-xl border border-[#dce9e5] bg-white px-4 py-3 shadow-lg"
        style={{
          animation:
            "mg-float 5s ease-in-out infinite",
          animationDelay: ".8s",
        }}
      >

        <div className="text-[8px] tracking-widest text-[#82938e]">
          WEIGHT ENTROPY
        </div>

        <div className="mt-1 flex items-center gap-2">

          <span className="text-sm font-bold text-[#17352f]">
            0.842
          </span>

          <span className="rounded-full bg-[#e8f7f3] px-2 py-1 text-[7px] font-bold text-[#0d8171]">
            ANALYZED
          </span>

        </div>

      </div>


      <div
        className="absolute bottom-[27%] right-[2%] z-30 rounded-xl border border-[#dce9e5] bg-white px-4 py-3 shadow-lg"
        style={{
          animation:
            "mg-float 5.5s ease-in-out infinite",
          animationDelay: "1.3s",
        }}
      >

        <div className="text-[8px] tracking-widest text-[#82938e]">
          RISK SIGNAL
        </div>

        <div className="mt-1 flex items-center gap-2">

          <span className="text-sm font-bold text-[#c85a4c]">
            {risk}
          </span>

          <span className="text-[8px] text-[#899893]">
            /100
          </span>

        </div>

      </div>


      {/* =====================================================
          BOTTOM CONSOLE
      ===================================================== */}

      <div className="absolute bottom-0 left-1/2 z-50 w-[420px] -translate-x-1/2 rounded-2xl border border-[#d7e7e2] bg-white/95 p-5 shadow-[0_30px_80px_rgba(39,88,76,.15)] backdrop-blur-xl">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e8f7f3] text-[#0d7668]">
              <Cpu size={18} />
            </div>

            <div>

              <div className="text-xs font-bold text-[#17352f]">
                {stages[stage].title}
              </div>

              <div className="mt-1 text-[9px] text-[#84958f]">
                {stages[stage].description}
              </div>

            </div>

          </div>


          <div className="text-right">

            <div className="text-[10px] font-bold text-[#0d8171]">
              {Math.round(progress)}%
            </div>

            <div className="text-[7px] tracking-widest text-[#9aa9a5]">
              COMPLETE
            </div>

          </div>

        </div>


        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e8efec]">

          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0d7668] to-[#62d7c4] transition-all duration-150"
            style={{
              width: `${Math.max(progress, 4)}%`,
            }}
          />

        </div>


        <div className="mt-4 grid grid-cols-4 text-center text-[8px] text-[#93a29e]">

          <span
            className={
              stage >= 1
                ? "font-bold text-[#0d8171]"
                : ""
            }
          >
            Fingerprint
          </span>

          <span
            className={
              stage >= 2
                ? "font-bold text-[#0d8171]"
                : ""
            }
          >
            Weights
          </span>

          <span
            className={
              stage >= 4
                ? "font-bold text-[#0d8171]"
                : ""
            }
          >
            Behavior
          </span>

          <span
            className={
              stage >= 6
                ? "font-bold text-[#0d8171]"
                : ""
            }
          >
            Decision
          </span>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   ARCHITECTURE
========================================================= */

function ArchitectureSection({ stage }) {
  const analyzers = [
    [Fingerprint, "Fingerprint"],
    [Layers, "Weight forensics"],
    [Activity, "Behavioral probe"],
    [GitCompare, "Structural diff"],
  ];

  const activeMap = {
    fingerprint: 0,
    weights: 1,
    behavior: 2,
    structure: 3,
  };

  const stageKeys = [
    "ingest",
    "fingerprint",
    "weights",
    "structure",
    "behavior",
    "integrity",
    "decision",
  ];

  const activeAnalyzer =
    activeMap[stageKeys[stage]] ?? -1;

  return (
    <section
      id="architecture"
      className="px-6 py-36 lg:px-10"
    >

      <div className="mx-auto max-w-[1450px]">

        <Reveal>

          <SectionTag icon={Workflow}>
            SECURITY ARCHITECTURE
          </SectionTag>


          <h2 className="mt-7 max-w-5xl text-5xl font-medium leading-[.92] tracking-[-.07em] text-[#15332e] md:text-7xl">

            One artifact.

            <br />

            Multiple evidence engines.

            <br />

            <span className="text-[#0d8b79]">
              One decision.
            </span>

          </h2>


          <p className="mt-7 max-w-2xl text-sm leading-7 text-[#72847f]">

            The same autonomous scan running in the hero continues
            through the security architecture below.

          </p>

        </Reveal>


        <Reveal delay={150}>

          <div className="mt-24 hidden h-[540px] lg:block">

            <div className="relative h-full">

              <svg
                viewBox="0 0 1400 540"
                className="absolute inset-0 h-full w-full"
              >

                <defs>

                  <linearGradient id="mgFlowGradient">

                    <stop
                      offset="0%"
                      stopColor="#b1ddd4"
                    />

                    <stop
                      offset="50%"
                      stopColor="#43a595"
                    />

                    <stop
                      offset="100%"
                      stopColor="#b1ddd4"
                    />

                  </linearGradient>

                </defs>


                {analyzers.map((_, index) => {

                  const y =
                    75 + index * 105;

                  return (
                    <path
                      key={`in-${index}`}
                      d={`M160 270 C300 270 300 ${y} 440 ${y}`}
                      fill="none"
                      stroke="url(#mgFlowGradient)"
                      strokeWidth="2"
                      strokeDasharray="7 9"
                      className="animate-[dash_1.5s_linear_infinite]"
                    />
                  );
                })}


                {analyzers.map((_, index) => {

                  const y =
                    75 + index * 105;

                  return (
                    <path
                      key={`out-${index}`}
                      d={`M650 ${y} C750 ${y} 750 270 840 270`}
                      fill="none"
                      stroke="url(#mgFlowGradient)"
                      strokeWidth="2"
                      strokeDasharray="7 9"
                      className="animate-[dash_1.5s_linear_infinite]"
                    />
                  );
                })}


                <path
                  d="M1030 270 H1130"
                  fill="none"
                  stroke="#a4d7cd"
                  strokeWidth="2"
                  strokeDasharray="7 9"
                  className="animate-[dash_1.5s_linear_infinite]"
                />


                <path
                  d="M1215 270 C1270 270 1270 170 1320 170"
                  fill="none"
                  stroke="#a4d7cd"
                  strokeWidth="2"
                  strokeDasharray="7 9"
                  className="animate-[dash_1.5s_linear_infinite]"
                />


                <path
                  d="M1215 270 C1270 270 1270 370 1320 370"
                  fill="none"
                  stroke="#e4b2a9"
                  strokeWidth="2"
                  strokeDasharray="7 9"
                  className="animate-[dash_1.5s_linear_infinite]"
                />

              </svg>


              {/* input */}

              <div className="absolute left-[8%] top-[50%] w-[180px] -translate-y-1/2 rounded-2xl border border-[#dce9e5] bg-white p-4 shadow-xl">

                <div className="flex items-center gap-3">

                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#edf8f5] text-[#0d7668]">
                    <Database size={16} />
                  </div>

                  <div>

                    <div className="text-[11px] font-bold text-[#17352f]">
                      Model artifact
                    </div>

                    <div className="mt-1 text-[8px] text-[#8a9d98]">
                      incoming checkpoint
                    </div>

                  </div>

                </div>

              </div>


              {/* analyzers */}

              {analyzers.map(
                ([Icon, title], index) => {

                  const active =
                    activeAnalyzer === index;

                  return (
                    <div
                      key={title}
                      className="absolute left-[39%] w-[205px] -translate-y-1/2 rounded-2xl border bg-white p-4 transition-all duration-500"
                      style={{
                        top:
                          75 +
                          index * 105,
                        borderColor: active
                          ? "#0d7668"
                          : "#dce9e5",
                        boxShadow: active
                          ? "0 0 0 3px rgba(13,118,104,.12), 0 20px 45px rgba(13,118,104,.14)"
                          : "0 10px 30px rgba(31,76,67,.06)",
                      }}
                    >

                      <div className="flex items-center gap-3">

                        <div
                          className="grid h-9 w-9 place-items-center rounded-xl transition-all duration-500"
                          style={{
                            background: active
                              ? "#0d7668"
                              : "#edf8f5",
                            color: active
                              ? "white"
                              : "#0d7668",
                          }}
                        >
                          <Icon size={15} />
                        </div>


                        <div>

                          <div className="text-[11px] font-bold text-[#17352f]">
                            {title}
                          </div>

                          <div className="mt-1 text-[8px] text-[#8a9d98]">
                            {active
                              ? "analyzing now"
                              : "on standby"}
                          </div>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}


              {/* risk */}

              <div className="absolute left-[59%] top-[50%] w-[190px] -translate-y-1/2 rounded-2xl border border-[#f0d6d0] bg-white p-4 shadow-xl">

                <div className="flex items-center gap-3">

                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff0ed] text-[#c85a4c]">
                    <Gauge size={16} />
                  </div>

                  <div>

                    <div className="text-[11px] font-bold text-[#17352f]">
                      Risk engine
                    </div>

                    <div className="mt-1 text-[8px] text-[#c85a4c]">
                      evidence aggregated
                    </div>

                  </div>

                </div>

              </div>


              {/* decision */}

              <div className="absolute left-[78%] top-[50%] w-[180px] -translate-y-1/2 rounded-2xl border border-[#dce9e5] bg-white p-4 shadow-xl">

                <div className="flex items-center gap-3">

                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#edf8f5] text-[#0d7668]">
                    <FileCheck size={16} />
                  </div>

                  <div>

                    <div className="text-[11px] font-bold text-[#17352f]">
                      Decision
                    </div>

                    <div className="mt-1 text-[8px] text-[#8a9d98]">
                      audit-ready record
                    </div>

                  </div>

                </div>

              </div>


              {/* outcomes */}

              <div className="absolute left-[92%] top-[31%] w-[145px] -translate-y-1/2 rounded-2xl border border-[#cde7df] bg-white p-4 shadow-xl">

                <div className="flex items-center gap-2">

                  <CircleCheck
                    size={16}
                    className="text-[#0d8b79]"
                  />

                  <span className="text-[10px] font-bold text-[#17352f]">
                    Approved
                  </span>

                </div>

              </div>


              <div className="absolute left-[92%] top-[69%] w-[145px] -translate-y-1/2 rounded-2xl border border-[#f0d6d0] bg-white p-4 shadow-xl">

                <div className="flex items-center gap-2">

                  <Ban
                    size={16}
                    className="text-[#c85a4c]"
                  />

                  <span className="text-[10px] font-bold text-[#17352f]">
                    Blocked
                  </span>

                </div>

              </div>

            </div>

          </div>

        </Reveal>

      </div>

    </section>
  );
}

/* =========================================================
   SECURITY STACK
========================================================= */

function SecurityStack({ stage }) {
  const activeLayer = Math.min(
    SECURITY_LAYERS.length - 1,
    Math.floor(
      (stage * SECURITY_LAYERS.length) / 7
    )
  );

  return (
    <section
      id="layers"
      className="relative overflow-hidden bg-[#eff8f5] px-6 py-36 lg:px-10"
    >

      <div className="absolute -left-40 top-40 h-[450px] w-[450px] rounded-full bg-[#c5eee4] blur-[120px]" />

      <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-[#f4dad4] blur-[120px]" />


      <div className="relative mx-auto max-w-[1450px]">

        <Reveal>

          <SectionTag icon={Layers}>
            COMPLETE SECURITY STACK
          </SectionTag>


          <h2 className="mt-7 max-w-5xl text-5xl font-medium leading-[.93] tracking-[-.07em] text-[#15332e] md:text-7xl">

            Ten steps between

            <br />

            <span className="text-[#0d8b79]">
              your model and production.
            </span>

          </h2>


          <p className="mt-7 max-w-2xl text-sm leading-7 text-[#71847f]">

            Every layer produces evidence. Every stage feeds
            the next. The entire security lifecycle remains traceable.

          </p>

        </Reveal>


        <div className="relative mt-20">

          <div className="absolute bottom-6 left-[27px] top-6 hidden w-[2px] bg-gradient-to-b from-[#0d7668] via-[#a9d6cc] to-[#e4eeeb] md:block" />


          <div className="space-y-3">

            {SECURITY_LAYERS.map(
              (layer, index) => {

                const Icon = layer.icon;

                const tone =
                  TONE[layer.tone];

                const active =
                  activeLayer === index;

                return (
                  <Reveal
                    key={layer.no}
                    delay={index * 45}
                  >

                    <div
                      className="relative grid gap-5 rounded-2xl border bg-white p-5 transition-all duration-500 md:grid-cols-[58px_230px_1fr_50px] md:items-center md:pl-16"
                      style={{
                        borderColor: active
                          ? "#0d7668"
                          : "#dbe9e4",
                        boxShadow: active
                          ? "0 0 0 3px rgba(13,118,104,.10), 0 18px 45px rgba(13,118,104,.12)"
                          : "0 8px 30px rgba(31,76,67,.04)",
                      }}
                    >

                      <div
                        className="relative z-10 grid h-11 w-11 place-items-center rounded-full text-[10px] font-bold transition-all duration-500 md:absolute md:left-1"
                        style={{
                          background: active
                            ? "#0d7668"
                            : "#f4f8f6",
                          color: active
                            ? "white"
                            : "#0d7668",
                        }}
                      >
                        {layer.no}
                      </div>


                      <div>

                        <div
                          className="mb-1 text-[8px] font-bold tracking-[.2em]"
                          style={{
                            color: tone.text,
                          }}
                        >
                          {layer.label}
                        </div>

                        <div className="text-sm font-bold text-[#17352f]">
                          {layer.title}
                        </div>

                      </div>


                      <p className="text-[11px] leading-5 text-[#788b86]">
                        {layer.description}
                      </p>


                      <div
                        className="grid h-10 w-10 place-items-center rounded-xl"
                        style={{
                          background: tone.bg,
                          color: tone.text,
                        }}
                      >
                        <Icon size={17} />
                      </div>

                    </div>

                  </Reveal>
                );
              }
            )}

          </div>


          <Reveal delay={500}>

            <div className="mt-8 flex flex-col gap-5 rounded-3xl bg-[#0d7668] p-7 text-white shadow-[0_25px_70px_rgba(13,118,104,.2)] md:flex-row md:items-center">

              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15">

                <ShieldCheck size={25} />

              </div>


              <div className="flex-1">

                <div className="text-[9px] font-bold tracking-[.25em] text-[#baf4e8]">
                  FINAL CONTROL LAYER
                </div>

                <div className="mt-2 text-2xl font-semibold">
                  Evidence becomes an action.
                </div>

                <p className="mt-1 max-w-2xl text-xs leading-6 text-white/65">
                  Approve, quarantine, remediate or send the
                  model to human review.
                </p>

              </div>


              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#0d7668]"
              >

                Open security center

                <ArrowRight size={14} />

              </a>

            </div>

          </Reveal>

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   LIVE ANALYSIS
========================================================= */

function LiveAnalysis({
  stages,
  stage,
  progress,
}) {
  return (
    <section
      id="analysis"
      className="px-6 py-36 lg:px-10"
    >

      <div className="mx-auto max-w-[1450px]">

        <Reveal>

          <SectionTag icon={Activity}>
            LIVE SECURITY ENGINE
          </SectionTag>


          <h2 className="mt-7 max-w-4xl text-5xl font-medium leading-[.93] tracking-[-.07em] text-[#15332e] md:text-7xl">

            See exactly what

            <br />

            MedGuard is

            <span className="text-[#0d8b79]">
              {" "}doing.
            </span>

          </h2>

        </Reveal>


        <Reveal delay={140}>

          <div className="mt-20 grid overflow-hidden rounded-[32px] border border-[#dbe9e4] bg-white shadow-[0_25px_80px_rgba(30,75,65,.08)] lg:grid-cols-[.8fr_1.2fr]">

            {/* left */}

            <div className="bg-[#0d7668] p-9 text-white md:p-12">

              <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.25em] text-[#baf4e8]">

                <span className="h-2 w-2 animate-pulse rounded-full bg-[#baf4e8]" />

                AUTONOMOUS ANALYSIS

              </div>


              <div className="mt-8 text-4xl font-medium leading-tight tracking-[-.05em] md:text-5xl">

                The security

                <br />

                pipeline never

                <br />

                stops thinking.

              </div>


              <p className="mt-6 max-w-md text-sm leading-7 text-white/65">

                Each stage produces evidence that feeds the
                next stage until enough context exists for a
                deployment decision.

              </p>


              <div className="mt-10 rounded-2xl border border-white/10 bg-white/10 p-5">

                <div className="flex justify-between text-[9px]">

                  <span>
                    ANALYSIS PROGRESS
                  </span>

                  <span>
                    {Math.round(progress)}%
                  </span>

                </div>


                <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/15">

                  <div
                    className="h-full rounded-full bg-[#b7fff2] transition-all duration-150"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>


              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-5">

                <div className="text-[8px] tracking-[.2em] text-white/45">
                  CURRENT STAGE
                </div>

                <div className="mt-2 text-lg font-semibold">
                  {stages[stage].title}
                </div>

                <div className="mt-1 text-xs text-white/55">
                  {stages[stage].description}
                </div>

              </div>

            </div>


            {/* right */}

            <div className="p-7 md:p-10">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e9f7f3] text-[#0d7668]">

                    <BrainCircuit size={19} />

                  </div>

                  <div>

                    <div className="text-sm font-bold text-[#17352f]">
                      MedicalVision-7B
                    </div>

                    <div className="mt-1 text-[8px] text-[#84958f]">
                      v3.8.1 · production candidate
                    </div>

                  </div>

                </div>


                <span className="flex items-center gap-2 rounded-full bg-[#e8f7f3] px-3 py-1.5 text-[8px] font-bold tracking-widest text-[#0d8171]">

                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0d8171]" />

                  RUNNING

                </span>

              </div>


              <div className="mt-7 space-y-2.5">

                {stages.map(
                  (item, index) => {

                    const complete =
                      index < stage;

                    const active =
                      index === stage;

                    return (
                      <div
                        key={item.key}
                        className={`flex items-center gap-4 rounded-xl border p-4 transition-all duration-500 ${
                          active
                            ? "border-[#a5d7cd] bg-[#f0f9f6]"
                            : "border-[#edf2ef] bg-[#fcfdfd]"
                        }`}
                      >

                        <div
                          className={`grid h-9 w-9 place-items-center rounded-xl ${
                            complete
                              ? "bg-[#e3f5ef] text-[#0d8171]"
                              : active
                              ? "bg-[#0d7668] text-white"
                              : "bg-[#eef2f0] text-[#94a49f]"
                          }`}
                        >

                          {complete ? (
                            <Check size={14} />
                          ) : (
                            <span className="text-[9px] font-bold">
                              {index + 1}
                            </span>
                          )}

                        </div>


                        <div className="flex-1">

                          <div className="text-xs font-semibold text-[#28453e]">
                            {item.title}
                          </div>

                          <div className="mt-1 text-[8px] text-[#8c9b97]">
                            {complete
                              ? "Evidence captured"
                              : active
                              ? "Processing now..."
                              : "Queued"}
                          </div>

                        </div>


                        {active && (

                          <div className="flex gap-1">

                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0d8b79]" />

                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0d8b79] [animation-delay:150ms]" />

                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0d8b79] [animation-delay:300ms]" />

                          </div>

                        )}

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          </div>

        </Reveal>

      </div>

    </section>
  );
}

/* =========================================================
   RISK ENGINE
========================================================= */

function RiskEngine({ risk }) {
  return (
    <section
      id="security"
      className="relative overflow-hidden bg-[#eaf6f3] px-6 py-36 lg:px-10"
    >

      <div className="absolute -right-40 top-[-120px] h-[650px] w-[650px] rounded-full bg-[#c9eee6] blur-[120px]" />


      <div className="relative mx-auto grid max-w-[1200px] items-center gap-20 lg:grid-cols-2">

        <Reveal>

          <div>

            <div className="text-[9px] font-bold tracking-[.3em] text-[#c45b4e]">
              EXPLAINABLE RISK ENGINE
            </div>


            <h2 className="mt-7 text-5xl font-medium leading-[.94] tracking-[-.07em] text-[#15332e] md:text-7xl">

              Never just

              <br />

              a number.

              <br />

              <span className="text-[#0d8b79]">
                Show the evidence.
              </span>

            </h2>


            <p className="mt-7 max-w-lg text-sm leading-7 text-[#71837e]">

              MedGuard connects individual signals to the
              final recommendation so security teams can inspect
              where the risk comes from.

            </p>


            <div className="mt-8 flex flex-wrap gap-3">

              {[
                "WEIGHTS",
                "BEHAVIOR",
                "STRUCTURE",
                "INTEGRITY",
              ].map((item) => (

                <span
                  key={item}
                  className="rounded-full bg-white px-4 py-2 text-[8px] font-bold tracking-widest text-[#0d7668] shadow-sm"
                >
                  {item}
                </span>

              ))}

            </div>

          </div>

        </Reveal>


        <Reveal delay={160}>

          <div className="rounded-[32px] border border-[#d6e6e1] bg-white p-8 shadow-[0_30px_100px_rgba(39,88,76,.12)]">

            <div className="flex items-center justify-between">

              <span className="text-[9px] font-bold tracking-[.23em] text-[#81938e]">
                MODEL ASSESSMENT
              </span>

              <span className="rounded-full bg-[#fff0ed] px-3 py-1.5 text-[8px] font-bold tracking-widest text-[#c65a4d]">
                {risk > 70
                  ? "QUARANTINE"
                  : "ANALYZING"}
              </span>

            </div>


            <div className="mt-8 flex items-center gap-9">

              {/* ring */}

              <div
                className="relative grid h-40 w-40 shrink-0 place-items-center rounded-full transition-all duration-700"
                style={{
                  background: `conic-gradient(#d66b5c ${risk * 3.6}deg, #e9efec ${risk * 3.6}deg)`,
                }}
              >

                <div className="absolute inset-[7px] rounded-full bg-white" />

                <div className="relative text-center">

                  <div className="text-5xl font-semibold tracking-[-.08em] text-[#17352f]">
                    {risk}
                  </div>

                  <div className="text-[8px] font-bold tracking-[.18em] text-[#c65a4d]">
                    RISK / 100
                  </div>

                </div>

              </div>


              {/* bars */}

              <div className="flex-1">

                {RISK_SIGNALS.map(
                  ([name, value]) => (

                    <div
                      key={name}
                      className="mb-4 last:mb-0"
                    >

                      <div className="mb-2 flex justify-between text-[8px]">

                        <span className="text-[#84958f]">
                          {name}
                        </span>

                        <span className="font-bold text-[#596e68]">
                          {value}
                        </span>

                      </div>


                      <div className="h-1.5 rounded-full bg-[#edf2ef]">

                        <div
                          className="h-full rounded-full bg-[#d66b5c]"
                          style={{
                            width: `${value}%`,
                          }}
                        />

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>


            <div className="mt-8 rounded-2xl border border-[#f0d7d1] bg-[#fff8f6] p-5">

              <div className="flex items-center gap-3">

                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#ffe9e4]">

                  <Lock
                    size={15}
                    className="text-[#c65a4d]"
                  />

                </div>

                <div>

                  <div className="text-[10px] font-bold text-[#a24e43]">
                    DEPLOYMENT BLOCKED
                  </div>

                  <div className="mt-1 text-[8px] text-[#9aa8a4]">
                    Evidence threshold exceeded
                  </div>

                </div>

              </div>

            </div>

          </div>

        </Reveal>

      </div>

    </section>
  );
}

/* =========================================================
   CAPABILITIES
========================================================= */

function Capabilities() {
  return (
    <section
      id="technology"
      className="px-6 py-36 lg:px-10"
    >

      <div className="mx-auto max-w-[1450px]">

        <Reveal>

          <SectionTag icon={Zap}>
            FULL COVERAGE
          </SectionTag>


          <h2 className="mt-7 max-w-5xl text-5xl font-medium leading-[.93] tracking-[-.07em] text-[#15332e] md:text-7xl">

            Everything checked

            <br />

            before your model

            <br />

            <span className="text-[#0d8b79]">
              goes live.
            </span>

          </h2>


          <p className="mt-7 max-w-2xl text-sm leading-7 text-[#748780]">

            Security shouldn't stop at weight inspection. MedGuard
            connects technical analysis, behavioral evidence,
            provenance and governance.

          </p>

        </Reveal>


        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {FEATURES.map(
            (feature, index) => {

              const Icon = feature.icon;

              return (
                <Reveal
                  key={feature.title}
                  delay={index * 45}
                >

                  <article
                    className="group min-h-[250px] rounded-3xl border border-[#dbe9e4] bg-white p-7 shadow-[0_12px_40px_rgba(31,76,67,.04)] transition duration-500 hover:-translate-y-2 hover:border-[#9bcfc4] hover:shadow-[0_25px_60px_rgba(31,76,67,.10)]"
                    style={{
                      animation:
                        "mg-float 5s ease-in-out infinite",
                      animationDelay:
                        `${index * .2}s`,
                    }}
                  >

                    <div className="flex items-start justify-between">

                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf8f4] text-[#0d7668] transition group-hover:bg-[#0d7668] group-hover:text-white">

                        <Icon size={18} />

                      </div>


                      <span className="text-[7px] font-bold tracking-widest text-[#9aa9a5]">
                        {feature.category}
                      </span>

                    </div>


                    <h3 className="mt-12 text-base font-semibold text-[#17352f]">
                      {feature.title}
                    </h3>


                    <p className="mt-3 text-[11px] leading-6 text-[#7a8d87]">
                      {feature.description}
                    </p>

                  </article>

                </Reveal>
              );
            }
          )}

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   PASSPORT
========================================================= */

function SecurityPassport() {
  return (
    <section
      id="trust"
      className="px-6 py-36 lg:px-10"
    >

      <div className="mx-auto max-w-[1450px]">

        <Reveal>

          <div className="text-center">

            <div className="text-[9px] font-bold tracking-[.3em] text-[#0d8b79]">
              MODEL SECURITY PASSPORT
            </div>


            <h2 className="mx-auto mt-7 max-w-5xl text-5xl font-medium leading-[.93] tracking-[-.07em] text-[#15332e] md:text-8xl">

              One identity.

              <br />

              Every version.

              <br />

              <span className="text-[#0d8b79]">
                Complete evidence.
              </span>

            </h2>


            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#748780]">

              Turn the complete analysis into one portable,
              auditable model security record.

            </p>

          </div>

        </Reveal>


        <Reveal delay={150}>

          <div className="mx-auto mt-20 max-w-5xl rounded-[32px] border border-[#d8e7e2] bg-white p-7 shadow-[0_30px_90px_rgba(30,75,65,.10)] md:p-10">

            <div className="flex flex-col justify-between gap-6 border-b border-[#e4eeeb] pb-7 md:flex-row md:items-center">

              <div className="flex items-center gap-4">

                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e8f7f3] text-[#0d7668]">

                  <ShieldCheck size={23} />

                </div>


                <div>

                  <div className="text-sm font-bold text-[#17362f]">
                    MEDGUARD SECURITY PASSPORT
                  </div>

                  <div className="mt-1 text-[9px] text-[#899a96]">
                    CLINICAL ASSISTANT · VERSION 2.4
                  </div>

                </div>

              </div>


              <span className="flex items-center gap-2 rounded-full bg-[#e7f7f2] px-4 py-2 text-[9px] font-bold tracking-widest text-[#0d8171]">

                <Check size={12} />

                VERIFIED

              </span>

            </div>


            <div className="grid gap-3 py-8 md:grid-cols-4">

              {[
                ["RISK", "08 / 100"],
                ["INTEGRITY", "VERIFIED"],
                ["ARCHITECTURE", "7B"],
                ["STATUS", "APPROVED"],
              ].map(([label, value]) => (

                <div
                  key={label}
                  className="rounded-2xl bg-[#f5f9f7] p-5"
                >

                  <div className="text-[8px] font-bold tracking-widest text-[#8d9c98]">
                    {label}
                  </div>

                  <div className="mt-3 text-sm font-semibold text-[#176f63]">
                    {value}
                  </div>

                </div>

              ))}

            </div>


            <div className="grid gap-3 md:grid-cols-2">

              <div className="rounded-2xl border border-[#e4eeeb] p-5">

                <div className="flex items-center gap-3">

                  <Fingerprint
                    size={17}
                    className="text-[#0d7668]"
                  />

                  <div>

                    <div className="text-[8px] tracking-widest text-[#899893]">
                      SHA-256 FINGERPRINT
                    </div>

                    <code className="mt-1 block text-[10px] text-[#38564e]">
                      74d9f1a8...e821
                    </code>

                  </div>

                </div>

              </div>


              <div className="rounded-2xl border border-[#e4eeeb] p-5">

                <div className="flex items-center gap-3">

                  <Network
                    size={17}
                    className="text-[#0d7668]"
                  />

                  <div>

                    <div className="text-[8px] tracking-widest text-[#899893]">
                      PROVENANCE CHAIN
                    </div>

                    <div className="mt-1 text-[10px] font-semibold text-[#38564e]">
                      Training → Review → Deploy
                    </div>

                  </div>

                </div>

              </div>

            </div>


            <div className="mt-7 flex flex-wrap gap-5 text-[9px] text-[#7f918c]">

              <span className="flex items-center gap-2">
                <Check size={12} />
                EVIDENCE ARCHIVED
              </span>

              <span className="flex items-center gap-2">
                <Check size={12} />
                REVIEW HISTORY
              </span>

              <span className="flex items-center gap-2">
                <Check size={12} />
                DECISION TRACE
              </span>

            </div>

          </div>

        </Reveal>

      </div>

    </section>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MedGuardLanding({
  stages,
  stage,
  progress,
  risk,
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6faf8] text-[#102522]">

      {/* =====================================================
          GLOBAL ANIMATION CSS
      ===================================================== */}

      <style jsx global>{`

        @keyframes mg-spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes mg-spin-reverse {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }

        @keyframes mg-network-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes mg-scan {
          0%,
          100% {
            top: 8%;
            opacity: .35;
          }

          50% {
            top: 90%;
            opacity: 1;
          }
        }

        @keyframes mg-float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -50;
          }
        }

        @keyframes mg-glow {
          0%,
          100% {
            opacity: .45;
          }

          50% {
            opacity: 1;
          }
        }

        * {
          scroll-behavior: smooth;
        }

        ::selection {
          background: rgba(13,118,104,.16);
          color: #102522;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="fixed left-0 right-0 top-0 z-50 px-5 pt-5">

        <div className="mx-auto flex max-w-[1450px] items-center justify-between rounded-2xl border border-[#d8e7e2] bg-white/90 px-5 py-3 shadow-[0_12px_50px_rgba(30,70,60,.07)] backdrop-blur-xl">

          <a
            href="/"
            className="flex items-center gap-3"
          >

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0d7668] text-white shadow-lg shadow-[#0d7668]/20">

              <ShieldCheck size={20} />

            </div>


            <div>

              <div className="text-sm font-bold tracking-[.18em] text-[#15332e]">
                MEDGUARD
              </div>

              <div className="text-[8px] font-bold tracking-[.3em] text-[#159681]">
                AI SECURITY
              </div>

            </div>

          </a>


          <div className="hidden items-center gap-8 text-xs text-[#72847f] md:flex">

            <a
              href="#technology"
              className="transition hover:text-[#0d7668]"
            >
              Technology
            </a>

            <a
              href="#architecture"
              className="transition hover:text-[#0d7668]"
            >
              Architecture
            </a>

            <a
              href="#layers"
              className="transition hover:text-[#0d7668]"
            >
              Security stack
            </a>

            <a
              href="#security"
              className="transition hover:text-[#0d7668]"
            >
              Risk
            </a>

            <a
              href="#trust"
              className="transition hover:text-[#0d7668]"
            >
              Trust
            </a>

          </div>


          <a
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl bg-[#0d7668] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-[#0d7668]/20 transition hover:-translate-y-0.5 hover:bg-[#095f54]"
          >

            Open scanner

            <ArrowRight size={14} />

          </a>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden px-6 pt-28 lg:px-10">

        <div
          className="pointer-events-none absolute -left-40 top-20 h-[650px] w-[650px] rounded-full bg-[#c7efe6]/50 blur-[120px]"
          style={{
            animation:
              "mg-glow 7s ease-in-out infinite",
          }}
        />


        <div
          className="pointer-events-none absolute -right-40 top-32 h-[650px] w-[650px] rounded-full bg-[#e5f5f1] blur-[120px]"
          style={{
            animation:
              "mg-glow 8s ease-in-out infinite",
          }}
        />


        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(#d9e9e4 1px, transparent 1px), linear-gradient(90deg, #d9e9e4 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 84%)",
          }}
        />


        <div className="relative mx-auto grid min-h-[900px] max-w-[1450px] items-center gap-8 lg:grid-cols-[.82fr_1.18fr]">

          <div className="relative z-20 max-w-2xl">

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#cfe4df] bg-white px-4 py-2 text-[9px] font-bold tracking-[.24em] text-[#0b7e6f] shadow-sm">

              <span className="h-2 w-2 animate-pulse rounded-full bg-[#0b9b87]" />

              AUTONOMOUS MODEL SECURITY

            </div>


            <h1 className="text-[clamp(55px,7vw,105px)] font-medium leading-[.87] tracking-[-.075em] text-[#102522]">

              Know your

              <br />

              medical AI

              <br />

              <span className="text-[#0d8b79]">
                before
              </span>

              <br />

              deployment.

            </h1>


            <p className="mt-9 max-w-xl text-base leading-7 text-[#6f827d]">

              MedGuard analyzes model artifacts, weights,
              architecture, behavior, integrity and provenance
              before they enter a clinical production pipeline.

            </p>


            <div className="mt-9 flex flex-wrap gap-3">

              <a
                href="/dashboard"
                className="group flex items-center gap-3 rounded-xl bg-[#0d7668] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-[#0d7668]/20 transition hover:-translate-y-1"
              >

                <ScanSearch size={17} />

                Scan a model

                <ArrowRight
                  size={15}
                  className="transition group-hover:translate-x-1"
                />

              </a>


              <a
                href="#architecture"
                className="flex items-center gap-2 rounded-xl border border-[#d6e5e1] bg-white px-6 py-4 text-sm font-semibold text-[#38534c] shadow-sm transition hover:-translate-y-1"
              >

                Explore architecture

                <ChevronRight size={15} />

              </a>

            </div>


            <div className="mt-8 flex flex-wrap gap-6 text-[10px] font-medium text-[#7c8e89]">

              <span className="flex items-center gap-2">
                <Check size={13} className="text-[#0d9985]" />
                Evidence-first
              </span>

              <span className="flex items-center gap-2">
                <Check size={13} className="text-[#0d9985]" />
                Explainable
              </span>

              <span className="flex items-center gap-2">
                <Check size={13} className="text-[#0d9985]" />
                Audit-ready
              </span>

            </div>

          </div>


          <NeuralScanner
            stages={stages}
            stage={stage}
            progress={progress}
            risk={risk}
          />

        </div>


        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center">

          <div className="text-[8px] font-bold tracking-[.35em] text-[#8b9b96]">
            LIVE SECURITY ENGINE
          </div>

          <div className="mt-2 text-[8px] font-bold text-[#0d8171]">
            {stages[stage].label}
          </div>

          <ChevronDown
            size={16}
            className="mx-auto mt-1 animate-bounce text-[#0d8b79]"
          />

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="border-y border-[#dce9e5] bg-white">

        <div className="mx-auto grid max-w-[1450px] md:grid-cols-3">

          {[
            ["2,300+", "Models analyzed"],
            ["99.2%", "Detection accuracy"],
            ["<2 min", "Average analysis"],
          ].map(
            ([value, label]) => (

              <div
                key={label}
                className="border-[#e1ece9] p-12 md:border-r last:border-r-0"
              >

                <div className="text-5xl font-medium tracking-[-.06em] text-[#15332e]">
                  {value}
                </div>

                <div className="mt-3 text-[10px] font-bold uppercase tracking-[.25em] text-[#899a95]">
                  {label}
                </div>

              </div>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          ARCHITECTURE
      ===================================================== */}

      <ArchitectureSection
        stage={stage}
      />


      {/* =====================================================
          SECURITY LAYERS
      ===================================================== */}

      <SecurityStack
        stage={stage}
      />


      {/* =====================================================
          LIVE ANALYSIS
      ===================================================== */}

      <LiveAnalysis
        stages={stages}
        stage={stage}
        progress={progress}
      />


      {/* =====================================================
          RISK
      ===================================================== */}

      <RiskEngine
        risk={risk}
      />


      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <Capabilities />


      {/* =====================================================
          PASSPORT
      ===================================================== */}

      <SecurityPassport />


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        id="docs"
        className="relative overflow-hidden bg-[#0d7668] px-6 py-44 text-center text-white"
      >

        <div
          className="absolute left-1/2 top-1/2 h-[650px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8ce8d7]/20 blur-[140px]"
          style={{
            animation:
              "mg-glow 7s ease-in-out infinite",
          }}
        />


        <div className="relative">

          <div className="text-[9px] font-bold tracking-[.3em] text-[#baf4e8]">
            BEFORE THE CLINIC
          </div>


          <h2 className="mx-auto mt-7 max-w-5xl text-6xl font-medium leading-[.9] tracking-[-.08em] md:text-9xl">

            Make trust a

            <br />

            deployment

            <br />

            <span className="text-[#b7fff2]">
              requirement.
            </span>

          </h2>


          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/65">
            Bring evidence into the room before your model
            reaches the clinical production pipeline.
          </p>


          <a
            href="/dashboard"
            className="mt-10 inline-flex items-center gap-4 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#0d7668] shadow-xl transition hover:-translate-y-1"
          >

            <ScanSearch size={17} />

            Start a security scan

            <ArrowRight size={17} />

          </a>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-[#dce9e5] bg-white px-6 py-8">

        <div className="mx-auto flex max-w-[1450px] flex-col justify-between gap-4 text-[10px] text-[#84958f] md:flex-row">

          <span className="font-bold tracking-widest text-[#17352f]">
            MEDGUARD
          </span>

          <span>
            Pre-deployment security for medical AI
          </span>

          <span>
            © 2026 MedGuard AI
          </span>

        </div>

      </footer>

    </main>
  );
}