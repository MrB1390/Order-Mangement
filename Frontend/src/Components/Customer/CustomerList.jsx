import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customerDeleteById, fetchCustomer, fetchCustomerById } from "../../../utils/Api";

const CustomerList = () => {
  const [rerender, setRerender] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customers = useSelector((state) => state.val.data);
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);

  useEffect(() => {
    dispatch(fetchCustomer());
  }, [dispatch, rerender]);

  const handleEdit = (id) => {
    dispatch(fetchCustomerById(id));
    navigate("/customeredit");
  };

  const handleDelete = (id) => {
    dispatch(customerDeleteById(id)).then(() => {
      setRerender((prevState) => !prevState);
    });
  };

   // Check if products is not available or not an array
   if (!customers || !Array.isArray(customers)) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  return (
    <div>
      <h1 className="text-center" style={{color: '#fcba03'}}>Customer List</h1>
      <div className="p-2">
      <button className="btn d-flex ms-auto" style={{color:"white",backgroundColor:"#0eb657"}} onClick={()=>{
        navigate('/customeradd')
      }}>
        Add Customer
      </button>
      </div>
      <div class="table-responsive">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr>
              <th scope="col">Customer Id</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <th scope="row">{item.userId}</th>
                    <td>
                    <img
                            src={item.image}
                            alt={item.firstName}
                            style={{
                              width: "45px",
                              height: "45px",
                              borderRadius: "20px",
                            }}
                          />
                    </td>
                    <td>
                      <p class="fw-normal mb-1">{item.firstName}{item.lastName}</p>
                    </td>
                    <td>
                      <p class="fw-normal mb-1">{item.role}</p>
                    </td>
                    <td>
                      <div className="d-flex me-3">
                        <button
                          type="button"
                          class="btn btn-primary rounded-4 btn-sm"
                          onClick={() => {
                            handleEdit(item.userId);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger rounded-4 btn-sm mx-2"
                          onClick={() => {
                            handleDelete(item.userId);
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

export default CustomerList;
