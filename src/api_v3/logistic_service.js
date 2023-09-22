import { createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const update_user_logistic_services = (data) =>{
    return createUserAxios().put(`/api/v3/lss/logistic_service/update/`,data);
}

export const update_campaign_logistic_services = (campaign_uuid, data) =>{
    return createUserAxios().put(`/api/v3/lss/logistic_service/campaign/${campaign_uuid}/update`, data);
}

