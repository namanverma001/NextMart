import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updateName, setUpdateName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", { name });
            if (data.success) {
                toast.success(`${name} is created successfully`);
                setName("");
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error in creating category");
        }
    };

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-categories");
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            toast.error("Error in getting all categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updateName });
            if (data.success) {
                toast.success(`${updateName} is updated successfully`);
                setVisible(false);
                setUpdateName("");
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error in updating category");
        }
    };

    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`);
            if (data.success) {
                toast.success("Category deleted successfully");
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error in deleting category");
        }
    };

    return (
        <Layout title={"Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Categories</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary ms-2"
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdateName(c.name);
                                                        setSelected(c);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => handleDelete(c._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal open={visible} footer={null} onCancel={() => setVisible(false)}>
                            <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
