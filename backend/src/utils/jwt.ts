import { User } from '../models/user.model'
import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import {SECRET} from './env'

export interface IUserToken extends Omit<User, 
    "activationCode" | "password" |"isActive" | "username" | "email" | "profilPicture" | "fullName"
>{
    id?: Types.ObjectId
}

export function generateToken(user: IUserToken) :string {
    const token = jwt.sign(user, SECRET, {
        expiresIn: '1h'
    })

    return token
}

export function getUserData(token: string) {
    const user = jwt.verify(token, SECRET) as IUserToken
        
    return user
}