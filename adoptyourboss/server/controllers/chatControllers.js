import Chat from "../models/chatModel.js"


export const getMessage = async (req, res) => 
{
    try
    {
        const message = await Chat.find()
        res.status(200).json(message);
    }catch (error)
    {
        res.status(404).json({ message: error.message});
    }
}

export const addMessage = async (req, res) => 
{
    const body = req.body;
    const newMessage = new Chat(body);

    try {

        await newMessage.save();
        res.status(201).json(newMessage);        
    } catch (error) {

        console.log(error);
        res.status(404).json({ message: error.message});
        
    }
}