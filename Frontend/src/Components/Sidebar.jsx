import React, { useState, useEffect } from "react";
import toggle from "../assets/icons8-market-square-64.png";
import productImg from "../assets/icons8-products-50.png";
import categoryImg from "../assets/icons8-category-50.png";
import orderImg from "../assets/icons8-truck-50.png";
import dashImg from "../assets/icons8-dashboard-64.png"
import custImg from "../assets/icons8-customers-50.png";
import "./Sidebar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Sidebar = () => {
  const [showNames, setShowNames] = useState(false);
  const [userType, setUserType] = useState("");

  const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
  const navigate = useNavigate();
  const logOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/api/logout`,
        {},
        { withCredentials: true }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);
    setShowNames(!showNames)
  }, []);

  const toggleNames = () => {
    setShowNames(!showNames);
  };

  return (
    <div>
      <div className="sidebar">
        <button
          className="btn mb-3 fw-bold"
          type="button"
          aria-label="Toggle navigation"
          onClick={toggleNames} // Toggle visibility of names
        >
          <div className="d-flex">
            <img src={toggle} alt="crown" width={"50vw"} height={"20%"} />
            {showNames && (
              <p className="p-1 mx-2">
                <Link
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "30px",
                  }}
                >
                  {" "}
                  FBazar{" "}
                </Link>
              </p>
            )}
          </div>
        </button>
        <ul className="nav flex-column ms-2">
          {userType === "admin" && (
            <>
              <li className="nav-item mb-2" style={{marginLeft: "12px"}}>
                <div className="d-flex">
                  <img
                    src={dashImg}
                    alt="product"
                    width={"33vw"}
                    height={"20%"}
                  />
                  {showNames && (
                    <p className="p-1 mx-2">
                      <Link
                        to="/dashboard"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                      >
                        Dashboard
                      </Link>
                    </p>
                  )}
                  <span className="arrow icofont-rounded-down ms-auto text-end fs-5"></span>
                </div>
              </li>
              <li className="nav-item mb-1">
                <button
                  className="btn  fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-product"
                  aria-expanded="false"
                >
                  <div className="d-flex">
                    <img
                      src={productImg}
                      alt="product"
                      width={"30vw"}
                      height={"20%"}
                    />
                    {showNames && <p className="p-1 mx-2">Products</p>}
                    <span className="arrow icofont-rounded-down ms-auto text-end fs-5"></span>
                  </div>
                </button>
                {showNames && (
                  <ul className="sub-menu collapse" id="menu-product">
                    <li>
                      <Link
                        to="/productadd"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Product Add
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/productedit"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Product Edit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/productlist"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Product List
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/productcart"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Product Cart
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item mb-1">
                <button
                  className="btn fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-category"
                  aria-expanded="false"
                >
                  <div className="d-flex">
                    <img
                      src={categoryImg}
                      alt="category"
                      width={"30vw"}
                      height={"20%"}
                    />
                    {showNames && <p className="p-1 mx-2">Categories</p>}
                    <span className="arrow icofont-rounded-down ms-auto text-end fs-5"></span>
                  </div>
                </button>
                {showNames && (
                  <ul className="sub-menu collapse" id="menu-category">
                    <li>
                      <Link
                        to="/categoryadd"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Category Add
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/categoryedit"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Category Edit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/categorylist"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Category List
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item mb-1">
                <button
                  className="btn fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-customer"
                  aria-expanded="false"
                >
                  <div className="d-flex">
                    <img
                      src={custImg}
                      alt="customer"
                      width={"30vw"}
                      height={"20%"}
                    />
                    {showNames && <p className="p-1 mx-2">Customers</p>}
                    <span className="arrow icofont-rounded-down ms-auto text-end fs-5"></span>
                  </div>
                </button>
                {showNames && (
                  <ul className="sub-menu collapse" id="menu-customer">
                    <li>
                      <Link
                        to="/customeradd"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Customer Add
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/customeredit"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Customer Edit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/customerlist"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Customer List
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item mb-2">
                <button
                  className="btn fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-order"
                  aria-expanded="false"
                >
                  <div className="d-flex">
                    <img
                      src={orderImg}
                      alt="Orders"
                      width={"30vw"}
                      height={"20%"}
                    />
                    {showNames && <p className="p-1 mx-2">Orders</p>}
                    <span className="arrow icofont-rounded-down ms-auto text-end fs-5"></span>
                  </div>
                </button>
                {showNames && (
                  <ul className="sub-menu collapse" id="menu-order">
                    <li>
                      <Link
                        to="/orderadd"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Order Add
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orderedit"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Order Edit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orderlist"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Order List
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
          {userType === "user" && (
            <>
              <li className="nav-item mb-1">
                <button
                  className="btn  fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-product"
                  aria-expanded="false"
                >
                  <div className="d-flex">
                    <img
                      src={productImg}
                      alt="product"
                      width={"30vw"}
                      height={"20%"}
                    />
                    {showNames && <p className="p-1 mx-2">Products</p>}
                    <span className="arrow icofont-rounded-down ms-auto text-end fs-5"></span>
                  </div>
                </button>
                {showNames && (
                  <ul className="sub-menu collapse" id="menu-product">
                    <li>
                      <Link
                        to="/productcart"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Product Cart
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item mb-2">
                <button
                  className="btn fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-order"
                  aria-expanded="false"
                >
                  <div className="d-flex">
                    <img
                      src={orderImg}
                      alt="Orders"
                      width={"30vw"}
                      height={"20%"}
                    />
                    {showNames && <p className="p-1 mx-2">Orders</p>}
                    <span className="arrow icofont-rounded-down ms-auto text-end fs-5"></span>
                  </div>
                </button>
                {showNames && (
                  <ul className="sub-menu collapse" id="menu-order">
                    <li>
                      <Link
                        to="/orderadd"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Order Add
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orderedit"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Order Edit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orderlist"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "15px",
                        }}
                      >
                        Order List
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
          {showNames && (
            <li className="nav-item mb-1 ms-2">
              <button className="btn btn-success" onClick={logOut}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
