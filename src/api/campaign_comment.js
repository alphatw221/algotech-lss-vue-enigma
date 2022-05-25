import { createAxiosWithBearer } from "@/libs/axiosClient";

export const campaign_comment_summarize = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/campaign/${campaign_id}/comments/summarize/`)
}

export const campaign_comment_category_list = (campaign_id, category_name) => {
    return createAxiosWithBearer().get(`/api/campaign/${campaign_id}/comments/category/${category_name}/list/`)
}

export const campaign_list = () => {
    return createAxiosWithBearer().get(`/api/campaign/list_campaign/?page=1&page_size=10`)
}

export const get_comments = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/campaign-comment/${campaign_id}/`)
}