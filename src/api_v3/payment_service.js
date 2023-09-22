import { createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const update_user_payment_services = (data) =>{
    return createUserAxios().put(`/api/v3/lss/payment_service/update/`,data);
}

export const update_campaign_payment_services = (campaign_uuid, data) =>{
    return createUserAxios().put(`/api/v3/lss/payment_service/campaign/${campaign_uuid}/update`, data);
}

