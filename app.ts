import express, {Request, Response, NextFunction} from 'express'
import * as dotenv from 'dotenv';
// import cors from 'cors';

dotenv.config();

import './src/helper/connectingToDB'


import productRoute from './src/routes/products.routes'
import categoryRoute from './src/routes/categories.routes'
import filterRoute from './src/routes/filter.routes'



import authMiddlewares from './src/middlewares/auth.middleware';


const app: express.Application = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}));

// app.use(authMiddlewares.verifyAccessToken)

// app.use('/', (req, res) => {
//     console.log(req.body)
//     res.send({val: req.body})
// })

app.use('/products', productRoute)
app.use('/categories', categoryRoute)

app.use('/filter', filterRoute)


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