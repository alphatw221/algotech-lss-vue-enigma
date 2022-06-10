import { createAxiosWithBearer } from "@/libs/axiosClient";

export const manage_order_list = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/dashboard/order_list/?campaign_id=${campaign_id}`)
} 