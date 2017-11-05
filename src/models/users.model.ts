import mongoose = require('mongoose');
import { usersSchema } from './users.schema';
import { IUserModel, IUserDocument } from './user';

export const UserModel = mongoose.model<IUserDocument, IUserModel>('ceh01b.users', usersSchema, 'users');
