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

export const buyer_retrieve_order_oid = (order_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/${order_id}/buyer/retrieve/oid/`)
}

export const buyer_cash_on_delivery = (order_oid,data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/order/${order_oid}/buyer/create/delivery_order/`,data)
}

export const buyer_back_to_cart = (order_oid, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/order/${order_oid}/buyer/to_cart/`);
}


// -------------seller------------------
export const seller_retrieve_order = (order_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order/${order_id}/seller/retrieve/`);
}

export const seller_search_order = (campaign_id,searchValue, daterange, page,page_size,status, filter_data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/order/seller/search/?campaign_id=${campaign_id}&search=${searchValue}&daterange=${daterange}&page=${page}&page_size=${page_size}&status=${status}`, filter_data,)
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

export const seller_delete_order = (order_id, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/order/${order_id}/seller/delete/`);
}

export const seller_back_to_cart = (order_id, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/order/${order_id}/seller/to_cart/`);
}

export const seller_update_payment_status = (order_id, payment_status, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/order/${order_id}/seller/payment/`,{'payment_status':payment_status});
}
export const seller_update_deliver_status = (order_id, delivery_status, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/order/${order_id}/seller/delivery/`,{'delivery_status':delivery_status});
}

export const seller_update_shipping_info = (order_id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/order/${order_id}/seller/shipping_info/`,data);
}

export const seller_update_buyer = (order_id, buyer_id, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/order/${order_id}/seller/buyer/`,{'buyer_id':buyer_id});
}

export const get_order_report = (campaign_id, searchValue, daterange, status, filter_data, toastify=null) => {

    return createAxios(toastify).post(`/api/v2/order/report/json/?campaign_id=${campaign_id}&search=${searchValue}&daterange=${daterange}&status=${status}`, filter_data)
}

export const get_order_report_for_kol = (campaign_id, searchValue, status, filter_data, toastify=null) => {

    return createAxios(toastify).post(`/api/v2/order/report/kol/json/?campaign_id=${campaign_id}&search=${searchValue}&status=${status}`, filter_data)
}