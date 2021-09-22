import mongoose from "mongoose";

const friendsSchema = mongoose.Schema({

    "User1": String,
    "User2": 
    {
        type: mongoose.Schema.Types.ObjectId, ref: "users",
    },
    "status": {
        type: String,
        default: "pending"
    }
});

const User = mongoose.model('friends', friendsSchema);

export default User;