import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";

// -------------guest------------------
export const guest_retrieve_order = (order_oid) => {
    return axiosInstance.get(`/api/v2/order/guest/retrieve/${order_oid}/`);
}

export const guest_upload_receipt = (order_oid, data) => {
    return axiosInstance.put(`/api/v2/order/${order_oid}/guest/receipt/upload/`, data);
}

export const guest_retrieve_order_state = (order_oid) => {
    return axiosInstance.get(`/api/v2/order/guest/retrieve/${order_oid}/state/`)
}

// -------------buyer------------------
export const buyer_retrieve_order = (order_oid) => {
    return createAxiosWithBearer().get(`/api/v2/order/buyer/retrieve/${order_oid}/`);
}
export const buyer_retrieve_latest_order_shipping_info = () => {
    return createAxiosWithBearer().get(`/api/v2/order/buyer/retrieve/latest/shipping/`)
}
export const buyer_retrieve_order_state = (order_oid) => {
    return createAxiosWithBearer().get(`/api/v2/order/buyer/retrieve/${order_oid}/state/`)
}
export const buyer_upload_receipt = (order_oid, data) => {
    return createAxiosWithBearer().put(`/api/v2/order/${order_oid}/buyer/receipt/upload/`, data);
}
export const buyer_orders_history = (page, page_size) => {
    return createAxiosWithBearer().get(`/api/v2/order/buyer/history/?page=${page}&page_size=${page_size}`)
}
export const buyer_retrieve_order_oid = (order_id) => {
    return createAxiosWithBearer().get(`/api/v2/order/${order_id}/buyer/retrieve/oid/`)
}

// -------------seller------------------
export const seller_retrieve_order = (order_id) => {
    return createAxiosWithBearer().get(`/api/v2/order/${order_id}/seller/retrieve/`);
}