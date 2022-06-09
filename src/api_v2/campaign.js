import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";



export const check_facebook_page_token = (page_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/check_facebook_page_token/?facebook_page_id=${page_id}`)
}

export const check_instagram_profile_token = (page_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/check_instagram_profile_token/?instagram_profile_id=${page_id}`)
}

export const check_youtube_channel_token = (page_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/check_youtube_channel_token/?youtube_channel_id=${page_id}`)
}

