import { CreateUserController } from '@Api/Controllers/Users/CreateUserController';
import { DeleteUserController } from '@Api/Controllers/Users/DeleteUserController';
import { ReadAllUsersController } from '@Api/Controllers/Users/ReadAllUsersController';
import { ReadUserByIdController } from '@Api/Controllers/Users/ReadUserByIdController';
import { UpdateIsActiveController } from '@Api/Controllers/Users/UpdateIsActiveController';
import { UpdateUserController } from '@Api/Controllers/Users/UpdateUserController';
import { AuthorizedFlow } from '@Api/Extensions/AuthorizedFlow';
import { Router } from 'express';

export const userRouters = Router();
const authorizedFlow = new AuthorizedFlow();


const creteUserController = new CreateUserController();
const readAllUsersController = new ReadAllUsersController();
const readUserByIdController = new ReadUserByIdController();
const updateIsActiveController = new UpdateIsActiveController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();

userRouters.post('/', creteUserController.handle);
userRouters.get('/', readAllUsersController.handle);
userRouters.get('/:id',readUserByIdController.handle);
userRouters.patch('/:id/updateIsActive',updateIsActiveController.handle);
userRouters.delete('/', 
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  deleteUserController.handle
);

userRouters.patch("/",
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  updateUserController.handle
);