import { createAxiosWithBearer } from "@/libs/axiosClient";


export const create_campaign_quiz_game = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-quizgame/${campaign_id}/create/`, data)
}

export const list_campaign_quiz_game = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-quizgame/${campaign_id}/list/`)
}