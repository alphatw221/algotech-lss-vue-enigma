import { createAxiosWithBearer } from "@/libs/axiosClient";


export const create_campaign_quiz_game = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-quizgame/${campaign_id}/create/`, data)
}

export const list_campaign_quiz_game = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-quizgame/${campaign_id}/list/`)
}

export const start_campaign_quiz_game = (quiz_game_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-quizgame/${quiz_game_id}/start/`)
}