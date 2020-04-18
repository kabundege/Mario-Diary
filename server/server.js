import http from 'http';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

http.createServer(app);

const port = process.env.PORT || 5050;

app.listen(port,()=>{
    console.log(` You are running port ${port}....`)
});