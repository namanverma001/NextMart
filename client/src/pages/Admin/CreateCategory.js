import React from 'react'
import Layout from '../../components/Layout/layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const CreateCategory = () => {
    return (
        <Layout title={"Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Catagory </h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
