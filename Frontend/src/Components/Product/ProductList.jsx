import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProduct,
  fetchProductById,
  productDeleteById,
} from "../../../utils/Api";

const ProductList = () => {
  const [rerender, setRerender] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.val.data);
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch, rerender]);

  const handleEdit = (id) => {
    dispatch(fetchProductById(id));
    navigate("/productedit");
  };

  const handleDelete = (id) => {
    dispatch(productDeleteById(id)).then(() => {
      setRerender((prevState) => !prevState);
    });
  };

  // Check if products is not available or not an array
  if (!products || !Array.isArray(products)) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  return (
    <div>
      <h1 className="text-center" style={{ color: "#fcba03" }}>
        Product List
      </h1>
      <div className="p-2">
        <button
          className="btn d-flex ms-auto"
          style={{ color: "white", backgroundColor: "#0eb657" }}
          onClick={() => {
            navigate("/productadd");
          }}
        >
          Add Product
        </button>
      </div>
      <div class="table-responsive">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr>
              <th scope="col">Product Id</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <th scope="row">{item.productId}</th>
                    <td>
                      <img
                        src={item.image}
                        alt={item.productName}
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "20px",
                        }}
                      />
                    </td>
                    <td>
                      <p class="fw-normal mb-1">{item.productName}</p>
                    </td>
                    <td>
                      <div className="d-flex me-3">
                        <button
                          type="button"
                          class="btn btn-primary rounded-4 btn-sm"
                          onClick={() => {
                            handleEdit(item.productId);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger rounded-4 btn-sm mx-2"
                          onClick={() => {
                            handleDelete(item.productId);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
