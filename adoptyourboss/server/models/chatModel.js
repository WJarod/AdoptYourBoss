import mongoose from "mongoose";

const chatSchema = mongoose.Schema({

    "sendBy": String,
    "Message": String,
    "reciveBy": String,
});

const Chat = mongoose.model('messages', chatSchema);

export default Chat;