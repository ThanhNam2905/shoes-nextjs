import connectDB from '../../../utils/connectDB';
import Users from '../../../models/UserModel';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
    switch(req.method) {
        case "PATCH":
            await updateUsername(req, res);
            break;
    }
}

const updateUsername = async(req, res) => {
    try {
        const result = await auth(req, res);
        const { username } = req.body;

        const newUser = await Users.findOneAndUpdate({_id: result.id}, {username}).select("-password");
        res.json({ 
            msg: "Cập nhật tên tài khoản thành công!",
            user: {
                username,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone,
                avatar: newUser.avatar
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}