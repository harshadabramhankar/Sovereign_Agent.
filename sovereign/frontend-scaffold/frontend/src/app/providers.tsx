import { ReactNode } from 'react';

export default function AppProviders({ children }: { children: ReactNode }) {
  return <>{children}</>; // TODO: wrap with auth/query/theme providers
}
