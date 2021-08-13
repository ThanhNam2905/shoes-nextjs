import connectDB from '../../../utils/connectDB';
import Categories from '../../../models/CategoryModel';
import Auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
    switch(req.method) {
        case "POST": {
            await createCategory(req, res);
            break;
        }
        case "GET": {
            await getCategories(req, res);
            break;
        }
    }
}

// Created Category
const createCategory = async (req, res) => {
    try {
        const result = await Auth(req, res);
        if(result.role !== "admin") {
            return res.status(400).json({error: "Authentication is not valid"});
        }
        const { name } = req.body;
        if(!name) {
            return res.status(400).json({error: "Tên danh mục sản phẩm không được để trống"});
        }
        const newCategories = new Categories({name});

        await newCategories.save();
        res.json({
            msg: "Tạo danh mục sản phẩm mới thành công",
            newCategories
        })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

// get Data Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.json({categories});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}