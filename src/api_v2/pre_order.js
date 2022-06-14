import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const retrieve_pre_order = (pre_order_id) => {
    return createAxiosWithBearer().get(`/api/v2/pre_order/${pre_order_id}/retrieve/`);
}
export const update_delivery_info = (pre_order_id,data) => {
    return createAxiosWithBearer().put(`/api/v2/pre_order/${pre_order_id}/delivery/`,data)
}

// export const buyer_delete_order_product = (order_product_id) =>{
//     return createAxiosWithBearer().delete(`/api/v2/order-product/${order_product_id}/buyer/delete/`)
// }



// export const buyer_cart_update = (order_product_id, qty) => {
//     return createAxiosWithBearer().put(`/api/v2/order-product/${order_product_id}/buyer/update/?qty=${qty}`)
// }

export const buyer_cart_add = (pre_order_id, campaign_product_id, qty) => {
    return createAxiosWithBearer().put(`/api/v2/pre_order/${pre_order_id}/buyer/add/?campaign_product_id=${campaign_product_id}&qty=${qty}`)
}

export const buyer_retrieve_pre_order = (pre_order_id) => {
    return createAxiosWithBearer().get(`/api/v2/pre_order/${pre_order_id}/buyer/retrieve/`);
}
export const buyer_link_create_cart = (campaign_id, loginWith) => {
    return createAxiosWithBearer().get(`/api/v2/pre_order/${campaign_id}/${loginWith}/buyer/create/`)
}
export const seller_retrieve_pre_order = (pre_order_id) => {
    return createAxiosWithBearer().get(`/api/v2/pre_order/${pre_order_id}/seller/retrieve/`);
}

export const update_adjust_price = (pre_order_id,data) => {
    return createAxiosWithBearer().put(`/api/v2/pre_order/${pre_order_id}/seller/adjust`,data)
}
