import { createAxiosWithBearer , Paginator} from "@/libs/axiosClient";

export const create_campapign_lucky_draw = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-luckydraw/${campaign_id}/create/`, data)
}

export const list_campapign_lucky_draw_animation = () => {
    return createAxiosWithBearer().get('/api/v2/campaign-luckydraw/list/animation/')
}

export const list_campaign_lucky_draw = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-luckydraw/${campaign_id}/list/`)
}

export const retrieve_campaign_lucky_draw = (lucky_draw_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-luckydraw/${lucky_draw_id}/retrieve/`)
}

export const draw_campaign_lucky_draw = (lucky_draw_id) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-luckydraw/${lucky_draw_id}/draw/`)
}