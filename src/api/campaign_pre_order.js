import { createAxiosWithBearer } from "@/libs/axiosClient";

export const list_campaign_pre_order = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/pre_order/seller_list/?campaign_id=${campaign_id}`)
}
