import {
  CheckCircle2,
  Lock,
  Network,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

export default function SecurityMonitorPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h2>Security Monitor</h2>
          <p>Verify data sovereignty and local execution</p>
        </div>

        <Badge color="green">Protected</Badge>
      </div>

      <div className="security-grid">
        <Card title="Network isolation">
          <div className="large-status success-bg">
            <Network size={30} />
            <strong>External network blocked</strong>
            <span>All external connections are restricted.</span>
          </div>
        </Card>

        <Card title="Data sovereignty">
          <div className="large-status success-bg">
            <Lock size={30} />
            <strong>Local-only processing</strong>
            <span>Files remain inside the organization.</span>
          </div>
        </Card>

        <Card title="Security checks">
          <div className="check-row">
            <CheckCircle2 size={18} />
            <span>External API calls</span>
            <strong>0</strong>
          </div>

          <div className="check-row">
            <CheckCircle2 size={18} />
            <span>External uploads</span>
            <strong>0 bytes</strong>
          </div>

          <div className="check-row">
            <CheckCircle2 size={18} />
            <span>Audit logging</span>
            <strong>Active</strong>
          </div>

          <div className="check-row">
            <XCircle size={18} />
            <span>Unapproved network access</span>
            <strong>Blocked</strong>
          </div>
        </Card>

        <Card title="Execution policy">
          <div className="policy-box">
            <ShieldCheck size={24} />
            <p>
              Generated code is executed in an isolated Docker sandbox
              with network access disabled.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}