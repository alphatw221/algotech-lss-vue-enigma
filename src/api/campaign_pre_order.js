import { createAxios } from "@/libs/axiosClient";

export const list_campaign_pre_order = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`/api/pre_order/seller_list/?campaign_id=${campaign_id}`)
}
