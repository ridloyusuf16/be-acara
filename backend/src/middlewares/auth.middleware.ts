import { Request, Response, NextFunction } from "express"
import { IUserToken, getUserData } from '../utils/jwt'

export interface IUserReq extends Request {
    user?: IUserToken
}

export default (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers?.authorization

    if(!authorization){
        return res.status(403).json({
            message: 'Unauthorized.',
            data: null
        })
    }

    const [prefix, accessToken] = authorization.split(" ")

    if(!(prefix === 'Bearer' && accessToken)){
        return res.status(403).json({
            message: 'Unauthorized.',
            data: null
        })
    }

    const user = getUserData(accessToken)

    if(!user){
        return res.status(403).json({
            message: 'Unauthorized.',
            data: null
        })
    }

    (req as IUserReq).user = user

    next()
}