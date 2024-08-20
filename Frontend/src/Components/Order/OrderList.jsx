import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchOrder,
  fetchOrderById,
  fetchUserOrderById,
  orderDeleteById,
  orderStatusById,
} from "../../../utils/Api";

const OrderList = () => {
  const [rerender, setRerender] = useState(false);
  const [userType, setUserType] = useState("");
  const [userid, setUserid] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("All"); // State for delivery status filter
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.val.data);
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);
    const userId = localStorage.getItem("userId");
    setUserid(userId);

    // Ensure userId is valid before making the API call
    if (userType === "admin") {
      dispatch(fetchOrder());
    } else if (userType === "user" && userId) {
      dispatch(fetchUserOrderById(userId));
    }
  }, [dispatch, userType, userid, rerender]);

  const handleEdit = (id) => {
    dispatch(fetchOrderById(id));
    navigate("/orderedit");
  };

  const handleInvoice = (id) => {
    dispatch(fetchOrderById(id));
    navigate("/orderinvoice");
  };

  const handleDelete = (id) => {
    dispatch(orderDeleteById(id)).then(() => {
      setRerender((prevState) => !prevState);
    });
  };

  // Check if Orders is not available or not an array
  if (!orders || !Array.isArray(orders)) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  const handleDeliveryStatusChange = (id, newStatus) => {
    dispatch(orderStatusById(id, { deliveryStatus: newStatus })).then(() => {
      setRerender((prevState) => !prevState);
    });
  };

  const handleFilterChange = (event) => {
    setDeliveryFilter(event.target.value);
  };

  // Filter orders based on delivery status
  const filteredOrders =
    deliveryFilter === "All"
      ? orders
      : orders.filter((order) => order.deliveryStatus === deliveryFilter);

  return (
    <div>
      <h1 className="text-center" style={{ color: "#fcba03" }}>
        Order List
      </h1>
      <div className="p-2">
        <button
          className="btn d-flex ms-auto"
          style={{ color: "white", backgroundColor: "#0eb657" }}
          onClick={() => {
            navigate("/orderadd");
          }}
        >
          Add Order
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="deliveryFilter" className="form-label">
          Filter by Delivery Status:
        </label>
        <select
          className="form-select"
          id="deliveryFilter"
          value={deliveryFilter}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <div class="table-responsive">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Ordered Product</th>
              <th scope="col">Delivery Status</th>
              <th scope="col">Invoice</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{item.orderId}</th>
                  <td>
                    <p class="fw-normal mb-1">{item.customerName}</p>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">{item.productName}</p>
                  </td>
                  <td>
                    {" "}
                    {/* Changed to render a dropdown */}
                    <select
                      className="form-select"
                      value={item.deliveryStatus}
                      onChange={(e) =>
                        handleDeliveryStatusChange(item.orderId, e.target.value)
                      }
                      disabled={
                        userType === "user" ||
                        item.deliveryStatus === "Delivered"
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary rounded-4 btn-sm"
                      onClick={() => {
                        handleInvoice(item.orderId);
                      }}
                    >
                      Invoice
                    </button>
                  </td>
                  <td>
                    <div className="d-flex me-3">
                      <button
                        type="button"
                        class="btn btn-primary rounded-4 btn-sm"
                        onClick={() => {
                          handleEdit(item.orderId);
                        }}
                        disabled={item.deliveryStatus === "Delivered"} // Disable if delivered
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger rounded-4 btn-sm mx-2"
                        onClick={() => {
                          handleDelete(item.orderId);
                        }}
                        disabled={item.deliveryStatus === "Delivered"} // Disable if delivered
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
