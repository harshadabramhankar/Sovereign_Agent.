export type TaskStatus =
  | "idle"
  | "processing"
  | "completed"
  | "failed"
  | "waiting_approval";

export type TaskType =
  | "document_analysis"
  | "coding"
  | "image_analysis"
  | "excel_analysis";

export interface TaskRequest {
  prompt: string;
  taskType: TaskType;
  file?: File;
}

export interface TaskStep {
  id: string;
  label: string;
  status: "pending" | "running" | "completed" | "failed";
}

export interface TaskResponse {
  id: string;
  status: TaskStatus;
  selectedModel: string;
  steps: string[];
  output?: string;
  externalCalls: number;
}

export interface AuditEvent {
  id: string;
  event: string;
  user: string;
  timestamp: string;
  status: "success" | "blocked";
}