import { createAxiosWithBearer } from "@/libs/axiosClient";

export const update_platform_live_id = (campaign_id, platform, platform_id, post_id) => {
    return createAxiosWithBearer().put(`/api/v2/campaign/${campaign_id}/live/update/?platform=${platform}&platform_id=${platform_id}&post_id=${post_id}`)
}



export const check_facebook_page_token = (page_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/check_facebook_page_token/?facebook_page_id=${page_id}`)
}

export const check_instagram_profile_token = (page_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/check_instagram_profile_token/?instagram_profile_id=${page_id}`)
}

export const check_youtube_channel_token = (page_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/check_youtube_channel_token/?youtube_channel_id=${page_id}`)
}

export const save_pages_info = (campaign_id, data) => {
    return createAxiosWithBearer().put(`/api/v2/campaign/${campaign_id}/save_pages_info/`,data)
}

