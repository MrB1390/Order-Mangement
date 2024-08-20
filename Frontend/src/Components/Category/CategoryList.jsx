import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  categoryDeleteById, fetchCategory, fetchCategoryById, fetchOrder, fetchOrderById, orderDeleteById } from "../../../utils/Api";

const CategoryList = () => {
  const [rerender, setRerender] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.val.data);
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch, rerender]);

  const handleEdit = (id) => {
    dispatch(fetchCategoryById(id));
    navigate("/categoryedit");
  };

  const handleDelete = (id) => {
    dispatch(categoryDeleteById(id)).then(() => {
      setRerender((prevState) => !prevState);
    });
  };

   // Check if products is not available or not an array
   if (!categories || !Array.isArray(categories)) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  return (
    <div>
       <h1 className="text-center" style={{color: '#fcba03'}}>Category List</h1>
      <div className="p-2">
      <button className="btn d-flex ms-auto" style={{color:"white",backgroundColor:"#0eb657"}} onClick={()=>{
        navigate('/categoryadd')
      }}>
        Add Category
      </button>
      </div>
      <div class="table-responsive">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr>
              <th scope="col">Category Id</th>
              <th scope="col">Category Image</th>
              <th scope="col">Category Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <th scope="row">{item.categoryId}</th>
                    <td>
                    <img
                            src={item.categoryImage}
                            alt={item.categoryName}
                            style={{
                              width: "45px",
                              height: "45px",
                              borderRadius: "20px",
                            }}
                          />
                    </td>
                    <td>
                    <p class="fw-normal mb-1">{item.categoryName}</p>
                    </td>
                    <td>
                      <div className="d-flex me-3">
                        <button
                          type="button"
                          class="btn btn-primary rounded-4 btn-sm"
                          onClick={() => {
                            handleEdit(item.categoryId);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger rounded-4 btn-sm mx-2"
                          onClick={() => {
                            handleDelete(item.categoryId);
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

export default CategoryList;
