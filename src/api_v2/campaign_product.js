import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";

// -------------guest------------------

export const guest_list_campapign_product = (pre_order_oid) => {
    return axiosInstance.get(`/api/v2/campaign-product/guest/list/?pre_order_oid=${pre_order_oid}`)
}

export const guest_cart_list = (pre_order_oid) => {
    return axiosInstance.get(`/api/v2/campaign-product/guest/cart/list/?pre_order_oid=${pre_order_oid}`)
}
// -------------buyer------------------
export const buyer_list_campapign_product = (pre_order_oid) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-product/buyer/list/?pre_order_oid=${pre_order_oid}`)
}

export const buyer_cart_list = (pre_order_oid) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-product/buyer/cart/list/?pre_order_oid=${pre_order_oid}`)
}

// -------------seller------------------

export const seller_create_campaign_product = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-product/seller/create/?campaign_id=${campaign_id}`, data)
}