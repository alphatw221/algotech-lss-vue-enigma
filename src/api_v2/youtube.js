import { youtubeAxios } from "@/libs/axiosClient";
import { createAxiosWithoutInterceptor, createAxios } from "@/libs/axiosClient";

export const get_yt_live_media = (platform_id, limit='', toastify=null) => {
    return createAxios(toastify).get(`/api/v2/youtube-channel/${platform_id}/live_broadcasts?limit=${limit}`)
}

export const check_youtube_channel_token_valid = (platform_id) => {
    return createAxiosWithoutInterceptor().get(`/api/v2/youtube-channel/${platform_id}/token/check/`)
}

export const check_youtube_channel_post_exist = (platform_id, live_video_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/youtube-channel/${platform_id}/post/check/?post_id=${live_video_id}`)
}