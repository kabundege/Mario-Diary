import uuidv4 from 'uuid/v4';
import tokenProvider from '../helpers/tokenProvider';
import Methods from '../helpers/dbMethods';
import localStorage from 'localStorage'

export default class social {
    static async auth(req,res){
        const userid = uuidv4();
        const  firstname = req.user.name.familyName
        const  lastname = req.user.name.givenName
        let status,message,oauthUser;
        const loginUser = await Methods.select(
        "*",
        "users", 
        `${req.user.provider}id='${req.user.id}'`);
        const exist = await Methods.select(
        "*",
        "users", 
        `email='${req.user.emails[0].value}'`);
        if (loginUser[0]) {
            oauthUser = loginUser[0]
            status = 200;
            message = 'Login Successfull'
        }else if(exist[0]){
            oauthUser = exist[0]
            status = 301
            message = 'Redirected By Email'
        }else{
            const newUser = await Methods.insert(
            'users',
            `userid,firstname,lastname,image,email,role,status,isVerified,${req.user.provider}id`,
            '$1,$2,$3,$4,$5,$6,$7,$8,$9',
            [userid, firstname, lastname,req.user.photos[0].value,req.user.emails[0].value, 'client','active',true,req.user.id],
            `'userid,firstname,lastname,email,role,${req.user.provider}'`,
            );
            oauthUser = newUser
            message = 'Mario Welcomes You!'
            status = 201
        }

        const token = tokenProvider({
        userid: oauthUser.userid
        });
        localStorage.setItem("token",token)
        return res.redirect(`${process.env.FRONTEND_PORT}/login?token=${token}`)
    }

    static async logOut(req,res){
        req.logOut()
        localStorage.removeItem("token")
        return res.redirect(`http://localhost:${process.env.FRONTEND_PORT}`)
    }

}
