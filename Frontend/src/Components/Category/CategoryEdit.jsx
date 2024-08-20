import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { categoryUpdateById } from "../../../utils/Api";

const CategoryEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CategoryEditById =  useSelector((state) => state.val.data);
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);
 
  
  useEffect(()=>{
    formik.setValues(CategoryEditById)
  },[CategoryEditById])

  if (status === "failure") {
    toast.error(error);
  }


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
        dispatch(categoryUpdateById(values.categoryId,values));
        toast.success("Category Updated Successfully")
        navigate("/categorylist")
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };
 
  const handleBack = () => {
    navigate("/orderlist");
  };
  
  return (
    <div>
      <div className="container mt-5">
      <h1 className="text-center" style={{color: '#fcba03'}}>Category Edit</h1>
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
              value={formik.values.categoryId}
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
          <div className="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary" onClick={handleBack}>
              Back
            </button>
            <button type="submit" class="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryEdit;
