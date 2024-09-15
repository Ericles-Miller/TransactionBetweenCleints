import 'reflect-metadata';
import 'express-async-errors';
import { UserPermissions } from '@Domain/Entities/Auth/UserPermissions';
import {v4 as uuid} from 'uuid';


describe('UserPermissions Class', () => {
  let userPermissions: UserPermissions;
  let userId = uuid();
  let permissionId = uuid()
  beforeEach(() => {
    userPermissions = new UserPermissions(userId,permissionId,null);
  });

  test('should create a userPermission with valid properties', () => {
    expect(userPermissions.permissionId).toBe(permissionId);
    expect(userPermissions.userId).toBe(userId);
  });

})



