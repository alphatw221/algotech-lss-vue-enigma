import { facebookAxios } from "@/libs/axiosClient";

export const get_fb_page_live_videos = (pageID, pageToken) => {
    return facebookAxios(pageToken).get(`/${pageID}/live_videos?fields=title,status,embed_html,video`)
}