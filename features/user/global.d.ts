type UserRole = keyof typeof import('./constants').USER_ROLES;

interface SignUpRequest {
  id: ID;
  createdAt: string;
  declineReason?: string;
  email: string;
  firstName: string;
  lastName: string;
  linkedin?: string;
  organizationAddress: string;
  organizationBusiness?: string;
  organizationCountry: string;
  organizationName: string;
  organizationPostcode: number | string;
  otherLink?: string;
  phoneNumber: string;
  position?: string;
  researchGate?: string;
  role?: string;
  status: string;
  title: string;
  updatedAt: string;
  website?: string;
}

interface User {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  signup: SignUpRequest;
  title: string;
  updatedAt: string;
}

interface Admin {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  updatedAt: string;
}

type CurrentUser = Admin | User | undefined;
