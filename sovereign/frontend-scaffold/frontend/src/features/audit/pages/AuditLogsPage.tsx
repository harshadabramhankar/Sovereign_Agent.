import { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import { getAuditEvents } from "../../../services/apiClient";
import type { AuditEvent } from "../../../types/common.types";

export default function AuditLogsPage() {
  const [events, setEvents] = useState<AuditEvent[]>([]);

  useEffect(() => {
    getAuditEvents().then(setEvents);
  }, []);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h2>Audit Logs</h2>
          <p>Track every task, tool and security event</p>
        </div>
      </div>

      <Card title="Recent events">
        <div className="document-table">
          <div className="table-header audit-header">
            <span>Event</span>
            <span>User</span>
            <span>Timestamp</span>
            <span>Status</span>
          </div>

          {events.map((event) => (
            <div className="table-row audit-header" key={event.id}>
              <span>{event.event}</span>
              <span>{event.user}</span>
              <span>{event.timestamp}</span>
              <Badge
                color={
                  event.status === "success"
                    ? "green"
                    : event.status === "blocked"
                      ? "orange"
                      : "red"
                }
              >
                {event.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}