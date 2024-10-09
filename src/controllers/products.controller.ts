import { NextFunction, Request, Response } from "express"
import createError from "http-errors";
import productModel from "../model/products.models"


 const handelPostProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productData = req.body;
        productData.created_at = Date()

        const savedProduct = new productModel(productData)
        await savedProduct.save()     

        res.status(201).send({
            message: "Product Added..."
        })
    } catch (error) {
        next(error)
    }
}

const handelGetProductByParams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query

        const productDetails = await productModel.find(query)

        if(!productDetails){
            throw createError.NotFound("Product not found...")
        }
        res.status(200).send(productDetails)
    } catch (error) {
        next(error)
    }
}

 const handelUpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id
        const newProductData = req.body
        await productModel.findByIdAndUpdate(productId, {$set: newProductData})

        res.status(201).send({
            message: "Product updated successfully..."
        })
    } catch (error) {
        next(error)
    }
}

const handelDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id
        const deletedProduct = await productModel.findByIdAndDelete(productId)

        if(deletedProduct?.id == productId)
            res.status(201).send({
                message: "Product Deleted successfully..."
            })
        else
            throw createError.NotFound("Invalid ProductId...")
        
    } catch (error) {
        
    }
}

export default {
    handelGetProductByParams,
    handelUpdateProduct,
    handelPostProduct,
    handelDeleteProduct
}