import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategorycontroller = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists"
            })
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
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating category"
        });
    }
};


// update category
export const updateCategorycontroller = async (req, res) => {
    try {
        const { name } = req.body.name;
        const { id } = req.params;
        const category = await categoryModel.findByIdandUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating category"
        });
    }


};

//get all categories
export const categoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All categories list",
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting categories"
        });
    }
};

//Single category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: " get Single category success ",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting single category"
        });
    }
};

//delete category
export const deleteCategorycontroller = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting category",
            error

        });
    }
};