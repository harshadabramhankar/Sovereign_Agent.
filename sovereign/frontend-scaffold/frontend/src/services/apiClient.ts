import type {
  AuditEvent,
  TaskRequest,
  TaskResponse,
} from "../types/common.types";

const USE_MOCK_API = false;

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function submitTask(
  request: TaskRequest
): Promise<TaskResponse> {
  if (!USE_MOCK_API) {
    const formData = new FormData();
    formData.append("prompt", request.prompt);
    formData.append("task_type", request.taskType);
    formData.append("organization_id", "Toyota");

    if (request.file) {
      formData.append("file", request.file);
    }

    const response = await fetch("http://127.0.0.1:8000/api/v1/tasks", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Task submission failed");
    }

    return response.json();
  }

  await wait(1200);

  const modelMap = {
    document_analysis: "Local General Model",
    coding: "Local Coding Model",
    image_analysis: "Local Vision Model",
    excel_analysis: "Local General Model",
  };

  return {
    id: crypto.randomUUID(),
    status: "completed",
    selectedModel: modelMap[request.taskType],
    steps: [
      "Task classified",
      "Permission check completed",
      "Local model selected",
      "Agent plan created",
      "Local tools executed",
      "Output verified",
    ],
    output:
      "Prototype output generated successfully. No external API calls were made.",
    externalCalls: 0,
  };
}

export async function getAuditEvents(): Promise<AuditEvent[]> {
  if (!USE_MOCK_API) {
    const response = await fetch("http://127.0.0.1:8000/api/v1/audit-logs");

    if (!response.ok) {
      throw new Error("Unable to load audit events");
    }

    return response.json();
  }

  return [
    {
      id: "AUD-001",
      event: "Task completed",
      user: "admin@organization.local",
      timestamp: new Date().toLocaleString(),
      status: "success",
    },
    {
      id: "AUD-002",
      event: "External API call blocked",
      user: "system",
      timestamp: new Date().toLocaleString(),
      status: "blocked",
    },
    {
      id: "AUD-003",
      event: "Document indexed in local RAG",
      user: "engineer@organization.local",
      timestamp: new Date().toLocaleString(),
      status: "success",
    },
  ];
}