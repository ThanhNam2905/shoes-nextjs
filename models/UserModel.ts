import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    root: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('user', userSchema);
export default Dataset;