import {  createAxios } from "@/libs/axiosClient";

export const update_platform_live_id = (campaign_id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/campaign/${campaign_id}/live/update/`, data)
}

export const delete_platform_live_id = (campaign_id,platform, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/campaign/${campaign_id}/live/delete/${platform}`)
}

export const check_facebook_page_token = (page_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/check_facebook_page_token/?facebook_page_id=${page_id}`)
}

export const check_instagram_profile_token = (page_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/check_instagram_profile_token/?instagram_profile_id=${page_id}`)
}

export const check_youtube_channel_token = (page_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/check_youtube_channel_token/?youtube_channel_id=${page_id}`)
}

export const list_delivery_setting = (toastify=null) => {
    return createAxios(toastify).get('/api/v2/campaign/delivery/setting/list/')
}

export const update_delivery_setting = (data, toastify=null) => {
    return createAxios(toastify).put('/api/v2/campaign/delivery/setting/update/', data)
}
export const save_pages_info = (campaign_id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/campaign/${campaign_id}/save_pages_info/`,data)
}

export const create_campaign = (data, toastify=null) => {
    return createAxios(toastify).post('api/v2/campaign/create/', data)
}

export const update_campaign = (campaign_id, formData, toastify=null) => {
    return createAxios(toastify).put(`api/v2/campaign/${campaign_id}/update/`, formData)
}

export const retrieve_campaign = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`api/v2/campaign/${campaign_id}/retrieve/`)
}

export const buyer_retrieve_campaign = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`api/v2/campaign/${campaign_id}/buyer/retrieve`)
}

export const comment_on_comment = (campaign_id,comment_id,message_text, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/facebook/comment-on-comment/?campaign_id=${campaign_id}&comment_id=${comment_id}&message=${message_text}`)
}

export const nest_comment = (campaign_id,comment_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/facebook/comment-reply/?campaign_id=${campaign_id}&comment_id=${comment_id}`)
}

export const toggle_stop_checkout = (campaign_id,status, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/stop_checkout/toggle/?campaign_id=${campaign_id}`)
}


export const list_campaign = (status,searchColumn,keyword,order_by,page,page_size, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/list/?status=${status}&searchColumn=${searchColumn}&keyword=${keyword}&order_by=${order_by}&page=${page}&page_size=${page_size}`)
}


export const fast_add_product = (campaign_id, data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/campaign/${campaign_id}/product/add/fast/`, data)
}

export const get_campaign_order_report = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/${campaign_id}/report/`,{responseType : 'blob'})
}

export const get_campaign_product_order_code_dict = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/${campaign_id}/product/order_code/dict/`)
}

export const delete_campaign = (campaign_id, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/campaign/${campaign_id}/delete/`)
}

export const get_campaign_statistics = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/${campaign_id}/statistics/`)
}

export const get_campaign_setup_status = (campaign_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/${campaign_id}/setup/status/`)
}

export const get_short_link = (campaign_id, type, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/${campaign_id}/link/short/?type=${type}`)
}