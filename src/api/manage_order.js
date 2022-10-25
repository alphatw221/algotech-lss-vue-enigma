import { createAxios } from "@/libs/axiosClient";


export const campaign_manage_order = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`/api/dashboard/campaign_manage_order/?campaign_id=${campaign_id}`)
}
