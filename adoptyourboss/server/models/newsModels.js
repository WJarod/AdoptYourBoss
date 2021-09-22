import mongoose from "mongoose";

const newSchema = mongoose.Schema({

    "titleNews": "string",
    "description": "string",
    "image": "string",
    "createDate": {
        type: Date,
        default: new Date()
    },
});

const News = mongoose.model('news', newSchema);

export default News;