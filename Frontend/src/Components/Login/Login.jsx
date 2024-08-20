import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ice from "../../assets/ice.jpg";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email Required"),
    password: Yup.string().required("password Required"),
  });

  const formik = useFormik({
    initialValues: login,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  const loginUser = async (data) => {
    try {
      await axios
        .post(`${baseUrl}/api/login`, data, { withCredentials: true })
        .then((res) => {
          const { token } = res.data;
          const decodedToken = jwtDecode(token);
          const userType = decodedToken.role;
          const userId = decodedToken.userId;
          localStorage.setItem("userType", userType);
          localStorage.setItem("userId", userId);
          toast.success(res.data.message);
          formik.resetForm();
          navigate("/productcart");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-9">
            <div style={{color: '#fcba03'}}>
            <h1 style={{fontSize:'150px'}}>FBazar</h1>
            <h1>Heaven For Ice-Cream Lovers</h1>
            </div>
            <div className="d-flex">
              <div>
              <img src={ice} alt="Ice-Cream" width={500} height={300}/>
              </div>
              <div style={{marginTop: '50px',marginLeft: '10px'}}>
              <h1>"I scream, you scream, we all scream for ice cream!" </h1>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="login-cont">
              <div className="box-part">
                <h3 className="text-center mb-3">Login User</h3>
                <form onSubmit={formik.handleSubmit}>
                  <div class="mb-2">
                    <label for="email" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    <br />
                    <div className="text-danger">{formik.errors.email}</div>
                  </div>
                  <div class="mb-2">
                    <label for="password" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Enter your Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <br />
                    <div className="text-danger">{formik.errors.password}</div>
                  </div>
                  <div className="mb-3 ms-1">
                    <Link to="/register">Sign-Up</Link>
                  </div>
                  <div className="mb-3 ms-1">
                    <Link to="/verify">Forgot Password?</Link>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sign-in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
