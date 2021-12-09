import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setSuccess("");
    setName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //Backend request fired
    createCategory(user._id, token, { name }) //name is passed s an object as we have JSON stringified in the adminapicall.js
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setSuccess("");
          setError(true);
        } else {
          setError("");
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const goBack = () => {
    return (
      <div className="mt-5 ">
        <Link
          className="btn btn-sm btn-info mb-3"
          to="/admin/dashboard"
          href=""
        >
          Admin Home
        </Link>
      </div>
    );
  };

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success">New Category created successfully !</h4>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create a new Category.</h4>;
    }
  };
  const categoryForm = () => {
    return (
      <form action="">
        <div className="form-group">
          <p className="lead">Enter Category</p>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            className="form-control my-3"
            placeholder="For Ex. Summer"
            name=""
            id=""
            autoFocus
            required
          />
          <button onClick={handleSubmit} className="btn btn-outline-info my-2">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <Base
        title="Create a new category"
        description="Add a new category for t-shirts"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2">
            <h1>Hello</h1>
            {successMessage()}
            {warningMessage()}
            {categoryForm()}
            {goBack()}
          </div>
        </div>
      </Base>
    </div>
  );
}

export default AddCategory;
