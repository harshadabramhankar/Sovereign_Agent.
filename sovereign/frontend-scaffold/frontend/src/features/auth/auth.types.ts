export interface User {
  id: string;
  name: string;
  role: 'admin' | 'engineer' | 'manager' | 'operator';
}
