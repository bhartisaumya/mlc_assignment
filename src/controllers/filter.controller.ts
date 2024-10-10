import {Request, Response, NextFunction} from 'express'
import categoriesModel from '../model/categories.models'
import ProductModel from '../model/products.models'
import mongoose from 'mongoose'




const prouductMappedToCategory = async (categoryId: mongoose.Schema.Types.ObjectId): Promise<any[]> => {

    const product = await ProductModel.find({category_id : categoryId})

    return product;
}

 

const handelGetProductByCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = req.query?.category

        if (!categories) {
            res.status(400).json({ message: 'Category is required' });
        }

        const categoryList = Array.isArray(categories) ? categories : [categories];

        const productPromises = categoryList.map(async (name) => {
            const category = await categoriesModel.findOne({ name });

            if (!category) {
                return [];
            }


            return await prouductMappedToCategory(category.id);
        });

        const productsArray = await Promise.all(productPromises);

        const requiredProducts = productsArray.flat();

        res.status(200).json(requiredProducts);
        
    } catch (error) {
        next(error)
    }
} 



export default {
    handelGetProductByCategories
}