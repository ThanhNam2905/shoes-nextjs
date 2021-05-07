import connectDB from '../../../utils/connectDB';
import Users from '../../../models/UserModel';
import validate from '../../../utils/validate';
import bcrypt from 'bcrypt';

connectDB();

export default async (request, response) => {
    switch(request.method) {
        case "POST": 
            await register(request, response);
            break;
    }
}

const register = async(req, res) => {
    try {
        const { username, email, phone, address, password, confirm_password } = req.body;

        const errorMsg = validate(username, email, phone, address, password, confirm_password);
        if(errorMsg) {
            return res.status(400).json({err: errorMsg});
        }

        // Check user email already exists or not
        const user = await Users.findOne({email});
        if(user) {
            return res.status(400).json({ err: "Email này đã tồn tại!"});
        }

        // hash Password by bcrypt.
        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new Users({ 
            username, 
            email, 
            phone, 
            address, 
            password: passwordHash, 
            confirm_password 
        });
        // console.log("-----> ", newUser);
        await newUser.save();
        res.json({msg: "Bạn đã đăng ký tài khoản thành công"});

    } catch (error) {
        return res.status(500).json({err: error.message});
    }
}