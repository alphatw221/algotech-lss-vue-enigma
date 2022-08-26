import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";

//-------------------------------guest----------------------------------
export const guest_retrieve_pre_order_platform = (pre_order_oid) => {
    return axiosInstance.get(`/api/v2/pre_order/guest/retrieve/${pre_order_oid}/platform/`);
}

export const guest_update_delivery_info = (pre_order_oid,data) => {
    return axiosInstance.put(`/api/v2/pre_order/${pre_order_oid}/guest/delivery/`,data)
}

export const guest_cart_add = (pre_order_oid, campaign_product_id, qty) => {
    return axiosInstance.put(`/api/v2/pre_order/${pre_order_oid}/guest/add/?campaign_product_id=${campaign_product_id}&qty=${qty}`)
}

export const guest_retrieve_pre_order = (pre_order_oid) => {
    return axiosInstance.get(`/api/v2/pre_order/guest/retrieve/${pre_order_oid}/`);
}

export const guest_create_blank_cart = (campaign_id, recaptcha_token, client_uuid) => {
    return axiosInstance.get(`/api/v2/pre_order/${campaign_id}/guest/create/?recaptcha_token=${recaptcha_token}&client_uuid=${client_uuid}`,
    null,
    {withCredentials:true})
}
//-------------------------------buyer----------------------------------
export const buyer_update_delivery_info = (pre_order_oid,data) => {
    return createAxiosWithBearer().put(`/api/v2/pre_order/${pre_order_oid}/buyer/delivery/`,data)
}

export const buyer_cart_add = (pre_order_oid, campaign_product_id, qty) => {
    return createAxiosWithBearer().put(`/api/v2/pre_order/${pre_order_oid}/buyer/add/?campaign_product_id=${campaign_product_id}&qty=${qty}`)
}

export const buyer_retrieve_pre_order = (pre_order_oid) => {
    return createAxiosWithBearer().get(`/api/v2/pre_order/buyer/retrieve/${pre_order_oid}/`);
}

export const buyer_create_blank_cart = (campaign_id, loginWith) => {
    return createAxiosWithBearer().get(`/api/v2/pre_order/${campaign_id}/${loginWith}/buyer/create/`)
}

export const buyer_apply_discount_code = (order_id,data) => {
    return createAxiosWithBearer().put(`/api/v2/pre_order/${order_id}/buyer/discount/`,data)
}

//-------------------------------seller----------------------------------
export const seller_retrieve_pre_order = (pre_order_id) => {
    return createAxiosWithBearer().get(`/api/v2/pre_order/${pre_order_id}/seller/retrieve/`);
}

export const seller_adjust_price = (pre_order_id,data) => {
    return createAxiosWithBearer().put(`/api/v2/pre_order/${pre_order_id}/seller/adjust/`,data)
}

export const get_pre_order_oid = (pre_order_id) => {
    return createAxiosWithBearer().get(`/api/v2/pre_order/${pre_order_id}/seller/retrieve/oid/`,data)
}

export const seller_cart_add = (pre_order_oid, campaign_product_id, qty) => {
    return createAxiosWithBearer().put(`/api/v2/pre_order/${pre_order_oid}/seller/add/?campaign_product_id=${campaign_product_id}&qty=${qty}`)
}
