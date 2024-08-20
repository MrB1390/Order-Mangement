import axios from "axios";
import { catDataAddFailure, catDataAddSuccess, catDataDeleteFailure, catDataDeleteSuccess, catDataEditFailure, catDataEditSuccess, catDataFetch, catDataFetchByIdFailure, catDataFetchByIdSuccess, catDataFetchFailure, catDataFetchSuccess, countDataFetch, countDataSuccess, custDataAddFailure, custDataAddSuccess, custDataDeleteFailure, custDataDeleteSuccess, custDataEditFailure, custDataEditSuccess, custDataFetch, custDataFetchByIdFailure, custDataFetchByIdSuccess, custDataFetchFailure, custDataFetchSuccess, ordDataAddFailure, ordDataAddSuccess, ordDataDeleteFailure, ordDataDeleteSuccess, ordDataEditFailure, ordDataEditSuccess, ordDataFetch, ordDataFetchByIdFailure, ordDataFetchByIdSuccess, ordDataFetchFailure, ordDataFetchSuccess, ordStatusEditFailure, ordStatusEditSuccess, prdDataAddFailure, prdDataAddSuccess, prdDataDeleteFailure, prdDataDeleteSuccess, prdDataEditFailure, prdDataEditSuccess, prdDataFetch, prdDataFetchByIdFailure, prdDataFetchByIdSuccess, prdDataFetchFailure, prdDataFetchSuccess, registerAddFailure, registerAddSuccess, userOrdDataFetchByIdFailure, userOrdDataFetchByIdSuccess } from "./OrdSlice"


const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

// function returns another call back function while using redux

// For Products 
export const fetchProduct = () => async(dispatch) => {
    dispatch(prdDataFetch());
    try {
        const res = await axios.get(`${baseUrl}/apiProduct/getProduct`,{withCredentials: true});
        dispatch(prdDataFetchSuccess(res.data.data))
    } catch (error) {
        dispatch(prdDataFetchFailure(error.response.data.message))
    }
}

export const productAdd = (data) => async(dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/apiProduct/product`,data,{withCredentials: true});
        dispatch(prdDataAddSuccess(res.data))
    } catch (error) {
        dispatch(prdDataAddFailure(error.response.data.message))
    }
}

export const fetchProductById = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/apiProduct/${id}`,{withCredentials: true});
        dispatch(prdDataFetchByIdSuccess(res.data.data))
    } catch (error) {
        dispatch(prdDataFetchByIdFailure(error.response.data.message))
    }
}

export const productUpdateById = (id,data) => async(dispatch) => {
    try {
        const res = await axios.put(`${baseUrl}/apiProduct/edit/${id}`,data,{withCredentials: true});
        dispatch(prdDataEditSuccess(res.data))
    } catch (error) {
        dispatch(prdDataEditFailure(error.response.data.message))
    }
}

export const productDeleteById = (id) => async(dispatch) => {
    try {
        const res = await axios.delete(`${baseUrl}/apiProduct/delete/${id}`,{withCredentials: true});
        dispatch(prdDataDeleteSuccess(res.data))
    } catch (error) {
        dispatch(prdDataDeleteFailure(error.response.data.message))
    }
}

//For Category
export const fetchCategory = () => async(dispatch) => {
    dispatch(catDataFetch());
    try {
        const res = await axios.get(`${baseUrl}/apiCategory/getCategory`,{withCredentials: true});
        dispatch(catDataFetchSuccess(res.data.data))
    } catch (error) {
        dispatch(catDataFetchFailure(error.response.data.message))
    }
}

export const categoryAdd = (data) => async(dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/apiCategory/category`,data,{withCredentials: true});
        dispatch(catDataAddSuccess(res.data))
    } catch (error) {
        dispatch(catDataAddFailure(error.response.data.message))
    }
}

export const fetchCategoryById = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/apiCategory/${id}`,{withCredentials: true});
        dispatch(catDataFetchByIdSuccess(res.data.data))
    } catch (error) {
        dispatch(catDataFetchByIdFailure(error.response.data.message))
    }
}

export const categoryUpdateById = (id,data) => async(dispatch) => {
    try {
        const res = await axios.put(`${baseUrl}/apiCategory/edit/${id}`,data,{withCredentials: true});
        dispatch(catDataEditSuccess(res.data))
    } catch (error) {
        dispatch(catDataEditFailure(error.response.data.message))
    }
}

