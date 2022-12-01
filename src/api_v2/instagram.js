import { instagramAxios } from "@/libs/axiosClient";
import { createAxiosWithoutInterceptor, createAxios } from "@/libs/axiosClient";

export const get_ig_live_media = (platform_id, limit='', toastify=null) => {
    return createAxios(toastify).get(`/api/v2/instagram-profile/${platform_id}/live_media?limit=${limit}`)
}

export const get_ig_media = (platform_id, limit='', toastify=null) => {
    return createAxios(toastify).get(`/api/v2/instagram-profile/${platform_id}/media?limit=${limit}`)
}

export const check_instagram_profile_token_valid = (platform_id) => {
    return createAxiosWithoutInterceptor().get(`/api/v2/instagram-profile/${platform_id}/token/check/`)
}

export const get_ig_conversation_messages = (page_id, ig_user_id, pageToken) => {
    return instagramAxios(pageToken).get(`/${page_id}/conversations?fields=participants,updated_time,messages{from,to,message,id,created_time,story}&user_id=${ig_user_id}&platform=instagram`)
}

export const retrieve_instagram_profile = (pk, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/instagram-profile/${pk}/`)
}

export const reply_to_direct_message = (page_id, user_id, text, pageToken) => {
    return instagramAxios(pageToken).post(`${page_id}/messages/`, {"recipient": {"id":user_id},"message": {"text": text}})
}

export const check_instagram_profile_post_exist = (platform_id, media_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/instagram-profile/${platform_id}/post/check/?post_id=${media_id}`)
}

export const get_ig_profile_picture = (platform_id) => {
    return createAxiosWithoutInterceptor().get(`/api/v2/instagram-profile/${platform_id}/picture/`)
}

