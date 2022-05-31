import { instagramAxios } from "@/libs/axiosClient";

export const get_ig_live_media = (pageID, pageToken) => {
    return instagramAxios(pageToken).get(`/${pageID}/live_media?fields=id,media_url,username`)
}