type UserRole = keyof typeof import('./constants').USER_ROLES;

interface User {
  id: ID;
  name: string;
  role: UserRole;
  stores: Store[];
}

type CurrentUser = User | undefined;
