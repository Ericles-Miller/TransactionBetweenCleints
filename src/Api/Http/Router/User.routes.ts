import { CreateUserController } from '@Api/Controllers/Users/CreateUserController';
import { ReadAllUsersController } from '@Api/Controllers/Users/ReadAllUsersController';
import { ReadUserByIdController } from '@Api/Controllers/Users/ReadUserByIdController';
import { UpdateIsActiveController } from '@Api/Controllers/Users/UpdateIsActiveController';
import { Router } from 'express';

export const userRouters = Router();

const creteUserController = new CreateUserController();
const readAllUsersController = new ReadAllUsersController();
const readUserByIdController = new ReadUserByIdController();
const updateIsActiveController = new UpdateIsActiveController();

userRouters.post('/', creteUserController.handle);
userRouters.get('/', readAllUsersController.handle);
userRouters.get('/:id',readUserByIdController.handle);
userRouters.patch('/:id/updateIsActive',updateIsActiveController.handle);