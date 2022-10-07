import { createAxios } from "@/libs/axiosClient";

//-------------------------------guest----------------------------------

export const guest_create_blank_cart = (campaign_id, recaptcha_token, client_uuid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/pre_order/${campaign_id}/guest/create/?recaptcha_token=${recaptcha_token}&client_uuid=${client_uuid}`,
    null,
    {withCredentials:true})
}
//-------------------------------buyer----------------------------------
export const buyer_retrieve_pre_order_platform = (pre_order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/pre_order/buyer/retrieve/${pre_order_oid}/platform/`);
}


export const buyer_update_delivery_info = (pre_order_oid,data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/pre_order/${pre_order_oid}/buyer/delivery/`,data)
}

export const buyer_cart_add = (pre_order_oid, campaign_product_id, qty, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/pre_order/${pre_order_oid}/buyer/add/?campaign_product_id=${campaign_product_id}&qty=${qty}`)
}

export const buyer_retrieve_pre_order = (pre_order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/pre_order/buyer/retrieve/${pre_order_oid}/`);
}

export const buyer_create_blank_cart = (campaign_id, loginWith, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/pre_order/${campaign_id}/${loginWith}/buyer/create/`)
}

export const buyer_apply_discount_code = (order_id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/pre_order/${order_id}/buyer/discount/`,data)
}

export const buyer_cancel_discount_code = (order_id, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/pre_order/${order_id}/buyer/discount/cancel`)
}


//-------------------------------seller----------------------------------
export const seller_retrieve_pre_order = (pre_order_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/pre_order/${pre_order_id}/seller/retrieve/`);
}

export const seller_adjust_price = (pre_order_id,data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/pre_order/${pre_order_id}/seller/adjust/`,data)
}

export const get_pre_order_oid = (pre_order_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/pre_order/${pre_order_id}/seller/retrieve/oid/`,data)
}

export const seller_cart_add = (pre_order_id, campaign_product_id, qty, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/pre_order/${pre_order_id}/seller/add/?campaign_product_id=${campaign_product_id}&qty=${qty}`)
}

export const seller_list_pre_order = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/pre_order/seller/list/?campaign_id=${campaign_id}`)
}

export const seller_search_pre_order = (campaign_id, search, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/pre_order/seller/search/?campaign_id=${campaign_id}&search=${search}`)
}