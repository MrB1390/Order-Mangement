import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import "./App.css";
import ProductAdd from "./Components/Product/ProductAdd";
import ProductEdits from "./Components/Product/ProductEdits";
import ProductList from "./Components/Product/ProductList";
import ProductCart from "./Components/Product/ProductCart";
import CategoryAdd from "./Components/Category/CategoryAdd";
import CategoryEdit from "./Components/Category/CategoryEdit";
import CategoryList from "./Components/Category/CategoryList";
import CustomerAdd from "./Components/Customer/CustomerAdd";
import CustomerList from "./Components/Customer/CustomerList";
import CustomerEdit from "./Components/Customer/CustomerEdit";
import OrderAdd from "./Components/Order/OrderAdd";
import OrderEdit from "./Components/Order/OrderEdit";
import OrderList from "./Components/Order/OrderList";
import Login from "./Components/Login/Login";
import DataRedux from "../utils/DataRedux";
import { ToastContainer } from "react-toastify";
import Verify from "./Components/Login/Verify";
import Statistics from "./Components/Statistics";
import InvoiceDetail from "./Components/Order/InvoiceDetail";
import Reset from "./Components/Login/Reset";
import Page from "./Page";
import axios from "axios";
import Dashboard from "./Dashboard";
import Register from "./Components/Login/Register";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route
              path="/register"
              element={
                <DataRedux>
                  <Register />
                </DataRedux>
              }
            />
            <Route path="/reset" element={<Reset />} />
            <Route
              path="*"
              element={
                <DataRedux>
                  <div className="row">
                    <div className="col-lg-2">
                      <ToastContainer />
                    </div>
                    <div className="col-lg-10">
                      <Sidebar />
                      <Routes>
                        <Route path="/productadd" element={<ProductAdd />} />
                        <Route path="/productedit" element={<ProductEdits />} />
                        <Route path="/productlist" element={<ProductList />} />
                        <Route path="/productcart" element={<ProductCart />} />
                        <Route path="/categoryadd" element={<CategoryAdd />} />
                        <Route path="/categoryedit" element={<CategoryEdit />} />
                        <Route path="/categorylist" element={<CategoryList />} />
                        <Route path="/customeradd" element={<CustomerAdd />} />
                        <Route path="/customeredit" element={<CustomerEdit />} />
                        <Route path="/customerlist" element={<CustomerList />} />
                        <Route path="/orderadd" element={<OrderAdd />} />
                        <Route path="/orderedit" element={<OrderEdit />} />
                        <Route path="/orderlist" element={<OrderList />} />
                        <Route path="/orderinvoice" element={<InvoiceDetail />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<Page />} />
                      </Routes>
                    </div>
                  </div>
                </DataRedux>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
