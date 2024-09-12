export type UserWithPermissions = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  balance: number;
  isActive: boolean;
  password: string;
  lastLogin: Date | null;
  refreshTokenCode?: string;
  userPermissions?: Array<{
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    permissionId: string;
    userId: string;
  }>;
};
