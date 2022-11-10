import { createAxios } from "@/libs/axiosClient";

// -------------buyer------------------
export const buyer_retrieve_order_platform = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/buyer/retrieve/${order_oid}/platform/`);
}
export const buyer_retrieve_order_with_user_subscription = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/buyer/retrieve/${order_oid}/subscription`);
}
export const buyer_retrieve_order = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/buyer/retrieve/${order_oid}/`);
}
export const buyer_retrieve_latest_order_shipping_info = (toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/buyer/retrieve/latest/shipping/`)
}
export const buyer_retrieve_order_state = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/buyer/retrieve/${order_oid}/state/`)
}
export const buyer_upload_receipt = (order_oid, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/order/${order_oid}/buyer/receipt/upload/`, data);
}
export const buyer_orders_history = (page, page_size, user_subscription_id=null, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/buyer/history/?user_subscription_id=${user_subscription_id}&page=${page}&page_size=${page_size}`)
}
export const buyer_retrieve_order_oid = (order_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/${order_id}/buyer/retrieve/oid/`)
}

// -------------seller------------------
export const seller_retrieve_order = (order_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/${order_id}/seller/retrieve/`);
}

export const seller_search_order = (campaign_id,searchValue,page,page_size,status, filter_data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/order/seller/search/?campaign_id=${campaign_id}&search=${searchValue}&page=${page}&page_size=${page_size}&status=${status}`, filter_data,)
}

// export const manage_order_list = (campaign_id,searchValue,page,page_size,status,data, toastify=null) => {
//     return createAxios(toastify).post(`/api/v2/order/seller/order_list/?campaign_id=${campaign_id}&search=${searchValue}&page=${page}&page_size=${page_size}&status=${status}`,data,)
// }

// export const seller_deliver = (order_id, toastify=null) => {
//     return createAxios(toastify).put(`/api/v2/order/${order_id}/seller/deliver/`);
// }

export const get_order_oid = (order_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/${order_id}/seller/retrieve/oid/`);
}

export const seller_update_payment_status = (order_id, payment_status, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/order/${order_id}/seller/payment/`,{'payment_status':payment_status});
}
export const seller_update_deliver_status = (order_id, delivery_status, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/order/${order_id}/seller/delivery/`,{'delivery_status':delivery_status});
}

