import { youtubeAxios } from "@/libs/axiosClient";
import { createAxiosWithBearer } from "@/libs/axiosClient";

export const get_yt_live_media = (pageToken) => {
    return youtubeAxios(pageToken).get(`/liveBroadcasts?part=id,snippet,contentDetails,status&broadcastStatus=active`)
}

export const check_youtube_channel_token_valid = (platform_id) => {
    return createAxiosWithBearer().get(`/api/v2/youtube-channel/${platform_id}/token/check/`)
}

export const check_youtube_channel_post_exist = (platform_id, live_video_id) => {
    return createAxiosWithBearer().get(`/api/v2/youtube-channel/${platform_id}/post/check/?post_id=${live_video_id}`)
}