export const categoryDeleteById = (id) => async(dispatch) => {
    try {
        const res = await axios.delete(`${baseUrl}/apiCategory/delete/${id}`,{withCredentials: true});
        dispatch(catDataDeleteSuccess(res.data))
    } catch (error) {
        dispatch(catDataDeleteFailure(error.response.data.message))
    }
}

// For Customers
export const fetchCustomer = () => async(dispatch) => {
    dispatch(custDataFetch());
    try {
        const res = await axios.get(`${baseUrl}/api/getUser`,{withCredentials: true});
        dispatch(custDataFetchSuccess(res.data.data))
    } catch (error) {
        dispatch(custDataFetchFailure(error.response.data.message))
    }
}

export const customerAdd = (data) => async(dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/api/user`,data,{withCredentials: true});
        dispatch(custDataAddSuccess(res.data))
    } catch (error) {
        dispatch(custDataAddFailure(error.response.data.message))
    }
}

export const fetchCustomerById = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/api/${id}`,{withCredentials: true});
        dispatch(custDataFetchByIdSuccess(res.data.data))
    } catch (error) {
        dispatch(custDataFetchByIdFailure(error.response.data.message))
    }
}

export const customerUpdateById = (id,data) => async(dispatch) => {
    try {
        const res = await axios.put(`${baseUrl}/api/edit/${id}`,data,{withCredentials: true});
        dispatch(custDataEditSuccess(res.data))
    } catch (error) {
        dispatch(custDataEditFailure(error.response.data.message))
    }
}

export const customerDeleteById = (id) => async(dispatch) => {
    try {
        const res = await axios.delete(`${baseUrl}/api/delete/${id}`,{withCredentials: true});
        dispatch(custDataDeleteSuccess(res.data))
    } catch (error) {
        dispatch(custDataDeleteFailure(error.response.data.message))
    }
}

// For Orders
export const fetchOrder = () => async(dispatch) => {
    dispatch(ordDataFetch());
    try {
        const res = await axios.get(`${baseUrl}/apiOrder/getOrder`,{withCredentials: true});
        dispatch(ordDataFetchSuccess(res.data.data))
    } catch (error) {
        dispatch(ordDataFetchFailure(error.response.data.message))
    }
}

export const orderAdd = (data) => async(dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/apiOrder/Order`,data,{withCredentials: true});
        dispatch(ordDataAddSuccess(res.data))
    } catch (error) {
        dispatch(ordDataAddFailure(error.response.data.message))
    }
}

export const fetchOrderById = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/apiOrder/${id}`,{withCredentials: true});
        dispatch(ordDataFetchByIdSuccess(res.data.data))
    } catch (error) {
        dispatch(ordDataFetchByIdFailure(error.response.data.message))
    }
}

export const fetchUserOrderById = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/apiOrder/customer/${id}`,{withCredentials: true});
        dispatch(userOrdDataFetchByIdSuccess(res.data.data))
    } catch (error) {
        dispatch(userOrdDataFetchByIdFailure(error.response.data.message))
    }
}

export const orderUpdateById = (id,data) => async(dispatch) => {
    try {
        const res = await axios.put(`${baseUrl}/apiOrder/edit/${id}`,data,{withCredentials: true});
        dispatch(ordDataEditSuccess(res.data))
    } catch (error) {
        dispatch(ordDataEditFailure(error.response.data.message))
    }
}

export const orderDeleteById = (id) => async(dispatch) => {
    try {
        const res = await axios.delete(`${baseUrl}/apiOrder/delete/${id}`,{withCredentials: true});
        dispatch(ordDataDeleteSuccess(res.data))
    } catch (error) {
        dispatch(ordDataDeleteFailure(error.response.data.message))
    }
}

export const orderStatusById = (id,data) => async(dispatch) => {
    try {
        const res = await axios.patch(`${baseUrl}/apiOrder/editStatus/${id}`,data,{withCredentials: true});
        dispatch(ordStatusEditSuccess(res.data))
    } catch (error) {
        dispatch(ordStatusEditFailure(error.response.data.message))
    }
}

export const registerUser = (data) => async(dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/api/register`,data,{withCredentials:true});
        dispatch(registerAddSuccess(res.data))
    } catch (error) {
        dispatch(registerAddFailure(error.response.data.message))
    }
}

//For Statistical Data

export const countData = () => async(dispatch) =>{
    dispatch(countDataFetch())
    try {
        const res = await axios.get(`${baseUrl}/api/count`,{withCredentials: true});
        dispatch(countDataSuccess(res.data))
    } catch (error) {
        dispatch(countDataFailure(error.response.data.message))
    }
}