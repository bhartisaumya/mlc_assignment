import express from "express";

import productsController from "../controllers/products.controller"


const router = express.Router()

// router.get("/", productsController.handelGetAllProduct)
router.get("/", productsController.handelGetProductByParams)
router.post("/", productsController.handelPostProduct)
router.patch("/:id", productsController.handelUpdateProduct)
router.delete("/:id", productsController.handelDeleteProduct)

export = router