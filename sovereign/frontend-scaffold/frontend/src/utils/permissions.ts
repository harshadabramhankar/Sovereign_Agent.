import type { UserRole } from '../types/user.types';

export function canApprove(role: UserRole): boolean {
  return role === 'admin' || role === 'manager';
}
