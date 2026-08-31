# Demo Script

## Goal

Show a clean model getting APPROVED and a tampered model getting
BLOCKED, with a clear explainable reason why — in under 5 minutes.

## Setup (before demo)

- [ ] Backend + frontend running
- [ ] `test-models/clean/baseline_v1.safetensors` ready
- [ ] `test-models/backdoored/trigger_patch_v1.safetensors` ready
- [ ] Browser open to dashboard

## Flow

1. **Intro (30s)** — one-liner: "MedGuard scans AI models for tampering
   before they're trusted in a medical pipeline."
2. **Upload clean model (30s)** — show Model DNA card populate
   (hash, architecture, param count).
3. **Run scan on clean model (60s)** — show progress through detector
   stages, land on APPROVE with high confidence, low risk score.
4. **Upload backdoored model (30s)** — same file type, different weights.
5. **Run scan on backdoored model (60s)** — show risk score climb,
   evidence list populate ("trigger-dependent output change",
   "activation spike in layer X"), land on BLOCK / REVIEW REQUIRED.
6. **Show the report (30s)** — click into full report, point at
   layer heatmap and evidence list.
7. **Close (30s)** — mention roadmap: CI/CD gate, provenance tracking,
   medical-specific risk profiles.

## Key talking points

- "We don't claim to detect every possible backdoor — we surface
  multiple independent signals and require human review when evidence
  is ambiguous."
- "This is designed to sit in front of a model registry or CI/CD
  pipeline, not replace clinical validation."

## Fallback if live demo breaks

- Pre-recorded video of the above flow
- Screenshot report exported to `docs/demo_report_example.png`