import { createAxiosWithBearer , Paginator} from "@/libs/axiosClient";


export const list_campaign_lucky_draw = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-luckydraw/${campaign_id}/list/`)
}

export const list_campapign_lucky_draw_animation = () => {
    return createAxiosWithBearer().get('/api/v2/campaign-luckydraw/list/animation/')
}

export const list_campaign_lucky_draw_winners = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-luckydraw/${campaign_id}/winners/`)    
}

export const create_campapign_lucky_draw = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-luckydraw/${campaign_id}/create/`, data)
}

export const update_campaign_lucky_draw = (lucky_draw_id, data) => {
    return createAxiosWithBearer().put(`/api/v2/campaign-luckydraw/${lucky_draw_id}/update/`, data)
}

export const retrieve_campaign_lucky_draw = (lucky_draw_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-luckydraw/${lucky_draw_id}/retrieve/`)
}

export const delete_campaign_lucky_draw = (lucky_draw_id) => {
    return createAxiosWithBearer().delete(`/api/v2/campaign-luckydraw/${lucky_draw_id}/delete/`)
}

export const draw_campaign_lucky_draw = (lucky_draw_id) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-luckydraw/${lucky_draw_id}/draw/`)
}