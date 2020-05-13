import express from "express";
import user from './Files/user';
import oauth from './Files/socialOauth'
import stories from './Files/story';
import comments from './Files/comments';
import additional from './Files/additional';

const route = express.Router();

route.use('/', user);
route.use('/', stories);
route.use('/', oauth);
route.use('/comment',comments);
route.use('/',additional)

export default route;