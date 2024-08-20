import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { orderAdd } from "../../../utils/Api";

const OrderAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const totalPrice = queryParams.get('totalPrice');
  const cartString = queryParams.get("cart");
  const cart = cartString ? JSON.parse(cartString) : {}; 
  const productIds = Object.keys(cart).map(id => parseInt(id));

  
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);
  const [formSubmitted, setFormSubmitted] = useState(false); // New state to track form submission

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required("Customer name Required"),
    customerAddress: Yup.string().required("Customer Address Required"),
    customerMail: Yup.string().required("Customer Email Required"),
  });

  const formik = useFormik({
    initialValues: {
      customerName:"",
      customerAddress:"",
      customerMail:"",
      productId: productIds,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Add totalPrice and cart to values object
        values.totalPrice = totalPrice;
        await dispatch(orderAdd(values));
        setFormSubmitted(true); // Set formSubmitted to true on successful submission
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  if (formSubmitted) {
    if (status === "failure") {
      toast.error(error); // Display error message
    } else if (status === "success") {
      // Redirect or handle success scenario
      toast.success("Order Placed Successfully");
      navigate("/orderlist");
    }
  }

  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center" style={{color: '#fcba03'}}>Order Add</h1>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div class="mb-3">
            <label for="id" class="form-label">
              ID
            </label>
            <input
              type="text"
              class="form-control"
              id="id"
              placeholder="Enter Order ID"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="customerName" class="form-label">
              Customer Name
            </label>
            <input
              type="text"
              class="form-control"
              name="customerName"
              placeholder="Enter Customer name"
              value={formik.values.customerName}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.customerName}</div>
          </div>
          <div class="mb-3">
            <label for="customerMail" class="form-label">
              Customer Mail
            </label>
            <input
              type="text"
              class="form-control"
              name="customerMail"
              placeholder="Enter Customer Mail"
              value={formik.values.customerMail}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.customerMail}</div>
          </div>
          <div class="mb-3">
            <label for="customerAddress" class="form-label">
              Customer Address
            </label>
            <input
              type="text"
              class="form-control"
              name="customerAddress"
              placeholder="Enter Customer Address"
              value={formik.values.customerAddress}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.customerAddress}</div>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderAdd;
