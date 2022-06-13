import { instagramAxios } from "@/libs/axiosClient";
import { createAxiosWithBearer } from "@/libs/axiosClient";

export const get_ig_live_media = (pageID, pageToken) => {
    return instagramAxios(pageToken).get(`/${pageID}/live_media?fields=id,media_url,username`)
}


export const check_instagram_profile_token_valid = (platform_id) => {
    return createAxiosWithBearer().get(`/api/v2/instagram-profile/${platform_id}/token/check/`)
}