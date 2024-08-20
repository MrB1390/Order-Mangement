import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customerUpdateById } from "../../../utils/Api";

const CustomerEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CustomerDataById = useSelector((state) => state.val.data);
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);

  useEffect(() => {
    formik.setValues(CustomerDataById);
  }, [CustomerDataById]);

  if (status === "failure") {
    toast.error(error);
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name Required"),
    lastName: Yup.string().required("Last Name Required"),
    email: Yup.string().required("Email Required"),
    role: Yup.string().required("Role Required either user or admin"),
    phoneNumber: Yup.string().required("Phone Number Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(customerUpdateById(values.userId, values));
      toast.success("Customer Detail Updated Successfully")
      navigate("/customerlist");
    },
  });

  const handleBack = () => {
    navigate("/customerlist");
  };

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <div>
      <div className="container mt-5">
      <h1 className="text-center" style={{color: '#fcba03'}}>Customer Edit</h1>
        <form onSubmit={formik.handleSubmit}>
          <div class="mb-3">
            <label for="id" class="form-label">
              ID
            </label>
            <input
              type="text"
              class="form-control"
              id="id"
              placeholder="Enter Customer ID"
              value={formik.values.userId}
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
              placeholder="Enter Last name"
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

export default CustomerEdit;
