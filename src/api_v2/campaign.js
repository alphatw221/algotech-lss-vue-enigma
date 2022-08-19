import { createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";

export const update_platform_live_id = (campaign_id, platform, platform_id, post_id) => {
    return createAxiosWithBearerWithoutInterceptor().put(`/api/v2/campaign/${campaign_id}/live/update/?platform=${platform}&platform_id=${platform_id}&post_id=${post_id}`)
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

export const list_delivery_setting = () => {
    return createAxiosWithBearer().get('/api/v2/campaign/delivery/setting/list/')
}

export const update_delivery_setting = (data) => {
    return createAxiosWithBearer().put('/api/v2/campaign/delivery/setting/update/', data)
}
export const save_pages_info = (campaign_id, data) => {
    return createAxiosWithBearer().put(`/api/v2/campaign/${campaign_id}/save_pages_info/`,data)
}

export const create_campaign = (data) => {
    return createAxiosWithBearer().post('api/v2/campaign/create/', data)
}

export const update_campaign = (campaign_id, formData) => {
    return createAxiosWithBearer().put(`api/v2/campaign/${campaign_id}/update/`, formData)
}

export const retrieve_campaign = (campaign_id) => {
    return createAxiosWithBearer().get(`api/v2/campaign/retrieve/?campaign_id=${campaign_id}`)
}

export const comment_on_comment = (campaign_id,comment_id,message_text) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/facebook/comment-on-comment/?campaign_id=${campaign_id}&comment_id=${comment_id}&message=${message_text}`)
}

export const nest_comment = (campaign_id,comment_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/facebook/comment-reply/?campaign_id=${campaign_id}&comment_id=${comment_id}`)
}

export const toggle_stop_checkout = (campaign_id,status) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/stop_checkout/toggle/?campaign_id=${campaign_id}`)
}


export const list_campaign = (status,searchColumn,keyword,order_by,page,page_size) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/list/?status=${status}&searchColumn=${searchColumn}&keyword=${keyword}&order_by=${order_by}&page=${page}&page_size=${page_size}`)
}


export const fast_add_product = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/campaign/${campaign_id}/product/add/fast/`, data)
}

export const get_campaign_order_report = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/${campaign_id}/report/`,{responseType : 'blob'})
}

export const get_campaign_product_order_code_dict = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign/${campaign_id}/product/order_code/dict/`)
}

export const delete_campaign = (campaign_id) => {
    return createAxiosWithBearer().delete(`/api/v2/campaign/delete/?campaign_id=${campaign_id}`)
}
