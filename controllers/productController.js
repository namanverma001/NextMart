import { error } from "console";
import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const CreateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({
                    error: "Name is required",
                });
            case !description:
                return res.status(500).send({
                    error: "Description is required",
                });
            case !price:
                return res.status(500).send({
                    error: "Price is required",
                });
            case !category:
                return res.status(500).send({
                    error: "Category is required",
                });
            case !quantity:
                return res.status(500).send({
                    error: "Quantity is required",
                });
            case photo && photo.size > 1000000:
                return res.status(500).send({
                    error: "Photo is required and should be less than 1mb",
                });

        }
        const product = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            product,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product"
        });
    }
};

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "Products fetched successfully",
            products,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error.message,

        });
    }
};



// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category');
        res.status(200).send({
            success: true,
            message: "Single Product fetched successfully",
            product,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting single product",
            error: error.message,
        });
    }
};


// Product photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-Type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting product photo",
            error
        });
    }
};


// delete product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting product",
            error
        });
    }
};

// update product
export const upadteProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({
                    error: "Name is required",
                });
            case !description:
                return res.status(500).send({
                    error: "Description is required",
                });
            case !price:
                return res.status(500).send({
                    error: "Price is required",
                });
            case !category:
                return res.status(500).send({
                    error: "Category is required",
                });
            case !quantity:
                return res.status(500).send({
                    error: "Quantity is required",
                });
            case photo && photo.size > 1000000:
                return res.status(500).send({
                    error: "Photo is required and should be less than 1mb",
                });

        }
        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(201).send({
            success: true,
            message: "Product updated Successfully",
            product,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Update product"
        });
    }
};