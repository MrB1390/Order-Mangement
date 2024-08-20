import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { categoryAdd } from "../../../utils/Api";

const CategoryAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);
  const [formSubmitted, setFormSubmitted] = useState(false); // New state to track form submission

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Category name Required"),
    image: Yup.mixed().required("Category Image Required"),
  });

  const formik = useFormik({
    initialValues: {
      categoryName:"",
      image:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        await dispatch(categoryAdd(formData));
        setFormSubmitted(true); // Set formSubmitted to true on successful submission
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };
  if (formSubmitted) {
    if (status === "failure") {
      toast.error(error); // Display error message
    } else if (status === "success") {
      // Redirect or handle success scenario
      toast.success("Category Added Successfully")
      navigate("/categorylist");
    }
  }
  
  return (
    <div>
      <div className="container mt-5">
      <h1 className="text-center" style={{color: '#fcba03'}}>Category Add</h1>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div class="mb-3">
            <label for="id" class="form-label">
              ID
            </label>
            <input
              type="text"
              class="form-control"
              id="id"
              placeholder="Enter Category ID"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="categoryName" class="form-label">
              Category Name
            </label>
            <input
              type="text"
              class="form-control"
              name="categoryName"
              placeholder="Enter Category name"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.categoryName}</div>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">
              Choose Image
            </label>
            <input
              type="file"
              class="form-control"
              id="image"
              onChange={handleImageChange}
            />
            <br />
            <div className="text-danger">{formik.errors.image}</div>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryAdd;
