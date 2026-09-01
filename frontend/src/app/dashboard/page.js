"use client";

import { useState } from "react";
import {
  Activity,
  CheckCircle2,
  FileArchive,
  FileCode2,
  FileUp,
  LoaderCircle,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";

import {  requestUpload,
  uploadFileDirectly,} from "../lib/api";

const steps = [
  "Preparing secure upload",
  "Uploading model",
  "Reading artifact",
  "Fingerprinting weights",
  "Running safety probes",
  "Generating security report",
];

export default function DashboardPage() {
  const [file, setFile] = useState(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  function handleFile(event) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setComplete(false);
    setError("");
    setProgress(0);
  }

  async function startScan() {
    if (!file || running) return;

    try {
      setRunning(true);
      setComplete(false);
      setError("");
      setCurrentStep(0);
      setProgress(0);

    
      const uploadInfo = await requestUpload({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });

   
      setCurrentStep(1);

      await uploadFileDirectly({
        uploadUrl: uploadInfo.uploadUrl,
        file,
        contentType:
          file.type || "application/octet-stream",
        onProgress: (uploadProgress) => {
          setProgress(uploadProgress);
        },
      });

      // Simulated analysis stages for now.
      // Later these should come from your backend scanner.
      for (let step = 2; step < steps.length; step++) {
        setCurrentStep(step);

        await new Promise((resolve) =>
          setTimeout(resolve, 1200)
        );
      }

      setProgress(100);
      setComplete(true);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Something went wrong during upload"
      );
    } finally {
      setRunning(false);
    }
  }

  function removeFile() {
    if (running) return;

    setFile(null);
    setProgress(0);
    setCurrentStep(0);
    setComplete(false);
    setError("");
  }

  return (
    <main className="min-h-screen bg-[#f7faf9] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
            MedGuard AI
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Model Security Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Upload your AI model and run the MedGuard security
            analysis pipeline.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT SIDE */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  AI Security Scanner
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Neural artifact inspection pipeline
                </p>
              </div>

              <div className="rounded-full bg-teal-50 p-3 text-teal-600">
                <Activity size={20} />
              </div>
            </div>

            {/* Neural visualization */}
            <div className="relative mb-6 h-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fbfa]">

              <div className="absolute inset-0">
                {[...Array(28)].map((_, index) => (
                  <div
                    key={index}
                    className="absolute h-2.5 w-2.5 rounded-full bg-teal-500"
                    style={{
                      left: `${10 + (index % 7) * 13}%`,
                      top: `${12 + Math.floor(index / 7) * 24}%`,
                      opacity:
                        running || complete ? 0.9 : 0.25,
                      animation:
                        running
                          ? `neuronPulse ${
                              0.8 + (index % 5) * 0.15
                            }s infinite`
                          : "none",
                      animationDelay: `${index * 0.08}s`,
                    }}
                  />
                ))}
              </div>

              <div className="absolute inset-x-10 top-1/2 h-px bg-teal-200" />

              <div
                className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-teal-400 to-transparent transition-all duration-500 ${
                  running
                    ? "left-[80%] opacity-100"
                    : "left-0 opacity-0"
                }`}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-2xl border border-teal-100 bg-white/90 px-6 py-5 text-center shadow-lg backdrop-blur">
                  <ShieldCheck
                    className="mx-auto text-teal-600"
                    size={34}
                  />

                  <p className="mt-3 font-semibold">
                    {running
                      ? steps[currentStep]
                      : complete
                        ? "Security analysis complete"
                        : "Awaiting model artifact"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {running
                      ? "Inspecting model integrity and behavior"
                      : "Upload a model to begin"}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  {running ? "Processing" : "Progress"}
                </span>

                <span className="font-semibold">
                  {progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-teal-500 transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {/* Pipeline */}
            <div className="space-y-3">
              {steps.map((step, index) => {
                const done =
                  complete || currentStep > index;

                const active =
                  running && currentStep === index;

                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                      active
                        ? "border-teal-200 bg-teal-50"
                        : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2
                        size={18}
                        className="text-emerald-500"
                      />
                    ) : active ? (
                      <LoaderCircle
                        size={18}
                        className="animate-spin text-teal-600"
                      />
                    ) : (
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    )}

                    <span
                      className={`text-sm ${
                        active
                          ? "font-semibold text-teal-700"
                          : "text-slate-600"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* RIGHT SIDE */}
          <section className="space-y-6">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold">
                  Upload AI Model
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Supported model artifacts
                </p>
              </div>

              {!file ? (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center transition hover:border-teal-300 hover:bg-teal-50/30">
                  <UploadCloud
                    size={42}
                    className="text-teal-500"
                  />

                  <p className="mt-4 font-semibold">
                    Drop your model here
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    or click to browse files
                  </p>

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFile}
                    accept=".pt,.pth,.bin,.safetensors,.onnx,.pkl,.joblib"
                  />
                </label>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-teal-100 p-3 text-teal-700">
                      {file.name.endsWith(".onnx") ? (
                        <FileCode2 size={25} />
                      ) : (
                        <FileArchive size={25} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">
                        {file.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      disabled={running}
                      className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-slate-700 disabled:opacity-50"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={startScan}
                disabled={!file || running}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {running ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Scanning Model
                  </>
                ) : complete ? (
                  <>
                    <CheckCircle2 size={18} />
                    Scan Complete
                  </>
                ) : (
                  <>
                    <FileUp size={18} />
                    Upload & Scan
                  </>
                )}
              </button>
            </div>

            {/* Result */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-semibold">
                Security Status
              </h2>

              <div className="mt-4 rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className={
                      complete
                        ? "text-emerald-500"
                        : "text-slate-400"
                    }
                    size={26}
                  />

                  <div>
                    <p className="font-semibold">
                      {complete
                        ? "Model analysis completed"
                        : "No analysis available"}
                    </p>

                    <p className="text-sm text-slate-500">
                      {complete
                        ? "Security report is ready."
                        : "Upload a model to generate a report."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes neuronPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }

          50% {
            transform: scale(1.8);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}