import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
    friends: {
        type: Array,
        required: true,
        default: [],
    },
    rooms: {
        type: Array,
        required: true,
        default: [],
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User;