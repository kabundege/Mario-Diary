import nodemailer from "nodemailer";
import Nexmo from 'nexmo'
import dotenv from 'dotenv'

dotenv.config()

export default class mail {
    static async reset(user,token){
        const Message = `
        <div  style="background: #581b98;padding:10px;border-radius:5px;width:80%">
            <p><span style="background:#46c3db;color:white;border-top-left-radius:3px;border-bottom-left-radius:3px;padding:5px;">To reset your Password </span>
            <span style="background:white;border-top-right-radius:3px;border-bottom-right-radius:3px;padding:5px;color:#000"><a href="http://localhost:${process.env.FRONTEND_PORT}/reset/${token}">Click here</a><span></p>
        </div>`;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASSWORD 
            }
        });

        let info = await transporter.sendMail({
            from: `'From Mario' 👻 ${process.env.EMAIL}`, 
            to: `${user.email}`, 
            subject: "Reset Your Password", 
            text: "Write smart with Mario", 
            html: Message
        })
    }

    static async conctactUs(data){
        const {subject,authorEmail,content} = data
        const message = `<strong>From ${authorEmail}</strong><br/>${content}`
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: `"From Mario 👻"<${authorEmail}>`, 
            to: `${process.env.EMAIL}`, 
            subject: subject, 
            text: "Write smart With Mario", 
            html: message
        })
    }

    static async signup(user,token){
        const Message = `
        <div  style="background: #581b98;padding:10px;border-radius:5px;width:80%">
            <p><span style="background:#46c3db;color:white;border-top-left-radius:3px;border-bottom-left-radius:3px;padding:5px;">To activate Mario</span>
            <span style="background:white;border-top-right-radius:3px;border-bottom-right-radius:3px;padding:5px;color:#000"><a href="http://localhost:${process.env.FRONTEND_PORT}/verify/${token}">Click here</a><span></p>
        </div>`;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASSWORD 
            }
        });

        let info = await transporter.sendMail({
            from: `'From Mario' 👻 ${process.env.EMAIL}`, 
            to: `${user.email}`, 
            subject: "Confirm You Account", 
            text: "Write smart with Mario",
            html: Message
        })
    }
    
}
