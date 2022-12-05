import { createAxios } from "@/libs/axiosClient";


// -------------buyer------------------
export const buyer_list_campapign_product = (cart_oid, type, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign-product/buyer/list/?cart_oid=${cart_oid}&type=${type}`)
}

// export const buyer_cart_list = (pre_order_oid, toastify=null) => {
//     return createAxios(toastify).get(`/api/v2/campaign-product/buyer/cart/list/?pre_order_oid=${pre_order_oid}`)
// }

// -------------seller------------------

export const seller_create_campaign_products = (campaign_id, data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/campaign-product/seller/create/?campaign_id=${campaign_id}`, data)
}

export const seller_bulk_create_campaign_products = (campaign_id, support_stock_user_subscription_id, data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/campaign-product/seller/create/bulk/?campaign_id=${campaign_id}&support_stock_user_subscription_id=${support_stock_user_subscription_id}`, data)
}

export const seller_list_campaign_product = (campaign_id, type, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign-product/seller/list/?campaign_id=${campaign_id}&type=${type}`)
}

export const seller_search_campaign_product = (campaign_id, category, page, page_size, type, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign-product/seller/search/?campaign_id=${campaign_id}&category=${category}&type=${type}&page=${page}&page_size=${page_size}`)
}

export const seller_delete_campaign_product = (campaign_product_id, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/campaign-product/${campaign_product_id}/seller/delete/`)
}

export const seller_update_campaign_product = (campaign_product_id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/campaign-product/${campaign_product_id}/seller/update/`, data)
}

export const seller_toggle_campaign_product_active = (campaign_product_id, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/campaign-product/${campaign_product_id}/seller/toggle/active/`)
}

export const seller_toggle_campaign_product_overbook = (campaign_product_id, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/campaign-product/${campaign_product_id}/seller/toggle/overbook/`)
}

export const seller_import_campaign_product = (campaign_id, data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/campaign-product/seller/import/?campaign_id=${campaign_id}`, data)
}



