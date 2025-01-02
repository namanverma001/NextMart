import express from 'express';
import { CreateProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, upadteProductController, productFiltersController, productCountController, productListController } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

// Routers
router.post('/create-product', requireSignIn, isAdmin, formidable(), CreateProductController);

//get product
router.get('/get-product', getProductController);


//single product
router.get('/get-product/:slug', getSingleProductController);



//get photo
router.get('/product-photo/:pid', productPhotoController);

//delete product
// Backend API route to delete a product
router.delete('/delete-product/:pid', deleteProductController);

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), upadteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

export default router;