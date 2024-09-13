import { CreateUserController } from '@Api/Controllers/Users/CreateUserController';
import { ReadAllUserController } from '@Api/Controllers/Users/ReadAllUserController';
import { ReadUserByIdController } from '@Api/Controllers/Users/ReadUserByIdController';
import { UpdateIsActiveController } from '@Api/Controllers/Users/UpdateIsActiveController';
import { Router } from 'express';

export const userRouters = Router();

const creteUserController = new CreateUserController();
const readAllUserController = new ReadAllUserController();
const readUserByIdController = new ReadUserByIdController();
const updateIsActiveController = new UpdateIsActiveController();

userRouters.post('/', creteUserController.handle);
userRouters.get('/', readAllUserController.handle);
userRouters.get('/:id',readUserByIdController.handle);
userRouters.patch('/:id/updateIsActive',updateIsActiveController.handle);