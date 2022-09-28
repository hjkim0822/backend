import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomid: {
        type: String,
        required: true,
        unique: true,
    },
    
}, { timestamps: true })

const Room = mongoose.model('Room', roomSchema);

export default Room;