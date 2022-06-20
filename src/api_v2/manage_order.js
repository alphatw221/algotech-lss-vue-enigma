import { createAxiosWithBearer } from "@/libs/axiosClient";

export const allow_checkout = (campaign_id,status) => {
    return createAxiosWithBearer().get(`/api/v2/manage-order/edit_allow_checkout/?campaign_id=${campaign_id}&status=${status ? 0 : 1}`)
}

export const manage_order_list = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/v2/manage-order/order_list/?campaign_id=${campaign_id}`)
}