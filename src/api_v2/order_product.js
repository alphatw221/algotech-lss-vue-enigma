import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";
// -------------guest------------------
export const guest_delete_order_product = (order_product_id, pre_order_oid) =>{
    return axiosInstance.delete(`/api/v2/order-product/${order_product_id}/guest/delete/?pre_order_oid=${pre_order_oid}`)
}

export const guest_update_order_product = (order_product_id, pre_order_oid, qty) =>{
    return axiosInstance.put(`/api/v2/order-product/${order_product_id}/guest/update/?pre_order_oid=${pre_order_oid}&qty=${qty}`)
}

// -------------buyer------------------
export const buyer_delete_order_product = (order_product_id, pre_order_oid) =>{
    return createAxiosWithBearer().delete(`/api/v2/order-product/${order_product_id}/buyer/delete/?pre_order_oid=${pre_order_oid}`)
}

export const buyer_update_order_product = (order_product_id, pre_order_oid, qty) =>{
    return createAxiosWithBearer().put(`/api/v2/order-product/${order_product_id}/buyer/update/?pre_order_oid=${pre_order_oid}&qty=${qty}`)
}
