import { createSlice } from "@reduxjs/toolkit";

export const OrdSlice = createSlice({
  name: "Order",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // For Products
    prdDataFetch: (state) => {
      state.status = "loading";
    },
    prdDataFetchSuccess: (state, action) => {
      (state.status = "success"), (state.data = action.payload);
    },
    prdDataFetchFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    prdDataAddSuccess: (state, action) => {
      (state.status = "success"), state.data.push(action.payload);
    },
    prdDataAddFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    prdDataFetchById: (state) => {
      state.status = "loading";
    },
    prdDataFetchByIdSuccess: (state, action) => {
      (state.status = "success"), (state.data = action.payload);
    },
    prdDataFetchByIdFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    prdDataEditSuccess: (state, action) => {
      state.status = "success";
      const updatedValue = action.payload;
      const index = state.data.findIndex(
        (product) => product.productId === updatedValue.productId
      );
      if (index !== -1) {
        state.data[index] = updatedValue;
      }
    },
    prdDataEditFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload;
    },
    prdDataDeleteSuccess: (state, action) => {
      state.status = "success";
      // state.data=action.payload
    },
    prdDataDeleteFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload;
    },

    // For Category
    catDataFetch: (state) => {
      state.status = "loading";
    },
    catDataFetchSuccess: (state, action) => {
      (state.status = "success"), (state.data = action.payload);
    },
    catDataFetchFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    catDataAddSuccess: (state, action) => {
      (state.status = "success"), state.data.push(action.payload);
    },
    catDataAddFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    catDataFetchById: (state) => {
      state.status = "loading";
    },
    catDataFetchByIdSuccess: (state, action) => {
      (state.status = "success"), (state.data = action.payload);
    },
    catDataFetchByIdFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    catDataEditSuccess: (state, action) => {
      state.status = "success";
      const updatedValue = action.payload;
      const index = state.data.findIndex(
        (category) => category.categoryId === updatedValue.categoryId
      );
      if (index !== -1) {
        state.data[index] = updatedValue;
      }
    },
    catDataEditFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload;
    },
    catDataDeleteSuccess: (state, action) => {
      state.status = "success";
      // state.data=action.payload
    },
    catDataDeleteFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload;
    },
    // For Customers
    custDataFetch: (state) => {
      state.status = "loading";
    },
    custDataFetchSuccess: (state, action) => {
      (state.status = "success"), (state.data = action.payload);
    },
    custDataFetchFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    custDataAddSuccess: (state, action) => {
      (state.status = "success"), state.data.push(action.payload);
    },
    custDataAddFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    custDataFetchById: (state) => {
      state.status = "loading";
    },
    custDataFetchByIdSuccess: (state, action) => {
      (state.status = "success"), (state.data = action.payload);
    },
    custDataFetchByIdFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    custDataEditSuccess: (state, action) => {
      state.status = "success";
      const updatedValue = action.payload;
      const index = state.data.findIndex(
        (customers) => customers.userId === updatedValue.userId
      );
      if (index !== -1) {
        state.data[index] = updatedValue;
      }
    },
    custDataEditFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload;
    },
    custDataDeleteSuccess: (state, action) => {
      state.status = "success";
      // state.data=action.payload
    },
    custDataDeleteFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload;
    },
    //For Orders
    ordDataFetch: (state) => {
      state.status = "loading";
    },
    ordDataFetchSuccess: (state, action) => {
      (state.status = "success"), (state.data = action.payload);
    },
    ordDataFetchFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    ordDataAddSuccess: (state, action) => {
      (state.status = "success"), state.data.push(action.payload);
    },
    ordDataAddFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    ordDataFetchById: (state) => {
      state.status = "loading";
    },
    ordDataFetchByIdSuccess: (state, action) => {
      (state.status = "success"), (state.data = action.payload);
    },
    ordDataFetchByIdFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    ordDataEditSuccess: (state, action) => {
      state.status = "success";
      const updatedValue = action.payload;
      const index = state.data.findIndex(
        (order) => order.orderId === updatedValue.orderId
      );
      if (index !== -1) {
        state.data[index] = updatedValue;
      }
    },
    ordDataEditFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload;
    },
    ordStatusEditSuccess: (state,action) => {
      state.status = "success";
      const updatedStatus = action.payload;
      const index = state.data.findIndex(
        (order) => order.orderId === updatedStatus.orderId
      );
      if(index !== -1){
        state.data[index] = updatedStatus
      }
    },
    ordStatusEditFailure: (state,action) =>{
       state.status = "failure";
       state.error = action.payload;
    },
    ordDataDeleteSuccess: (state, action) => {
      state.status = "success";
      // state.data=action.payload
    },
    ordDataDeleteFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload;
    },
    userOrdDataFetchById: (state) => {
      state.status = "loading";
    },
    userOrdDataFetchByIdSuccess: (state, action) => {
      (state.status = "success"), (state.data = action.payload);
    },
    userOrdDataFetchByIdFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
    countDataFetch: (state) => {
      state.status = "loading"
    },
    countDataSuccess: (state,action) => {
      state.status = "success",
      state.data = action.payload
    },
    countDataFailure: (state,action) => {
      state.status = "failure",
      state.error = action.payload
    },
    registerAddSuccess: (state, action) => {
      (state.status = "success"), state.data.push(action.payload);
    },
    registerAddFailure: (state, action) => {
      (state.status = "failure"), (state.error = action.payload);
    },
  },
});
export const {
  prdDataAddFailure,
  prdDataAddSuccess,
  prdDataDeleteFailure,
  prdDataDeleteSuccess,
  prdDataEditFailure,
  prdDataEditSuccess,
  prdDataFetch,
  prdDataFetchById,
  prdDataFetchByIdFailure,
  prdDataFetchByIdSuccess,
  prdDataFetchFailure,
  prdDataFetchSuccess,
  catDataAddFailure,
  catDataAddSuccess,
  catDataDeleteFailure,
  catDataDeleteSuccess,
  catDataEditFailure,
  catDataEditSuccess,
  catDataFetch,
  catDataFetchSuccess,
  catDataFetchFailure,
  catDataFetchByIdFailure,
  catDataFetchByIdSuccess,
  catDataFetchById,
  custDataAddFailure,
  custDataAddSuccess,
  custDataDeleteFailure,
  custDataDeleteSuccess,
  custDataEditFailure,
  custDataEditSuccess,
  custDataFetch,
  custDataFetchById,
  custDataFetchByIdFailure,
  custDataFetchByIdSuccess,
  custDataFetchFailure,
  custDataFetchSuccess,
  ordDataAddFailure,
  ordDataAddSuccess,
  ordDataDeleteFailure,
  ordDataDeleteSuccess,
  ordDataEditFailure,
  ordDataEditSuccess,
  ordDataFetch,
  ordDataFetchById,
  ordDataFetchByIdFailure,
  ordDataFetchByIdSuccess,
  ordDataFetchFailure,
  ordDataFetchSuccess,
  countDataFetch,
  countDataSuccess,
  countDataFailure,
  userOrdDataFetchById,
  userOrdDataFetchByIdFailure,
  userOrdDataFetchByIdSuccess,
  registerAddFailure,
  registerAddSuccess,
  ordStatusEditFailure,
  ordStatusEditSuccess
} = OrdSlice.actions;
export default OrdSlice.reducer;
