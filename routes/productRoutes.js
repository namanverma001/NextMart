import express from 'express';
import { CreateProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, upadteProductController } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

// Routers
router.post('/create-product', requireSignIn, isAdmin, formidable(), CreateProductController);

//get product
router.get('/get-product', getProductController);


//single product
router.get('/single-product/:slug', getSingleProductController);



//get photo
router.get('/product-photo/:pid', productPhotoController);

//delete product
router.delete('/product/:pid', deleteProductController);

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), upadteProductController);



export default router;