export type UserRole = 'admin' | 'member';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  created_at: string;
}

/** Shape returned by the admin-users edge function list action */
export interface AdminUserRecord {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
}
  