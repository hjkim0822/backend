import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';

// connection string for mongodb connection
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRoute);

const uri = 'mongodb+srv://admin:123456789a@pjw-chat.vxl7n0l.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { 
        server.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
    .catch(err => console.log(err));

// const users = client.db("chat-app").collection("users");
// const rooms = client.db("chat-app").collection("rooms");


