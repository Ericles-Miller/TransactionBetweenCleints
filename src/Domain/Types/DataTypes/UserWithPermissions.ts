export type UserWithPermissions = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  isActive: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  password: string;
  lastLogin: Date | null;
  refreshTokenCode?: string;
  usersPermissions?: Array<{
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    permissionId: string;
    userId: string;
  }>;
};
