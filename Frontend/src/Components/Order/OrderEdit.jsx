import { useFormik } from "formik";
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { orderUpdateById } from "../../../utils/Api";

const OrderEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const OrderEditById =  useSelector((state) => state.val.data);
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);


  useEffect(() => {
    formik.setValues(OrderEditById);
  }, [OrderEditById]);

  if (status === "failure") {
    toast.error(error)
   } 


  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required("Customer name Required"),
    customerAddress: Yup.string().required("Customer Address Required"),
    customerMail: Yup.string().required("Customer Email Required"),
    orderStatus: Yup.string().required("Status Required Either placed or not-placed"),
  });

  const formik = useFormik({
    initialValues: {
      customerName:"",
      customerAddress:"",
      customerMail:"",
      productId:"",
      orderStatus:"",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(orderUpdateById(values.orderId,values))
      toast.success("Order Updated Successfully");
      navigate('/orderlist')
    },
  });

  const handleBack = () => {
    navigate("/orderlist");
  };


  return (
    <div>
      <div className="container mt-5">
      <h1 className="text-center" style={{color: '#fcba03'}}>Order Edit</h1>
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
              value={formik.values.orderId}
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
              disabled
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
              disabled
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
          <div class="mb-3">
            <label for="productId" class="form-label">
              Product Id
            </label>
            <input
              type="text"
              class="form-control"
              name="productId"
              placeholder="Enter Product Id"
              value={formik.values.productId}
              disabled
            />
            <br />
            <div className="text-danger">{formik.errors.productId}</div>
          </div>
          <div class="mb-3">
            <label for="orderStatus" class="form-label">
              Order Status
            </label>
            <input
              type="text"
              class="form-control"
              name="orderStatus"
              placeholder="Enter Order Status"
              value={formik.values.orderStatus}
              disabled
            />
            <br />
            <div className="text-danger">{formik.errors.orderStatus}</div>
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

export default OrderEdit;
