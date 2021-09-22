import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    "Nom": String,
    "Prénom": String,
    "job": String,
    "adresse": String,
    "CplAdresse": String,
    "CP": String,
    "Ville": String,
    "Tel": String,
    "Email": String,
    "MDP": String,
    "Roles": String,
    "siret": String,
    "NomEntreprise" : String,
    "image": String,
    "createDate": {
        type: Date,
        default: new Date()
    },
    "status": {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: "pending"
    }
});

const User = mongoose.model('users', userSchema);

export default User;