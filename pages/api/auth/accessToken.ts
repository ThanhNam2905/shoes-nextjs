import connectDB from '../../../utils/connectDB'
import Users from '../../../models/UserModel';
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../../../utils/generateToken'

connectDB()

export default async (req, res) => {
    try{
        const refresh_token = req.cookies.refreshtoken;
        if(!refresh_token) return res.status(400).json({err: 'Xin vui lòng đăng nhập ngay bây giờ.'})

        const result = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
        if(!result) return res.status(400).json({err: 'Mã thông báo của bạn không chính xác hoặc đã hết hạn.'})

        const user = await Users.findById(result.id)
        if(!user) return res.status(400).json({err: 'Người dùng này không tồn tại.'})

        const access_token = createAccessToken({id: user._id})
        res.json({
            access_token,
            user: {
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role,
                avatar: user.avatar,
                root: user.root,
            }
        })
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}