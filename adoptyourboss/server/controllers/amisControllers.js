import Amis from "../models/amisModel.js"
import User from "../models/userModel.js"

export const addFriend = async (req, res) => 
{
    const body = req.body;
    const newFriend = new Amis(body);

    try {

        await newFriend.save();

        res.status(201).json(newFriend);        
    } catch (error) {

        res.status(404).json({ message: error.message});
        
    }
}

export const getFriendById = async (req, res) =>
{
    try
    {
        const friends = await Amis.find({User1: req.params.User1}).populate({path: 'User2', select:['Prénom', 'image']})
        res.status(200).json(friends);
    }catch (error)
    {
        res.status(404).json({ message: error.message});
    }
   
}

export const updateStatusAmis = async (req, res) => {

    await Amis.findByIdAndUpdate(req.params.id, {status: req.body.status});

    res.status(201).json(req.params.id+' : update');

    console.log(req.params.id+' : update')

    res.json(updateStatusAmis);
}