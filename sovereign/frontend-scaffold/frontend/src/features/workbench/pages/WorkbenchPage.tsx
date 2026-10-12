import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Download,
  FileUp,
  Play,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import ExecutionTimeline from "../components/ExecutionTimeline";
import { submitTask } from "../../../services/apiClient";
import type {
  TaskResponse,
  TaskStep,
  TaskType,
} from "../../../types/common.types";

const baseSteps: TaskStep[] = [
  {
    id: "classify",
    label: "Classify task",
    status: "pending",
  },
  {
    id: "permission",
    label: "Check permissions",
    status: "pending",
  },
  {
    id: "route",
    label: "Select local model",
    status: "pending",
  },
  {
    id: "plan",
    label: "Create agent plan",
    status: "pending",
  },
  {
    id: "execute",
    label: "Execute local tools",
    status: "pending",
  },
  {
    id: "verify",
    label: "Verify output",
    status: "pending",
  },
];

const modelPreview: Record<TaskType, string> = {
  document_analysis: "Local General Model",
  coding: "Local Coding Model",
  image_analysis: "Local Vision Model",
  excel_analysis: "Local General Model",
};

export default function WorkbenchPage() {
  const [prompt, setPrompt] = useState("");
  const [taskType, setTaskType] =
    useState<TaskType>("document_analysis");
  const [file, setFile] = useState<File>();
  const [result, setResult] = useState<TaskResponse>();
  const [steps, setSteps] = useState<TaskStep[]>(baseSteps);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const selectedModel = useMemo(
    () => modelPreview[taskType],
    [taskType]
  );

  useEffect(() => {
    if (!loading) return;

    let currentStep = 0;

    const interval = window.setInterval(() => {
      setSteps((previous) =>
        previous.map((step, index) => {
          if (index < currentStep) {
            return { ...step, status: "completed" };
          }

          if (index === currentStep) {
            return { ...step, status: "running" };
          }

          return { ...step, status: "pending" };
        })
      );

      currentStep += 1;

      if (currentStep >= baseSteps.length) {
        window.clearInterval(interval);
      }
    }, 500);

    return () => window.clearInterval(interval);
  }, [loading]);

  function resetTask() {
    setPrompt("");
    setFile(undefined);
    setResult(undefined);
    setError("");
    setSteps(baseSteps);
  }

  function handleFile(fileValue?: File) {
    if (!fileValue) return;

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(fileValue.type)) {
      setError("Only PDF, image, DOCX and XLSX files are supported.");
      return;
    }

    if (fileValue.size > 10 * 1024 * 1024) {
      setError("File size must be below 10 MB.");
      return;
    }

    setError("");
    setFile(fileValue);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a task description.");
      return;
    }

    setError("");
    setResult(undefined);
    setSteps(baseSteps);
    setLoading(true);

    try {
      const response = await submitTask({
        prompt,
        taskType,
        file,
      });

      setResult(response);

      setSteps((previous) =>
        previous.map((step) => ({
          ...step,
          status: "completed",
        }))
      );
    } catch {
      setError("Unable to execute the task.");
      setSteps((previous) =>
        previous.map((step, index) =>
          index === previous.length - 1
            ? { ...step, status: "failed" }
            : step
        )
      );
    } finally {
      setLoading(false);
    }
  }

  function downloadOutput() {
    if (!result?.output) return;

    const blob = new Blob([result.output], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "sovereign-agent-output.txt";
    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h2>AI Workbench</h2>
          <p>Execute confidential tasks using local AI agents</p>
        </div>

        <div className="heading-actions">
          <Badge color="blue">Local processing</Badge>
          <Button variant="secondary" onClick={resetTask}>
            <RotateCcw size={16} />
            Reset
          </Button>
        </div>
      </div>

      <div className="workbench-grid">
        <Card title="Create a task">
          <form onSubmit={handleSubmit} className="task-form">
            <label>
              Task type

              <select
                value={taskType}
                onChange={(event) =>
                  setTaskType(event.target.value as TaskType)
                }
              >
                <option value="document_analysis">
                  Document analysis
                </option>
                <option value="coding">Coding task</option>
                <option value="image_analysis">
                  Image or drawing analysis
                </option>
                <option value="excel_analysis">
                  Excel analysis
                </option>
              </select>
            </label>

            <div className="model-preview">
              <span>Automatically selected model</span>
              <strong>{selectedModel}</strong>
            </div>

            <label>
              Task description

              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Example: Prepare an approval note from the uploaded inspection report."
                rows={7}
              />
            </label>

            <div
              className={`drop-zone ${dragging ? "dragging" : ""}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                handleFile(event.dataTransfer.files[0]);
              }}
            >
              <FileUp size={26} />
              <strong>
                {file ? file.name : "Drag and drop a confidential file"}
              </strong>
              <span>PDF, image, DOCX or XLSX up to 10 MB</span>

              <label className="browse-button">
                Browse file
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.docx,.xlsx"
                  onChange={(event) =>
                    handleFile(event.target.files?.[0])
                  }
                />
              </label>
            </div>

            {error && <p className="error-text">{error}</p>}

            <Button type="submit" disabled={loading}>
              <Play size={18} />
              {loading ? "Executing locally..." : "Run local agent"}
            </Button>
          </form>
        </Card>

        <Card title="Live execution">
          <div className="live-security">
            <ShieldCheck size={18} />
            <span>Data stays inside the local environment</span>
          </div>

          <ExecutionTimeline steps={steps} />

          {result && (
            <div className="result-panel">
              <div className="result-header">
                <div>
                  <span className="muted-text">Output status</span>
                  <strong>Verified locally</strong>
                </div>

                <Badge color="green">Completed</Badge>
              </div>

              <p>{result.output}</p>

              <div className="result-actions">
                <Button onClick={downloadOutput}>
                  <Download size={17} />
                  Download output
                </Button>

                <span className="external-call-count">
                  External calls: {result.externalCalls}
                </span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}