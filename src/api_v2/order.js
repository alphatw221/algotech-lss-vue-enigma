import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const buyer_retrieve_order = (order_id) => {
    return createAxiosWithBearer().get(`/api/v2/order/${order_id}/buyer/retrieve/`);
}

export const buyer_upload_receipt = (order_id, data) => {
    return createAxiosWithBearer().put(`/api/v2/order/${order_id}/buyer/receipt/upload/`, data);
}

export const buyer_retrieve_order_state = (order_id) => {
    return createAxiosWithBearer().get(`/api/v2/order/${order_id}/buyer/retrieve/state`)
}

export const buyer_orders_history = (page, page_size) => {
    return createAxiosWithBearer().get(`/api/v2/order/buyer/history/?page=${page}&page_size=${page_size}`)
}

export const buyer_retrieve_latest_order_shipping_info = () => {
    return createAxiosWithBearer().get(`/api/v2/order/buyer/retrieve/latest/shipping/`)
}
// -------------seller------------------
export const seller_retrieve_order = (order_id) => {
    return createAxiosWithBearer().get(`/api/v2/order/${order_id}/seller/retrieve/`);
}