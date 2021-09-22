import User from '../models/userModel.js'
import mongoose from 'mongoose'

export var getUsers = async (req, res) => {
    try {

        const users = await User.find();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getUser = async (req, res) => {
    try
    {
        const upUser = await User.findById(req.params.id);
        res.status(201).json(upUser);
    }catch (error) 
    {
        res.status(404).json({ message: error.message});
    }
}

export const createUsers = async (req, res) => {
    const body = req.body;
    const newUser = new User(body);

    try {

        await newUser.save();

        res.status(201).json(newUser);
        
    } catch (error) {

        res.status(404).json({ message: error.message});
        
    }
}


export const getUserConnexion = async (req, res) => 
{
    const { Email, MDP} = req.body;
    try 
    {
        const user = await User.findOne({ Email: Email, MDP: MDP});
        if (user == null)
        {
            return res.send("Email ou Mot de passe incorect")
        }else
        {
            res.status(200).json(user)
        }
    }catch (error) 
    {
        res.status(404).json({ message: error.message});

    }
}

export const deleteUser = async (req, res) => {
    try
    {
        await User.findByIdAndDelete(req.params.id);
        res.status(201).json(req.params.id+' : supprimer');
        console.log(req.params.id+' : supprimer')
    }catch (error) 
    {
        res.status(404).json({ message: error.message});
    }
}

export const updateUser = async (req, res) => {

    await User.findByIdAndUpdate(req.params.id, {Nom: req.body.Nom, Prénom: req.body.Prénom, job: req.body.job, image: req.body.image, adresse: req.body.adresse, CplAdresse: req.body.CplAdresse, CP: req.body.cp, Ville: req.body.Ville, Tel: req.body.tel, Email: req.body.Email, Motdepasse: req.body.mdp, Siret: req.body.siret, NomEntreprise: req.body.NomEntreprise, image: req.body.image});

    res.status(201).json(req.params.id+' : update');

    console.log(req.params.id+' : update')

    res.json(updateUser);
}

export const getUsersJob = async (req, res) =>
{
    try {
        const usersJob = await User.find({job: req.params.job, Roles: "candidat"});
        res.status(200).json(usersJob);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const updateStatus = async (req, res) => {

    await User.findByIdAndUpdate(req.params.id, {status: req.body.status});

    res.status(201).json(req.params.id+' : update');

    console.log(req.params.id+' : update')

    res.json(updateStatus);
}