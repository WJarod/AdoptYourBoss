import mongoose from "mongoose";

const offreSchema = mongoose.Schema({

    "titleOffre": "string",
    "creator": "string",
    "description": "string",
    "image": "string",
    "jobName": "string",
    "createDate": {
        type: Date,
        default: new Date()
    },
});

const Offres = mongoose.model('offres', offreSchema);

export default Offres;