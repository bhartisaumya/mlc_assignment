import express, {Request, Response, NextFunction} from 'express'
import * as dotenv from 'dotenv';
// import cors from 'cors';

dotenv.config();

import './src/helper/connectingToDB'

// console.log(Date())


import productRoute from './src/routes/products.routes'
import categoryRoute from './src/routes/categories.routes'

import authMiddlewares from './src/middlewares/auth.middleware';


const app: express.Application = express();

app.use(authMiddlewares.verifyAccessToken)

app.use('/products', productRoute)
app.use('/categories', categoryRoute)


// error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    })
})




app.listen(3000, () => {
    console.log("Listening on port 3000...")
})