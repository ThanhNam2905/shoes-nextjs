import Users from '../../../models/UserModel';
import connectDB from '../../../utils/connectDB';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
    switch(req.method) {
        case "GET": 
            await getUsers(req, res);
            break;
    }
}

const getUsers = async (req, res) => {
    try {
        const result = await auth(req, res);
        if(result.role !== "admin") {
            return res.status(400).json({ error: "Authentication is not valid"});
        }

        const users = await Users.find().select('-password');
        res.json({ users });

    } catch (error) {   
        return res.status(500).json({error: error.message});
    }
}