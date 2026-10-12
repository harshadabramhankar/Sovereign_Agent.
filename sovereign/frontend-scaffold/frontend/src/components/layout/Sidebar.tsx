
import {
  Activity,
  Archive,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/workbench",
    label: "AI Workbench",
    icon: Workflow,
  },
  {
    to: "/documents",
    label: "Documents",
    icon: FileText,
  },
  {
    to: "/audit-logs",
    label: "Audit Logs",
    icon: Archive,
  },
  {
    to: "/security",
    label: "Security Monitor",
    icon: ShieldCheck,
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">SA</div>
        <div>
          <strong>Sovereign Agents</strong>
          <small>Local AI Workbench</small>
        </div>
      </div>

      <nav className="navigation">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-status">
        <Activity size={16} />
        <span>Air-gapped mode active</span>
      </div>
    </aside>
  );
}
