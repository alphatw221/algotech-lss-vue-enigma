import { createAxiosWithBearer } from "@/libs/axiosClient";

export const manage_order_list = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/dashboard/order_list/?campaign_id=${campaign_id}`)
}

export const campaign_manage_order = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/dashboard/campaign_manage_order/?campaign_id=${campaign_id}`)
}