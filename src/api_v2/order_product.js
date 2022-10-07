import { createAxios} from "@/libs/axiosClient";

// -------------buyer------------------
export const buyer_delete_order_product = (order_product_id, pre_order_oid, toastify=null) =>{
    return createAxios(toastify).delete(`/api/v2/order-product/${order_product_id}/buyer/delete/?pre_order_oid=${pre_order_oid}`)
}

export const buyer_update_order_product = (order_product_id, pre_order_oid, qty, toastify=null) =>{
    return createAxios(toastify).put(`/api/v2/order-product/${order_product_id}/buyer/update/?pre_order_oid=${pre_order_oid}&qty=${qty}`)
}

// -------------seller------------------
export const seller_delete_product = (pre_order_id,order_product_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order-product/${order_product_id}/seller/delete/?pre_order_id=${pre_order_id}`)
}
export const seller_update_product = (pre_order_id,order_product_id,qty, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/order-product/${order_product_id}/seller/update/?pre_order_id=${pre_order_id}&qty=${qty}`)
}
