import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';
import facebookStrategy from 'passport-facebook';
import Methods from '../helpers/dbMethods';
import oauthMid from '../middleware/profiler'

dotenv.config()

passport.use(new facebookStrategy({
    clientID: process.env.facebookID,
    clientSecret: process.env.facebookSecret,
    callbackURL: "/api/v1/auth/facebook/redirect",
    profileFields: ['name', 'email']
  },oauthMid))

passport.use(new GoogleStrategy({
    clientID : process.env.googleID,
    clientSecret : process.env.googleSecret,
    callbackURL:'/api/v1/auth/google/redirect'
  },oauthMid))
  
  passport.serializeUser((user,done)=>{
    done(null,user)
  })
  
  passport.deserializeUser(async(user,done)=>{
    const User = await Methods.select(
      "*",
      "users", 
      `${user.provider}id='${user.id}'`);
    done(null,User)
  })
  
export default passport