import connectDB from '../../../utils/connectDB';
import Users from '../../../models/UserModel';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
    switch(req.method) {
        case "PATCH":
            await uploadAvatar(req, res);
            break;
    }
}

const uploadAvatar = async (req, res) => {
    try {
        const result = await auth(req, res);
        const { avatar } = req.body;

        const newUser = await Users.findOneAndUpdate({_id: result.id}, {avatar}).select("-password");
        res.json({
            msg: "Cập nhật ảnh đại diện thành công!",
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone,
                avatar
            }
        })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}