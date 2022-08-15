import { axiosInstance, createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";
// -------------guest------------------
export const guest_delete_order_product = (order_product_id, pre_order_oid) =>{
    return axiosInstance.delete(`/api/v2/order-product/${order_product_id}/guest/delete/?pre_order_oid=${pre_order_oid}`)
}

export const guest_update_order_product = (order_product_id, pre_order_oid, qty) =>{
    return createAxiosWithBearerWithoutInterceptor().put(`/api/v2/order-product/${order_product_id}/guest/update/?pre_order_oid=${pre_order_oid}&qty=${qty}`)
}

// -------------buyer------------------
export const buyer_delete_order_product = (order_product_id, pre_order_oid) =>{
    return createAxiosWithBearer().delete(`/api/v2/order-product/${order_product_id}/buyer/delete/?pre_order_oid=${pre_order_oid}`)
}

export const buyer_update_order_product = (order_product_id, pre_order_oid, qty) =>{
    return createAxiosWithBearerWithoutInterceptor().put(`/api/v2/order-product/${order_product_id}/buyer/update/?pre_order_oid=${pre_order_oid}&qty=${qty}`)
}

// -------------seller------------------
export const seller_delete_product = (pre_order_id,order_product_id) => {
    return createAxiosWithBearer().get(`/api/v2/order-product/${order_product_id}/seller/delete/?pre_order_id=${pre_order_id}`)
}
export const seller_update_product = (pre_order_id,order_product_id,qty) => {
    return createAxiosWithBearer().get(`/api/v2/order-product/${order_product_id}/seller/update/?pre_order_id=${pre_order_id}&qty=${qty}`)
}
