import mongoose from "mongoose"
import encrypt from "../utils/encryption"

export interface User {
    fullName: string,
    username: string,
    password: string,
    email: string,
    profilPicture: string,
    role: string,
    isActive: boolean,
    activationCode: string
}

const Schema = mongoose.Schema

const userSchema = new Schema<User>({
    fullName: {
        type: Schema.Types.String,
        required: true
    },
    username: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    profilPicture: {
        type: Schema.Types.String,
        default: "user.jpg"
    },
    role: {
        type: Schema.Types.String,
        enum: ["admin", "user"],
        default: "user"
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: false
    },
    activationCode: {
        type: Schema.Types.String
    }
}, {
    timestamps: true
})

userSchema.pre('save', function(next) {
    const user = this

    user.password = encrypt(user.password)
    next();
});

userSchema.methods.toJSON = function (){
    const user = this.toObject()
    delete user.password

    return user
}

const UserModel = mongoose.model('User', userSchema)

export default UserModel