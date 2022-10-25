import { createAxios } from "@/libs/axiosClient";


export const campaign_manage_order = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`/api/dashboard/campaign_manage_order/?campaign_id=${campaign_id}`)
}


export const report_of_campaigns_in_period = (start_time, end_time, toastify=null) => {
    return createAxios(toastify).get(`/api/dashboard/report_of_campaigns_in_period/?start_time=${start_time}&end_time=${end_time}`)
}