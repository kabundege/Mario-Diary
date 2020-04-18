import express, { Router } from "express";
import passport from '../config/passport';
import dotenv from 'dotenv';
import oauthController from "../controllers/oauthController";

const route = express.Router();

dotenv.config()

route.use(passport.session()) 

route.get("/auth/google",passport.authenticate('google',{scope:['profile','email']}));

route.get('/auth/google/redirect',passport.authenticate('google'),oauthController.auth);

route.get('/auth/logout',oauthController.logOut)

route.get("/auth/facebook",passport.authenticate('facebook',{scope:['email']}));

route.get('/auth/facebook/redirect',passport.authenticate('facebook'),oauthController.auth)

export default route
