import express from "express";

import categoriesController from "../controllers/products.controller"


const router = express.Router()

router.get("/", categoriesController.handelGetProductByParams)
router.post("/", categoriesController.handelPostProduct)
router.patch("/:id", categoriesController.handelUpdateProduct)
router.delete(":id", categoriesController.handelDeleteProduct)

export = router