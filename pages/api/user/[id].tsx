import Users from '../../../models/UserModel';
import connectDB from '../../../utils/connectDB';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
    switch(req.method) {
        case "PATCH": 
            await changeRoleUser(req, res);
            break;
        case "DELETE":
            await deleteUser(req, res);
    }
}

const changeRoleUser = async (req, res) => {
    try {
        const result = await auth(req, res);
        if(result.role !== "admin" || !result.root) {
            return res.status(400).json({ error: "Authentication is not valid"});
        }

        const { id } = req.query;
        const { role } = req.body;
        await Users.findOneAndUpdate({_id: id}, {role});
        res.json({
            msg: "Cập nhật thành công"
        });

    } catch (error) {   
        return res.status(500).json({error: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await auth(req, res);
        if(result.role !== "admin" || !result.root) {
            return res.status(500).json({ error: "Authentication is not valid"});
        }

        const { id } = req.query;
        await Users.findByIdAndDelete(id);
        res.json({
            msg: "Xoá tài khoản thành công"
        });

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}