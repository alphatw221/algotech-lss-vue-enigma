import { facebookAxios } from "@/libs/axiosClient";
import { createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";
export const get_fb_page_live_media = (pageID, pageToken) => {
    return facebookAxios(pageToken).get(`/${pageID}/live_videos?fields=title,status,embed_html,video`)
}
// export const get_fb_page_live_media = (pageID, pageToken) => {
//     return facebookAxios(pageToken).get(`/${pageID}/posts?fields=properties,attachments{title,media_type}&limit=3`)
// }


export const check_facebook_page_token_valid = (platform_id) => {
    return createAxiosWithBearerWithoutInterceptor().get(`/api/v2/facebook-page/${platform_id}/token/check/`)
}

export const check_facebook_page_post_exist = (platform_id, post_id) => {
    return createAxiosWithBearer().get(`/api/v2/facebook-page/${platform_id}/post/check/?post_id=${post_id}`)
}

export const create_fb_page_live_object = (platform_id) => {
    return createAxiosWithBearer().post(`/api/v2/facebook-page/${platform_id}/create/live_object/`)
}