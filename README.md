# Med-X
it securtiy services  tat checks the ai malware for stegenograph images  for deployment in medical fields 


**A pre-deployment security gateway for medical AI models.**

Med-X scans AI models (classification, detection, segmentation) before
they enter a medical production environment. It performs multi-layer
forensic, behavioral, and statistical analysis to produce an explainable
risk score and deployment decision.

> ⚠️ Prototype / hackathon project. Detectors are research-grade signals,
> not certified medical-device software.

## What it does

1. **Intake** — accepts a model file, validates format, computes hash and
   metadata ("Model DNA")
2. **Weight Forensics** — statistical, entropy, and bit-level analysis of
   model weights
3. **Steganalysis** — detects anomalous bit patterns that may indicate
   hidden payloads in weight tensors
4. **Behavioral Analysis** — probes the model with controlled/perturbed
   inputs to surface trigger-dependent (backdoor-like) behavior
5. **Risk Fusion** — combines all detector signals into a single risk
   score with a confidence value
6. **Explainable Report** — shows *why* a model was flagged, evidence
   layer-by-layer
7. **Policy Decision** — APPROVE / REVIEW REQUIRED / BLOCK

## Why this matters

Medical AI models are increasingly pulled from public/shared model hubs.
A tampered model (backdoored, corrupted, or carrying a hidden payload)
deployed into a diagnostic pipeline is a patient-safety risk. MedGuard
adds a security checkpoint before that model is trusted.

## Tech stack

- **Backend:** Python, FastAPI, PyTorch, safetensors, NumPy/SciPy,
  scikit-learn
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Storage:** SQLite (dev) — see `docs/architecture.md`
- **Deployment:** Docker / Docker Compose

## Project structure

See [`docs/architecture.md`](docs/architecture.md) for the full folder
layout and module responsibilities.

## Getting started

\`\`\`bash
# backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# frontend
cd frontend
npm install
npm run dev
\`\`\`

## Test models

See `test-models/manifest.json` for a labeled set of clean and
deliberately tampered models used to validate detectors. See
`scripts/` for how they were generated.

## Status

Hackathon build-in-progress. See `docs/demo_script.md` for the current
demo flow and `docs/threat_model.md` for what this system does and does
not claim to detect.

## Team

- <names>

## License

<tbd>