import News from '../models/newsModels.js';
import mongoose from 'mongoose'

export var getNews = async (req, res) => {
    try {

        const news = await News.find();
        res.status(200).json(news);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export var getNewsRecentNews = async (req, res) => {
    try {

        const news = await News.find().sort({_id: -1});
        res.status(200).json(news);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}


export const getNew = async (req, res) => { 
    const { id } = req.params;

    try {
        const news = await News.findById(id);
        
        res.status(200).json(news);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createNews = async (req, res) => {
    const body = req.body;
    const newNew = new News(body);

    try {

        await newNew.save();

        res.status(201).json(newNew);
        
    } catch (error) {

        res.status(404).json({ message: error.message});
        
    }
}

export const deleteNew = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await News.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const updateNews = async (req, res) => {
    const { id } = req.params;
    const { titleEvents, creator, description, image } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updateNews = { titleNews, creator, description, image , _id: id };

    await News.findByIdAndUpdate(id, updateNews, { new: true });

    res.json(updateNews);
}