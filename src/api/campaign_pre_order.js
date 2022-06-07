import { createAxiosWithBearer } from "@/libs/axiosClient";

export const list_campaign_pre_order = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/pre_order/seller_list/?campaign_id=${campaign_id}`)
}

export const update_campaign_product = (id, campaign_id, data) => {
    return createAxiosWithBearer().put(`/api/campaign-product/${id}/update_campaign_product/?campaign_id=${campaign_id}`, data)
}