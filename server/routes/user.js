import express, { Router } from "express";
import passport from 'passport';
import dotenv from 'dotenv';
import userController from "../controllers/userController";
import userValidation from "../middleware/uservalidation";
import auth from '../middleware/auth';

const route = express.Router();

dotenv.config()

route.use(passport.session()) 

route.post("/auth/signup", userValidation.signup, userController.signup);

route.patch("/auth/reset/:token",auth.reset, userValidation.reset, userController.reset);

route.post("/auth/email",userValidation.email,userController.email)

// route.patch('/user/:userid',auth.access,storyController.status)

route.get('/users',auth.access,userController.allUsers)

route.post("/auth/signin", userValidation.signin, userController.signin);

route.get('/checkToken/:token',auth.reset,userController.token)

export default route;
