import express from 'express';
import { isAdmin, requireSignIn } from './../middleware/authMiddleware.js';
import { categoryController, createCategorycontroller, deleteCategorycontroller, singleCategoryController, updateCategorycontroller } from '../controllers/categoryController.js';

const router = express.Router();

// Routers
//create category
router.post('/create-category', requireSignIn, isAdmin, createCategorycontroller);


//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategorycontroller);


//get all categories
router.get('/get-categories', categoryController)


//single category
router.get('/get-category/:slug', singleCategoryController)

//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategorycontroller)






export default router;
