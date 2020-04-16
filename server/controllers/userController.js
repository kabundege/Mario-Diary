import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import localStorage from 'localStorage'
import passowrdValidator from 'joi-password-complexity';
import mailer from '../helpers/mailer'
import tokenProvider from '../helpers/tokenProvider';
import responseHandler from '../helpers/responseHandler';
import Methods from '../helpers/dbMethods';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export default class userController {
  static async signup(req, res) {
    const {
      firstName, lastName, email, password,confirmPassword
    } = req.body;
    const {error} = passowrdValidator().validate(password)
    if(error){
      responseHandler.error(400, new Error('Password example : aPassword123!'));
      return responseHandler.send(res);
    }
    if (password != confirmPassword) {
      responseHandler.error(400, new Error('UnMaching Password'));
      return responseHandler.send(res);
    }
    const userid = uuidv4();
    const signupUser = await Methods.select("*", "users", `email='${email}'`);
      if (signupUser['0']) {
        responseHandler.error(409, new Error('user Already exists'));
        return responseHandler.send(res);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Methods.insert(
        'users',
        'userid,firstname,lastname,email,password,role',
        '$1,$2,$3,$4,$5,$6',
        [userid, firstName.trim(), lastName.trim(), email.trim(), hashedPassword, 'client'],
        'userid,firstname,lastname,email',
      );

      const token = tokenProvider({
        userid: newUser.userid,
      });

      localStorage.setItem('token',token)

      responseHandler.successful(201, 'user created successful', {
        token,
        id: newUser.userid,
        firstName: newUser.firstname,
        lastName: newUser.lastname,
        email: newUser.email
      });
      return responseHandler.send(res);
  }

  static async allUsers(req,res){
    const User = await Methods.select('*','users',`userid='${req.user.userid}'`);
      if(User[0].role !== 'admin'){
        responseHandler.error(403,new Error('Restricted Arrea'))
        return responseHandler.send(res)
      }
    const users = await Methods.select('*','users')
    responseHandler.successful(200,'Fetch Exited sucessfully',users)
    return responseHandler.send(res)
  }

  static async reset(req, res) {
    const {
       password,confirmPassword
    } = req.body;

    const id = req.user.userid ;

    const {error} = passowrdValidator().validate(password)

    if(error){
      responseHandler.error(400, new Error('Password example : aPassword123!'));
      return responseHandler.send(res);
    }
    
    if (password != confirmPassword) {
      responseHandler.error(400, new Error('UnMaching Password'));
      return responseHandler.send(res);
    }
      const hashedPassword = await bcrypt.hash(password, 10);

      const resetUser = await Methods.update(
        'users',
        `password = '${hashedPassword}'`,
        `userid='${id}'`
        ,'userid,firstname,lastname,email,password',
      );

      const token = tokenProvider({
        userid: resetUser.userid,
      });
      localStorage.setItem("token",token)
      responseHandler.successful(200, 'reset successful ', {
        token,
        NewPassword: password,
      });
      return responseHandler.send(res);
  }

  static async email(req,res){
    const { email } = req.body;

    const user = await Methods.select('*','users',`email='${email}'`)

    if(!user['0']){
      responseHandler.error(404, new Error("Email Not Found"));
      return responseHandler.send(res);
    }

    const token = tokenProvider({
      userid: user['0'].userid
    });

    mailer.reset(user['0'],token)

    responseHandler.successful(200,'Check your email')
    return responseHandler.send(res)
  }

  static async token(req, res) {
    const { token } = req.body;
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = decoded;
      let  author = await Methods.select('*','users',`userid='${req.user.userid}'`);
      if(!author['0']){
        responseHandler.error(401,new Error('Token has expired'))
        return responseHandler.send(res)
      }

      localStorage.setItem('token',token)

      responseHandler.successful(200, "User logged in successfully", {
        token,
        id: author["0"].userid,
        firstName: author["0"].firstname,
        lastName: author["0"].lastname,
        email: author["0"].email
      });
      return responseHandler.send(res);
  }

  static async signin(req, res) {
    const { email, password } = req.body;
    
      const loginUser = await Methods.select("*", "users", `email='${email}'`);

      if (!loginUser['0']) {
        responseHandler.error(404, new Error("incorrect credentials"));
        return responseHandler.send(res);
      }
      
      if (!await bcrypt.compare(password,loginUser['0'].password)) {
        responseHandler.error(400, new Error("incorrect credentials"));
        return responseHandler.send(res);
      }

      const token = tokenProvider({
        userid: loginUser['0'].userid
      });

      localStorage.setItem('token',token)

      responseHandler.successful(200, "User logged in successfully", {
        token,
        id: loginUser["0"].userid,
        firstName: loginUser["0"].firstname,
        lastName: loginUser["0"].lastname,
        email: loginUser["0"].email
      });
      return responseHandler.send(res);
  }
}
