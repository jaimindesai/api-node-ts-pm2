import * as express from 'express';
import * as cors from 'cors';
import {getUser,getUsers,putUser} from '../controllers/usersController';

const router: express.Router = express.Router();


router.get('/user/:id', cors(), getUser);
router.get('/users', cors(), getUsers);
router.get('/user/user.add', cors(),putUser);

export {router as userRouter};



