# Sovereign AI Workbench — Frontend

React + TypeScript + Vite, feature-based structure (see `src/features/*`).

## Pages
/login /dashboard /workbench /documents /knowledge-base /agents /audit-logs /security-monitor /settings

## Getting started
```
npm install
npm run dev
```

## Recommended build order
1. components/ui
2. components/layout
3. features/auth
4. features/workbench
5. features/documents
6. features/security
7. services/apiClient.ts
8. hooks/useTaskStream.ts
9. features/audit
10. features/knowledge

Keep components used by only one feature inside that feature's `components/` folder;
promote to shared `components/` only when multiple features need it.
