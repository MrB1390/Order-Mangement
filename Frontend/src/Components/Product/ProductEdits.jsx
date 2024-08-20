import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productUpdateById } from "../../../utils/Api";

const ProductEdits = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ProductDataById = useSelector((state) => state.val.data);
    const status = useSelector((state) => state.val.status);
    const error = useSelector((state) => state.val.error);

    useEffect(()=>{
        formik.setValues(ProductDataById)
    },[ProductDataById])

    if (status === "failure") {
       toast.error(error)
      } 


      const validationSchema = Yup.object().shape({
        productName: Yup.string().required("Product name Required"),
        productDescription: Yup.string().required("Product Description Required"),
        productPrice: Yup.string().required("Product Price Required"),
        productStatus: Yup.string().required("Product Status Required"),
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
         dispatch(productUpdateById(values.productId,values))
         navigate('/productlist')
        },
      });
    
      const handleBack = () =>{
        navigate('/productlist')
      }

      const handleImageChange = (event) => {
        formik.setFieldValue("image", event.currentTarget.files[0]);
      };

  return (
    <div>
      <div className="container mt-5">
      <h1 className="text-center" style={{color: '#fcba03'}}>Product Edit</h1>
        <form onSubmit={formik.handleSubmit} >
          <div class="mb-3">
            <label for="id" class="form-label">
              ID
            </label>
            <input
              type="text"
              class="form-control"
              id="id"
              placeholder="Enter Product ID"
              value={formik.values.productId}
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

export default ProductEdits;
