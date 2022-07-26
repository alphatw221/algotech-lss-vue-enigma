import { instagramAxios } from "@/libs/axiosClient";
import { createAxiosWithBearer } from "@/libs/axiosClient";

export const get_ig_live_media = (pageID, pageToken) => {
    return instagramAxios(pageToken).get(`/${pageID}/live_media?fields=id,media_url,username`)
}


export const check_instagram_profile_token_valid = (platform_id) => {
    return createAxiosWithBearer().get(`/api/v2/instagram-profile/${platform_id}/token/check/`)
}

export const get_ig_conversation_messages = (page_id, ig_user_id, pageToken) => {
    return instagramAxios(pageToken).get(`/${page_id}/conversations?fields=participants,updated_time,messages{from,to,message,id,created_time,story}&user_id=${ig_user_id}&platform=instagram`)
}

export const retrieve_instagram_profile = (pk) => {
    return createAxiosWithBearer().get(`/api/instagram_profile/${pk}/`)
}

export const reply_to_direct_message = (page_id, user_id, text, pageToken) => {
    return instagramAxios(pageToken).post(`${page_id}/messages/`, {"recipient": {"id":user_id},"message": {"text": text}})
}

