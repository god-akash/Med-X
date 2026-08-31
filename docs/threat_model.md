# Threat Model

## What Med-X is trying to catch

| Threat | Description | Primary detector(s) |
|---|---|---|
| Backdoored model | Model behaves normally except on a specific trigger input, producing attacker-chosen output | `behavioral_analysis/`, `activation_analysis/` |
| Hidden payload in weights | Data smuggled into low-order bits of weight tensors (steganography) | `steganalysis/` |
| Weight corruption/poisoning | Weights altered/perturbed in ways that degrade or bias predictions | `weight_forensics/`, `anomaly_detection/` |
| Provenance tampering | Model doesn't match its claimed source/version/hash | `fingerprinting/` (diff engine) |
| Unauthorized model drift | A "new version" silently changes behavior from an approved baseline | `fingerprinting/diff_engine.py` |

## What Med-X does NOT claim to do

- Does **not** guarantee the absence of a backdoor — absence of detected
  evidence is not proof of safety.
- Does **not** execute or analyze arbitrary attacker-supplied code as a
  general malware sandbox.
- Does **not** replace clinical validation of model accuracy/safety —
  this is a security layer, not an efficacy/regulatory check.
- Does **not** claim mathematically certain steganalysis — bit-pattern
  anomalies are suspicious evidence, not proof of a hidden payload.

## Assumptions

- Uploaded models may be adversarial/untrusted.
- The system operator defines the "approved baseline" models used for
  drift comparison.
- Analysis environment (in the prototype) is not a hardened sandbox;
  production deployment would require isolated execution (see
  `security/sandbox_runner.py`).

## Out of scope (for this build)

- Real-time inference monitoring post-deployment
- Multi-tenant access control / auth (assume single trusted operator)
- Regulatory/compliance certification (FDA, HIPAA, etc.)