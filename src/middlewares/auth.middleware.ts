import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import {Response, Request, NextFunction } from 'express'

const signAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.body?.userId

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
            throw err

        res.status(200).json({token})
    })
}

const verifyAccessToken = (req: any, res: any, next: NextFunction) => {
    const bearerToken: string = req.headers?.authorization;

    if(!bearerToken)
        return next(createError.Unauthorized());

    const token = bearerToken.split(' ')[1]

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