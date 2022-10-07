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
const port = 3600;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRoute);

const localDB = 'mongodb://localhost:27017/chatvia'
const uri = 'mongodb+srv://admin:123456789a@pjw-chat.vxl7n0l.mongodb.net/chat-app?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { 
        server.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
    .catch(err => console.log(err));

io.on('connection', socket => {
    socket.on('message', ({ name, message }) => {
        io.emit('message', { name, message })
    })
})
process.on('SIGINT', () => {
    mongoose.disconnect().then(() => {
        process.exit();
    });
});
// const users = client.db("chat-app").collection("users");
// const rooms = client.db("chat-app").collection("rooms");


