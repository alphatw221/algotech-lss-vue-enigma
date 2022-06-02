import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const retrieve_pre_order = (pre_order_id) => {
    return createAxiosWithBearer().get(`/api/v2/pre_order/${pre_order_id}/retrieve/`);
}
export const update_delivery_info = (pre_order_id,data) => {
    return createAxiosWithBearer().put(`/api/v2/pre_order/${pre_order_id}/delivery/`,data)
}

export const buyer_delete_order_product = (order_product_id) =>{
    return createAxiosWithBearer().delete(`/api/v2/order-product/${order_product_id}/buyer/delete/`)
}

export const list_campapign_product = (pre_order_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-product/buyer/list/?pre_order_id=${pre_order_id}`)
}

export const buyer_cart_update = (order_product_id, qty) => {
    return createAxiosWithBearer().put(`/api/v2/order-product/${order_product_id}/buyer/update/?qty=${qty}`)
}

export const buyer_cart_add = (pre_order_id, campaign_product_id) => {
    return createAxiosWithBearer().get(`/api/v2/order-product/${pre_order_id}/buyer/add/?campaign_product_id=${campaign_product_id}&qty=1`)
}
