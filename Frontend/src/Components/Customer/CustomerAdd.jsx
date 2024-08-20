import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { customerAdd } from "../../../utils/Api";

const CustomerAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);
  const [formSubmitted, setFormSubmitted] = useState(false); // New state to track form submission

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name Required"),
    lastName: Yup.string().required("Last name Required"),
    email: Yup.string().required("Email Required"),
    phoneNumber: Yup.string().required("Phone Number Price Required"),
    password: Yup.string().required("Password Required"),
    role: Yup.string().required("Role Required Either user or admin"),
    image: Yup.mixed().required("Customer Image Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName:"",
      lastName:"",
      email:"",
      phoneNumber:"",
      password:"",
      role:"",
      image:"",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        await dispatch(customerAdd(formData));
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
      toast.success("Customer Added Successfully");
      navigate("/customerlist");
    }
  }

  return (
    <div>
      <div className="container mt-5" style={{marginLeft:"30px"}}>
      <h1 className="text-center" style={{color: '#fcba03'}}>Customer Add</h1>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div class="mb-3">
            <label for="id" class="form-label">
              ID
            </label>
            <input
              type="text"
              class="form-control"
              id="id"
              placeholder="Enter Customer ID"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="firstName" class="form-label">
              First Name
            </label>
            <input
              type="text"
              class="form-control"
              name="firstName"
              placeholder="Enter First name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.firstName}</div>
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">
              Last Name
            </label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              placeholder="Enter Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.lastName}</div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">
              Email
            </label>
            <input
              type="text"
              class="form-control"
              name="email"
              placeholder="Enter Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.email}</div>
          </div>
          <div class="mb-3">
            <label for="phoneNumber" class="form-label">
              Phone Number
            </label>
            <input
              type="number"
              class="form-control"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.phoneNumber}</div>
          </div>
          <div class="mb-3">
            <label for="role" class="form-label">
              Role
            </label>
            <input
              type="text"
              class="form-control"
              name="role"
              placeholder="Enter Role"
              value={formik.values.role}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.role}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="text"
              class="form-control"
              name="password"
              placeholder="Enter your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <br />
            <div className="text-danger">{formik.errors.password}</div>
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

export default CustomerAdd;
