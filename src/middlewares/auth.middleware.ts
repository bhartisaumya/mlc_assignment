import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { NextFunction } from 'express'

const signAccessToken = (userId: string) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        };
        const secret = process.env.ACCESS_TOKEN_SECRET as string;
        const options = {
            audience: userId,
            expiresIn: '6h',
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if(err)
                return reject(err)
            resolve(token)
        })
    })
}

const verifyAccessToken = (req: any, res: any, next: NextFunction) => {
    const token = req.headers?.authorization;

    if(!token)
        return next(createError.Unauthorized());

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, payload: any) => {
        if(err){
            const message = err.name == "JsonWebTokenError" ?
                        "Unauthorized" : err.message;

            return next(createError.Unauthorized(message));
        }

        req.headers.userId = payload.aud;   
        req.headers.role = payload.role         
        next();
    })
}

export default {
    verifyAccessToken,
    signAccessToken,
}