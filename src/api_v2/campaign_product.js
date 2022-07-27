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

export const seller_create_campaign_products = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-product/seller/create/?campaign_id=${campaign_id}`, data)
}

export const seller_bulk_create_campaign_products = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-product/seller/create/bulk/?campaign_id=${campaign_id}`, data)
}

export const seller_list_campaign_product = (campaign_id, category, page, page_size) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-product/seller/list/?campaign_id=${campaign_id}&category=${category}&page=${page}&page_size=${page_size}`)
}

export const seller_delete_campaign_product = (campaign_product_id) => {
    return createAxiosWithBearer().delete(`/api/v2/campaign-product/${campaign_product_id}/seller/delete/`)
}

export const seller_update_campaign_product = (campaign_product_id, data) => {
    return createAxiosWithBearer().put(`/api/v2/campaign-product/${campaign_product_id}/seller/update/`, data)
}

export const seller_toggle_campaign_product_status = (campaign_product_id) => {
    return createAxiosWithBearer().put(`/api/v2/campaign-product/${campaign_product_id}/seller/toggle/status/`)
}