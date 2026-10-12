import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import WorkbenchPage from "../features/workbench/pages/WorkbenchPage";
import DocumentsPage from "../features/documents/pages/DocumentsPage";
import AuditLogsPage from "../features/audit/pages/AuditLogsPage";
import SecurityMonitorPage from "../features/security/pages/SecurityMonitorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "workbench", element: <WorkbenchPage /> },
          { path: "documents", element: <DocumentsPage /> },
          { path: "audit-logs", element: <AuditLogsPage /> },
          { path: "security", element: <SecurityMonitorPage /> },
        ],
      },
    ],
  },
]);