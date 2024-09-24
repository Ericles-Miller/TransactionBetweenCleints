import { CreateUserController } from '@Api/Controllers/Users/CreateUserController';
import { DeleteUserController } from '@Api/Controllers/Users/DeleteUserController';
import { ReadAllUsersController } from '@Api/Controllers/Users/ReadAllUsersController';
import { ReadUserByIdController } from '@Api/Controllers/Users/ReadUserByIdController';
import { UpdateIsActiveController } from '@Api/Controllers/Users/UpdateIsActiveController';
import { UpdateUserController } from '@Api/Controllers/Users/UpdateUserController';
import { AuthorizedFlow } from '@Api/Extensions/AuthorizedFlow';
import { Limiter } from '@Api/Extensions/Limiter';
import { Router } from 'express';

export const userRouters = Router();
const authorizedFlow = new AuthorizedFlow();


const creteUserController = new CreateUserController();
const readAllUsersController = new ReadAllUsersController();
const readUserByIdController = new ReadUserByIdController();
const updateIsActiveController = new UpdateIsActiveController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();

userRouters.post('/',Limiter.usersLimiter, creteUserController.handle);
userRouters.get('/', Limiter.usersLimiter, readAllUsersController.handle);
userRouters.get('/:id', Limiter.usersLimiter, readUserByIdController.handle);
userRouters.patch('/:id/updateIsActive',Limiter.usersLimiter, updateIsActiveController.handle);
userRouters.delete('/', Limiter.usersLimiter,
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  deleteUserController.handle
);

userRouters.patch("/", Limiter.usersLimiter, 
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  updateUserController.handle
);