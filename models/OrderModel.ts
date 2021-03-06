import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    address: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    payment: {
        type: Number,
        require: true,
    },
    totalPrice: {
        type: Number,
        require: true
    },
    cart: {
        type: Array,
        require: true
    },
    delivered: {
        type: Boolean,
        default: false
    },
    statusPayment: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    },
    dateOfPayment: Date
},  {
    timestamps: true
})

let Dataset = mongoose.models.order || mongoose.model('order', orderSchema)
export default Dataset;