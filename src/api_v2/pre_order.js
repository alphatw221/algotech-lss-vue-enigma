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

export const list_buyer_campapign_product = (pre_order_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-product/buyer/list/?pre_order_id=${pre_order_id}`)
}

