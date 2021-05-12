import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        code: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        infoProduct: {
            type: String,
            require: true,
        },
        category: {
            type: String,
            require: true,
        },
        sizes: {
            type: Array,
            require: true,
        },
        productLine: {
            type: String,
            require: true,
        },
        material: {
            type: String,
            require: true,
        },
        gender: {
            type: String,
            require: true,
        },
        tagProduct: {
            type: Array,
            require: true,
        },
        accessories: {
            type: String,
            require: true,
        },
        images: {
            type: Array,
            require: true,
        },
        imagesFeedBack: {
            type: Array,
            require: true,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        price: {
            type: Number,
            require: true,
        },
        discount: {
            type: Number,
            require: true,
        },
        inStock: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        created_at:{ type: Date },
        updated_at:{ type: Date, default: Date.now },
    },
    { timestamps: true }
)

let Dataset = mongoose.models.product || mongoose.model('product', ProductSchema)
export default Dataset