import http from 'http';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(app);

const port = process.env.BACKEND_PORT || 8080;

app.listen(port,()=>{
    console.log(` You are running port ${port}....`)
});