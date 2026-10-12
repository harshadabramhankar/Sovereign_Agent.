export interface AgentStep {
  tool: string;
  status: 'pending' | 'running' | 'done' | 'error';
}
