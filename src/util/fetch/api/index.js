import { get, post, destroy, put, apiUrl } from "..";

export const currentUser = () => get("currentUser");
export const loginUser = (type, d) => put(`login/${type}`, d);
export const signupSeller = (d) => post("signup/seller", d);
export const signupCustomer = (d) => post("signup/customer", d);
export const signupDriver = (d) => post("signup/driver", d);
export const updateSeller = (d) => put("seller", d);
export const addItem = (d) => post("item", d);
export const getItems = () => get("item");

export const updateCustomer = (d) => put("customer", d);
export const updateDriver = (d) => put("driver", d);

export const searchItem = (text) => get(`search/item?text=${text}`);
export const getItem = (id) => get(`item/${id}`);
export const getMessages = (id) => get(`message/${id}`);

export const putOrder = (id, d) => put(`order/${id}`, d);
export const cancleOrder = (id) => destroy(`order/${id}`);
export const getSellerOrders = () => get("seller/orders");
export const getDriverOrders = () => get("driver/orders");

export const getCustomerOrders = () => get("customer/orders");
export const getCustomer = (id) => get(`customer/profile/${id}`);
export const setOrderStatus = (id, d) =>
  put(`seller/order/status/${id}`, d);
export const setTripLocation = (id, d) => put(`orders/location/${id}`, d);
export const assignDriverToOrder = (id) => put(`assignDriver/${id}`);
export const postMessage = (d) => post("message", d);
export const logout = () => put("logout");
export const fileUrl = (fileId) => {
  return `${apiUrl}/file/${fileId}`;
};
export const getOrderLocation = (orderId) => get(`location/${orderId}`);
