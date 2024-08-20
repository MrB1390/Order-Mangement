import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { productAdd } from "../../../utils/Api";

const ProductAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);
  const [formSubmitted, setFormSubmitted] = useState(false); // New state to track form submission

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product name Required"),
    productDescription: Yup.string().required("Product Description Required"),
    productPrice: Yup.string().required("Product Price Required"),
    productStatus: Yup.string().required("Product Status Required"),
    image: Yup.mixed().required("Product Image Required"),
    categoryId: Yup.string().required("Category Required"),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productPrice: "",
      productStatus: "",
      image: "",
      categoryId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        await dispatch(productAdd(formData));
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
      toast.success("Product Added Successfully")
      navigate("/productlist");
    }
  }
  
  return (
    <div>
      <div className="container mt-5">
      <h1 className="text-center" style={{color: '#fcba03'}}>Product Add</h1>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div class="mb-3">
            <label for="id" class="form-label">
              ID
            </label>
            <input
              type="text"
              class="form-control"
              id="id"
              placeholder="Enter Product ID"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="productName" class="form-label">
              Product Name
            </label>
            <input
              type="text"
              class="form-control"
              name="productName"
              placeholder="Enter Product name"
              value={formik.values.productName}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.productName}</div>
          </div>
          <div class="mb-3">
            <label for="productDescription" class="form-label">
              Product Description
            </label>
            <input
              type="text"
              class="form-control"
              name="productDescription"
              placeholder="Enter Product Description"
              value={formik.values.productDescription}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">
              {formik.errors.productDescription}
            </div>
          </div>
          <div class="mb-3">
            <label for="productStatus" class="form-label">
              Product Status
            </label>
            <input
              type="text"
              class="form-control"
              name="productStatus"
              placeholder="Enter Product Status"
              value={formik.values.productStatus}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.productStatus}</div>
          </div>
          <div class="mb-3">
            <label for="productPrice" class="form-label">
              Product Price
            </label>
            <input
              type="number"
              class="form-control"
              name="productPrice"
              placeholder="Enter Product Price"
              value={formik.values.productPrice}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.productPrice}</div>
          </div>
          <div class="mb-3">
            <label for="categoryId" class="form-label">
              Category Id
            </label>
            <input
              type="text"
              class="form-control"
              name="categoryId"
              placeholder="Enter Category Id"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.categoryId}</div>
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

export default ProductAdd;
