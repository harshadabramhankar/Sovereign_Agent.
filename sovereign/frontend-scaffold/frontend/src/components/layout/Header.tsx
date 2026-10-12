import { LockKeyhole } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div>
        <h1>Sovereign AI Workbench</h1>
        <p>Confidential industrial task execution</p>
      </div>

      <div className="header-security">
        <LockKeyhole size={16} />
        <span>Zero external calls</span>
      </div>
    </header>
  );
}