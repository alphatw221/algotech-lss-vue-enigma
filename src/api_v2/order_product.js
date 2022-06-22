import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const buyer_delete_order_product = (order_product_id) =>{
    return createAxiosWithBearer().delete(`/api/v2/order-product/${order_product_id}/buyer/delete/`)
}

export const buyer_update_order_product = (order_product_id, qty) =>{
    return createAxiosWithBearer().put(`/api/v2/order-product/${order_product_id}/buyer/update/?qty=${qty}`)
}

export const seller_delete_product = (pre_order_id,order_product_id) => {
    return createAxiosWithBearer().get(`/api/v2/order-product/${pre_order_id}/seller/delete/?order_product_id=${order_product_id}`)
}
export const seller_update_product = (pre_order_id,order_product_id,qty) => {
    return createAxiosWithBearer().get(`/api/v2/order-product/${pre_order_id}/seller/update/?order_product_id=${order_product_id}&qty=${qty}`)
}
