import connectDB from '../../../utils/connectDB';
import Users from '../../../models/UserModel';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken';

connectDB();

export default async (request, response) => {
    switch(request.method) {
        case "POST": 
            await login(request, response);
            break;
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check this user does not exists
        const user = await Users.findOne({ email })
        if(!user) {
            return res.status(400).json({err: "Email người dùng này chưa tồn tại!"});
        }
        
        // Compare Password by bcrypt.
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({err: "Mật khẩu đăng nhập không chính xác!"});
        }

        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });

        res.json({
            msg: "Đăng nhập tài khoản thành công",
            access_token,
            refresh_token,
            user: {
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role,
                avatar: user.avatar,
                root: user.root,
            }
        });

    } catch (error) {
        return res.status(500).json({err: error.message});
    }
}