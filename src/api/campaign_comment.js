import { createAxios } from "@/libs/axiosClient";

export const campaign_comment_summarize = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`/api/campaign/${campaign_id}/comments/summarize/`)
}

export const campaign_comment_category_list = (campaign_id, category_name, toastify=null) => {
    return createAxios(toastify).get(`/api/campaign/${campaign_id}/comments/category/${category_name}/list/`)
}

export const campaign_list = (toastify=null) => {
    return createAxios(toastify).get(`/api/campaign/list_campaign/?page=1&page_size=10`)
}

export const get_summerize_comments = (campaign_id, status, toastify=null) => {
    return createAxios(toastify).get(`/api/campaign-comment/${campaign_id}/summarize/?tag=${status}/`)
}
export const get_comments = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`/api/campaign-comment/${campaign_id}/`)
}


