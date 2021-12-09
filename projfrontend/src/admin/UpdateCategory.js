import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  getCategory,
  updateCategory,
} from "./helper/adminapicall";

function UpdateCategory(props) {
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
    let categoryId = props.match.params.CategoryId;
    //Backend request fired
    updateCategory(categoryId, user._id, token, { name }) //name is passed an object as we have JSON stringified in the adminapicall.js
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
      return <h4 className="text-success">Category updated successfully !</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to update Category.</h4>;
    }
  };

  const preload = (CategoryId) => {
    getCategory(CategoryId).then((data) => {
      if (data?.error) {
        setError(data.error);
        console.log(" Data error = " + data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(props.match.params.CategoryId);
  }, []);

  const categoryForm = () => {
    return (
      <form action="">
        <div className="form-group">
          <p className="lead">Update Category</p>
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
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update Category here!"
      description="Welcome to category updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>

      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
}

export default UpdateCategory;
