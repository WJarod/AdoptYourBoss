import Offres from '../models/offreModels.js';
import mongoose from 'mongoose'

export var getOffres = async (req, res) => {
    try {

        const offres = await Offres.find();
        res.status(200).json(offres);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getOffre = async (req, res) => {
    try
    {
        const upOffre = await Offres.findById(req.params.id);
        res.status(201).json(upOffre);
        console.log(req.params.id)
    }catch (error) 
    {
        res.status(404).json({ message: error.message});
    }
}


export var getOffresRecentDate = async (req, res) => {
    try {

        const offres = await Offres.find().sort({_id: -1});
        res.status(200).json(offres);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}


export const createOffres = async (req, res) => {
    const body = req.body;
    const newOffre = new Offres(body);

    try {

        await newOffre.save();

        res.status(201).json(newOffre);
        
    } catch (error) {

        res.status(404).json({ message: error.message});
        
    }
}

export const deleteOffre = async (req, res) => {
    try
    {
        await Offres.findByIdAndDelete(req.params.id);
        res.status(201).json(req.params.id+' : supprimer');
        console.log(req.params.id+' : supprimer')
    }catch (error) 
    {
        res.status(404).json({ message: error.message});
    }
}

export const getOffresJob = async (req, res) => 
{
    try {

        const offres = await Offres.find({jobName: req.params.job}).sort({_id: -1});
        res.status(200).json(offres);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getOffresCreator = async (req, res) => 
{
    try {

        const offres = await Offres.find({creator: req.params.creator}).sort({_id: -1});
        res.status(200).json(offres);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const updateOffre = async (req, res) => {

    await Offres.findByIdAndUpdate(req.params.id, {titleOffre: req.body.titleOffre, creator: req.body.creator, description: req.body.description, image: req.body.image, jobName: req.body.jobName, id: req.params.id});

    res.status(201).json(req.params.id+' : update');

    console.log(req.params.id+' : update')

    res.json(updateOffre);
}

