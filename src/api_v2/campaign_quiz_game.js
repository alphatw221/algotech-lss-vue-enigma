import { createAxiosWithBearer } from "@/libs/axiosClient";


export const create_campaign_quiz_game = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-quizgame/${campaign_id}/create/`, data)
}

export const update_campaign_quiz_game = (quizgame_id, data) => {
    return createAxiosWithBearer().put(`/api/v2/campaign-quizgame/${quizgame_id}/update/`, data)
}

export const delete_campaign_quiz_game = (quizgame_id) => {
    return createAxiosWithBearer().delete(`/api/v2/campaign-quizgame/${quizgame_id}/delete/`)
}

export const retrieve_campaign_quiz_game = (quizgame_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-quizgame/${quizgame_id}/retrieve/`)
}

export const list_campaign_quiz_game = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-quizgame/${campaign_id}/list/`)
}

export const start_campaign_quiz_game = (quizgame_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-quizgame/${quizgame_id}/start/`)
}

export const stop_campaign_quiz_game = (quizgame_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-quizgame/${quizgame_id}/stop/`)
}