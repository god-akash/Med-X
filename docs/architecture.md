# Architecture

## Overview

Med-X AI is a pipeline system: a model goes in, passes through
independent detector modules, and a fusion engine produces a single
explainable risk decision.

\`\`\`
Model Upload
     ↓
Secure Intake (validate, hash, extract metadata)
     ↓
Model DNA (fingerprint: architecture, params, tensor shapes)
     ↓
   ┌─────────────┬─────────────────┬──────────────────┐
   ▼             ▼                 ▼                  ▼
Weight        Steganalysis     Behavioral         Activation
Forensics                      Analysis           Analysis
   └─────────────┴─────────────────┴──────────────────┘
                       ↓
              Anomaly Detection (ML)
                       ↓
                 Risk Fusion Engine
                       ↓
              Explainability / Report
                       ↓
             Policy Decision (Approve/Review/Block)
\`\`\`

## Design principles

- **No single detector is authoritative.** Every module produces an
  independent evidence score; the fusion engine combines them.
- **Evidence over certainty.** Findings are reported as "anomalous
  signal," never "confirmed malware."
- **Untrusted input by default.** Uploaded models are treated as
  untrusted; we avoid executing arbitrary model-associated code where
  possible and prefer `safetensors` over pickle-based formats.
- **Explainability is a first-class output**, not an afterthought —
  every risk score must trace back to specific evidence.
- **Modules are swappable.** Each detector lives in its own folder with
  a consistent interface so it can be replaced/improved independently.

## Backend module responsibilities

| Module | Responsibility |
|---|---|
| `intake/` | File validation, hashing, safe loading |
| `fingerprinting/` | Model DNA, architecture extraction, V1/V2 diffing |
| `weight_forensics/` | Statistical/entropy/bit-level weight analysis |
| `steganalysis/` | Detects hidden-payload-style bit anomalies |
| `behavioral_analysis/` | Trigger/backdoor probing via controlled inputs |
| `activation_analysis/` | Baseline vs scanned activation drift |
| `anomaly_detection/` | ML-based anomaly scoring (Isolation Forest) |
| `risk_engine/` | Fuses all evidence into risk + confidence |
| `explainability/` | Builds structured "why/where/how" findings |
| `policy/` | Turns risk + profile into Approve/Review/Block |
| `database/` | Persistence of scans, models, reports |
| `workers/` | Async scan execution (later phase) |
| `security/` | Sandboxed execution wrapper (later phase) |

## Data flow / API shape

\`\`\`
POST /upload          -> stores model, returns model_id
POST /scan/{model_id} -> runs pipeline, returns scan_id
GET  /scan/{scan_id}  -> status/progress
GET  /report/{scan_id}-> full explainable report
POST /compare         -> diff two models
GET  /history         -> past scans
\`\`\`

## Risk score schema

\`\`\`json
{
  "risk_score": 0-100,
  "confidence": 0-100,
  "severity": "LOW | MODERATE | HIGH | CRITICAL",
  "decision": "APPROVE | REVIEW_REQUIRED | BLOCK",
  "evidence": [
    {"detector": "steganalysis", "score": 82, "detail": "..."},
    {"detector": "weight_anomaly", "score": 74, "detail": "..."}
  ],
  "suspicious_layers": ["encoder.layer.8"],
  "recommended_action": "..."
}
\`\`\`

## Open decisions / TBD

- [ ] Exact fusion weighting method (fixed weights vs learned)
- [ ] Storage: SQLite vs Postgres (decide by week 2)
- [ ] Sync vs async scan execution
- [ ] Sandbox implementation detail (Docker isolation scope)