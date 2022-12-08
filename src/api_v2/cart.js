import { createAxios } from "@/libs/axiosClient";

//-------------------------------guest----------------------------------

export const guest_create_blank_cart = (campaign_id, recaptcha_token, client_uuid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/cart/${campaign_id}/guest/create/?recaptcha_token=${recaptcha_token}&client_uuid=${client_uuid}`,
    null,
    {withCredentials:true})
}
//-------------------------------buyer----------------------------------
export const buyer_retrieve_cart_platform = (cart_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/cart/buyer/retrieve/${cart_oid}/platform/`);
}


export const buyer_checkout_cart = (cart_oid, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/cart/${cart_oid}/buyer/checkout/`,data)
}

export const buyer_edit_cart_product = (cart_oid, campaign_product_id, qty, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/cart/${cart_oid}/buyer/product/edit/`, {"campaign_product_id":campaign_product_id, "qty":qty})
}

export const buyer_retrieve_cart = (cart_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/cart/buyer/retrieve/${cart_oid}/`);
}

export const buyer_create_blank_cart = (campaign_id, loginWith, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/cart/${campaign_id}/${loginWith}/buyer/create/`)
}

export const buyer_apply_discount_code = (cart_oid, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/cart/${cart_oid}/buyer/discount/`,data)
}

export const buyer_cancel_discount_code = (cart_oid, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/cart/${cart_oid}/buyer/discount/cancel`)
}

export const buyer_get_cart_relative_wallet = (cart_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/cart/${cart_oid}/buyer/wallet`)
}

export const buyer_get_cvs_map = (cart_oid,data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/cart/buyer/cvs_map/${cart_oid}/`,data)
}


//-------------------------------seller----------------------------------
export const seller_retrieve_cart = (cart_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/cart/${cart_id}/seller/retrieve/`);
}

export const seller_adjust_price = (cart_id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/cart/${cart_id}/seller/adjust/`,data)
}

export const get_cart_oid = (cart_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/cart/${cart_id}/seller/retrieve/oid/`,data)
}

export const seller_edit_cart_product = (cart_id, campaign_product_id, qty, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/cart/${cart_id}/seller/product/edit/`, {"campaign_product_id":campaign_product_id, "qty":qty})
}

export const seller_list_cart = (campaign_id, search, data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/cart/seller/list/?campaign_id=${campaign_id}&search=${search}`,data)
}


export const seller_search_cart = (campaign_id, search_value, page, page_size, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/cart/seller/search/?campaign_id=${campaign_id}&search=${search_value}&page=${page}&page_size=${page_size}`)
}

export const seller_clear_cart = (cart_id, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/cart/${cart_id}/seller/clear/`)
}