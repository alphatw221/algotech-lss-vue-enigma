import { createAxios } from "@/libs/axiosClient";

export const allow_checkout = (campaign_id,status, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/edit_allow_checkout/?campaign_id=${campaign_id}&status=${status ? 0 : 1}`)
}

export const manage_order_list = (campaign_id,searchValue,page,page_size,status,data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/order/order_list/?campaign_id=${campaign_id}&search=${searchValue}&page=${page}&page_size=${page_size}&status=${status}`,data)
}