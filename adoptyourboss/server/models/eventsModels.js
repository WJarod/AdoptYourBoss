import mongoose from "mongoose";

const eventSchema = mongoose.Schema({

    "titleEvent": "string",
    "description": "string",
    "image": "string",
    "createDate": {
        type: Date,
        default: new Date()
    },
});

const Events = mongoose.model('events', eventSchema);

export default Events;