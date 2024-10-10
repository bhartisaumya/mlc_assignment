import express from "express";

import categoriesController from "../controllers/categories.controller"


const router = express.Router()

router.get("/", categoriesController.handelGetCategoryByParams)
router.post("/", categoriesController.handelPostCategory)
router.patch("/:id", categoriesController.handelUpdateCategory)
router.delete("/:id", categoriesController.handelDeleteCategory)

export = router