import React from 'react'
import { BrowserRouter , Switch , Route} from 'react-router-dom'
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import UpdateCategory from './admin/UpdateCategory';
import UpdateProduct from './admin/UpdateProduct';
import AdminRoute from './auth/helper/AdminRoute';
import PrivateRoute from './auth/helper/PrivateRoute';
import Cart from './core/Cart';
import Home from './core/Home';
import AdminDashBoard from './user/AdminDashBoard';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashBoard from './user/UserDashBoard';


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <Route path="/cart" exact component={Cart}></Route>
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/categories" exact component={ManageCategories} />
                <AdminRoute path="/admin/product/create" exact component={AddProduct} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:ProductId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/category/update/:CategoryId" exact component={UpdateCategory} />


            </Switch>
        </BrowserRouter>
    )
}

export default Routes
