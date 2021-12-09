import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'


function AdminDashBoard() {
    const {user:{name,email,role}} = isAuthenticated();

    const adminLeftSide = ()=>{
        return (
            <div className="card">
                <h3 className="card-header bg-dark text-white p-2">Admin Navigation</h3>
                <ul className="list-group">
                    <li className="list-group item">
                        <Link to="/admin/create/category" className="nav-link text-info">Create Category</Link>
                    </li>
                    <li className="list-group item">
                        <Link to="/admin/categories" className="nav-link text-info">Manage   Category</Link>
                    </li>
                    <li className="list-group item">
                        <Link to="/admin/product/create" className="nav-link text-info">Create Product</Link>
                    </li>
                    <li className="list-group item">
                        <Link to="/admin/products" className="nav-link text-info">Manage Product</Link>
                    </li>
                    <li className="list-group item">
                        <Link to="/admin/orders" className="nav-link text-info">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminRightSide = ()=>{
        return (
            <div className="card mb-4">
                <h4 className="card-header">
                    Admin Information
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge bg-success mr-2">
                            Name: 
                        </span>{name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-success mr-2">
                            Email: 
                        </span>{email} 
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-danger mr-2">
                            Admin Area
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
    return (
        <Base title="AdminDashBoard Page" description="Manage all of your products here" className="container p-4 bg-info">
            <div className="row">
                <div className="col-3">
                {adminLeftSide()}
                </div>
                <div className="col-9">
                {adminRightSide()}
                </div>
            </div>

        </Base>
    )
}

export default AdminDashBoard
