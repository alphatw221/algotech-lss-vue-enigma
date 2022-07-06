import { createAxiosWithBearer , Paginator} from "@/libs/axiosClient";

export const create_campapign_lucky_draw = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/campaign-luckydraw/${campaign_id}/create/`, data)
}