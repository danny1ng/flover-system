type UserRole = keyof typeof import('./constants').USER_ROLES;

interface User {
  id: ID;
  name: string;
  role: string;
  role: UserRole;
}

type CurrentUser = User | undefined;
