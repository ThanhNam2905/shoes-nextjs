import connectDB from '../../../utils/connectDB';
import Categories from '../../../models/CategoryModel';
import Auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
    switch(req.method) {
        case "PUT": {
            await updateCategory(req, res);
            break;
        }
        case "DELETE": {
            await deleteCategory(req, res);
            break;
        }
    }
}

const updateCategory = async (req, res) => {
    try {
        const result = await Auth(req, res);
        if(result.role !== "admin") {
            return res.status(400).json({error: "Authentication is not valid!"});
        }

        const { id } = req.query;
        const { name } = req.body;
        const newCategory = await Categories.findOneAndUpdate({_id: id}, {name});
        res.json({
            msg: "Cập nhật danh mục sản phẩm thành công",
            category: {
                ...newCategory._doc,
                name
            }
        })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteCategory = async (req, res) => {
    try {
        const result = await Auth(req, res);
        if(result.role !== "admin") {
            return res.status(400).json({ error: "Authentication is not valid"});
        }

        const { id } = req.query;
        await Categories.findByIdAndDelete(id);
        res.json({
            msg: "Delete danh mục sản phẩm thành công"
        })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}