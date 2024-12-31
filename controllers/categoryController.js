import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// Create Category
export const createCategorycontroller = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({ message: "Name is required" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists"
            });
        }

        const category = await new categoryModel({
            name,
            slug: slugify(name)
        }).save();
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating category"
        });
    }
};

// Update Category
export const updateCategorycontroller = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true } // Return the updated document
        );
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating category"
        });
    }
};

// Get All Categories
export const categoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All categories list",
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting categories"
        });
    }
};

// Get Single Category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Single category retrieved successfully",
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting single category"
        });
    }
};

// Delete Category
export const deleteCategorycontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting category",
            error
        });
    }
};
