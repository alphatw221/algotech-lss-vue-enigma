import { createAxiosWithBearer } from "@/libs/axiosClient";

export const bind_facebook_page_to_campaign = (campaign_id, facebook_page_id) => {
    return createAxiosWithBearer().get(`/api/campaign/${campaign_id}/bind_facebook_page/?facebook_page_id=${facebook_page_id}`)
}

export const bind_youtube_channel_to_campaign = (campaign_id, youtube_channel_id) => {
    return createAxiosWithBearer().get(`/api/campaign/${campaign_id}/bind_youtube_channel/?youtube_channel_id=${youtube_channel_id}`)
}

export const bind_instagram_profile_to_campaign = (campaign_id, instagram_profile_id) => {
    return createAxiosWithBearer().get(`/api/campaign/${campaign_id}/bind_instagram_profile/?instagram_profile_id=${instagram_profile_id}`)
}