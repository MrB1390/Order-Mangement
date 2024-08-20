import React, { useEffect, useState } from "react";
import "./list.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import productImage from '../../assets/product-2.jpg'
import { fetchProduct } from "../../../utils/Api";

const ProductCart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const ProductData = useSelector((state) => state.val.data);
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);

  useEffect(() => {
    dispatch(fetchProduct())
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      newCart[productId] = (newCart[productId] || 0) + 1;
      return newCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[productId] && newCart[productId] > 0) {
        newCart[productId] -= 1;
        if (newCart[productId] === 0) {
          delete newCart[productId];
        }
      }
      return newCart;
    });
  };

  const isInCart = (productId) => {
    return cart[productId] !== undefined && cart[productId] > 0;
  };

  if (status === "loading") {
    return <div>loading....</div>;
  }

  if (!ProductData || !Array.isArray(ProductData)) {
    return <div>Loading...</div>;
  }

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return ProductData.reduce((total, item) => {
      if (cart[item.productId] && cart[item.productId] > 0) {
        return total + (item.productPrice * cart[item.productId]);
      }
      return total;
    }, 0);
  };

  const placeOrder = () => {
    navigate(`/orderadd?totalPrice=${calculateTotalPrice()}&cart=${JSON.stringify(cart)}`);
  };

  return (
    <div>
      <h1 className="text-center" style={{color: '#fcba03'}}>Product Cart</h1>
      <div className="container mt-4 p-2">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {ProductData.map((item, index) => (
            <div key={index} className="col">
              <div className="card shadow p-3 mb-5 bg-body-tertiary rounded card-val">
                <div className="rounded mx-auto d-block">
                  <img src={productImage} className="card-img" alt={item.productName} />
                </div>
                <div className="card-body d-flex flex-column align-items-center">
                  <h6 className="card-title text-center">Product Id: {item.productId}</h6>
                  <h6 className="card-title text-center">Product Name: {item.productName}</h6>
                  <p className="card-text text-center">
                    <h5>Price : Rs {item.productPrice}</h5>
                  </p>
                  {isInCart(item.productId) && (
                    <div className="border border-dark w-40 mb-2 rounded-2 d-flex justify-content-between">
                      <button className="btn btn-md" onClick={() => handleRemoveFromCart(item.productId)}>-</button>
                      <p className="mt-3">{cart[item.productId] || 0}</p>
                      <button className="btn btn-md" onClick={() => handleAddToCart(item.productId)}>+</button>
                    </div>
                  )}
                  {isInCart(item.productId) ? (
                    <button className="btn btn-md btn-danger" onClick={() => handleRemoveFromCart(item.productId)}>Remove from Cart</button>
                  ) : (
                    <button className="btn btn-md btn-success" onClick={() => handleAddToCart(item.productId)}>Add to Cart</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {Object.keys(cart).length > 0 && (
        <div className="container mt-4 p-2">
          <div className="row">
            <div className="col">
              <hr />
              <h4>Cart Summary</h4>
              <ul className="list-group">
                {ProductData.map((item, index) => (
                  cart[item.productId] && cart[item.productId] > 0 && (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {item.productName} (ID: {item.productId})
                      <span className="badge bg-primary rounded-pill">{cart[item.productId]}</span>
                    </li>
                  )
                ))}
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Total Price
                  <span className="badge bg-primary rounded-pill">Rs {calculateTotalPrice()}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <button className="btn btn-md btn-primary" onClick={placeOrder}>Place Order</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
