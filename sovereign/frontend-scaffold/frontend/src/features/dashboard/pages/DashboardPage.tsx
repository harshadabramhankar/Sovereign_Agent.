import {
  CheckCircle2,
  FileCheck2,
  Lock,
  Network,
  Workflow,
} from "lucide-react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

const metrics = [
  {
    title: "Tasks completed",
    value: "24",
    icon: CheckCircle2,
    color: "green",
  },
  {
    title: "Local documents",
    value: "128",
    icon: FileCheck2,
    color: "blue",
  },
  {
    title: "External calls",
    value: "0",
    icon: Network,
    color: "orange",
  },
  {
    title: "Active agents",
    value: "3",
    icon: Workflow,
    color: "purple",
  },
];

export default function DashboardPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h2>Dashboard</h2>
          <p>System overview and local AI activity</p>
        </div>

        <Badge color="green">System operational</Badge>
      </div>

      <div className="metric-grid">
        {metrics.map(({ title, value, icon: Icon, color }) => (
          <Card key={title} className="metric-card">
            <div className={`metric-icon ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <span>{title}</span>
              <strong>{value}</strong>
            </div>
          </Card>
        ))}
      </div>

      <div className="dashboard-grid">
        <Card title="Sovereignty status">
          <div className="status-row">
            <Lock size={20} />
            <div>
              <strong>Air-gapped mode active</strong>
              <p>All processing is restricted to the local environment.</p>
            </div>
          </div>

          <div className="status-list">
            <div>
              <span>External API calls</span>
              <strong className="success-text">0</strong>
            </div>
            <div>
              <span>Network status</span>
              <strong className="success-text">Blocked</strong>
            </div>
            <div>
              <span>Audit logging</span>
              <strong className="success-text">Active</strong>
            </div>
          </div>
        </Card>
        <Card title="Recent agent activity">
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-dot green-dot" />
              <div>
                <strong>Inspection report analyzed</strong>
                <p>Approval note generated locally</p>
              </div>
              <small>2 min ago</small>
            </div>

            <div className="activity-item">
              <span className="activity-dot blue-dot" />
              <div>
                <strong>Maintenance SOP indexed</strong>
                <p>Added to local knowledge base</p>
              </div>
              <small>8 min ago</small>
            </div>

            <div className="activity-item">
              <span className="activity-dot orange-dot" />
              <div>
                <strong>External request blocked</strong>
                <p>Sovereignty monitor prevented connection</p>
              </div>
              <small>15 min ago</small>
            </div>
          </div>
        </Card>
        <Card title="Available local models">
          <div className="model-row">
            <span>General model</span>
            <Badge color="green">Ready</Badge>
          </div>
          <div className="model-row">
            <span>Coding model</span>
            <Badge color="green">Ready</Badge>
          </div>
          <div className="model-row">
            <span>Vision model</span>
            <Badge color="green">Ready</Badge>
          </div>
          <div className="model-row">
            <span>Embedding model</span>
            <Badge color="green">Ready</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}