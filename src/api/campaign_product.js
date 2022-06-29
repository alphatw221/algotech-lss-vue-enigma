import { createAxiosWithBearer } from "@/libs/axiosClient";

export const list_campaign_product = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/campaign-product/list_campaign_product/?campaign_id=${campaign_id}`)
}

export const update_campaign_product = (id, campaign_id, data) => {
    return createAxiosWithBearer().put(`/api/campaign-product/${id}/update_campaign_product/?campaign_id=${campaign_id}`, data)
}

export const fast_add_product = (campaign_id, code, price, qty) => {
    return createAxiosWithBearer().post(`/api/campaign-product/fast_add_product/?campaign_id=${campaign_id}&code=${code}&price=${price}&qty=${qty}`)
}