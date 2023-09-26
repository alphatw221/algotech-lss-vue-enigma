import { createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const get_campaigns = (keyword, order_by, page, page_size, type) =>{
    return createUserAxios().get(`/api/v3/lss/campaign/search/?keyword=${keyword}&order_by=${order_by}&page=${page}&page_size=${page_size}&type=${type}`);
}

export const retrieve_campaign = (campaign_uuid) =>{
    return createUserAxios().get(`/api/v3/lss/campaign/${campaign_uuid}/retrieve/`);
}

export const create_campaign = (data) =>{
    return createUserAxios().post(`/api/v3/lss/campaign/create/`, data);
}

export const update_campaign = (campaign_uuid, data) =>{
    return createUserAxios().put(`/api/v3/lss/campaign/${campaign_uuid}/update/`, data);
}


export const update_campaign_general = (campaign_uuid, data) =>{
    return createUserAxios().put(`/api/v3/lss/campaign/${campaign_uuid}/general/update/`, data);
}

export const update_campaign_payment_services = (campaign_uuid, data) =>{
    return createUserAxios().put(`/api/v3/lss/campaign/${campaign_uuid}/payment/update/`, data);
}

export const update_campaign_logistic_services = (campaign_uuid, data) =>{
    return createUserAxios().put(`/api/v3/lss/campaign/${campaign_uuid}/logistic/update/`, data);
}

export const update_campaign_reply_settings = (campaign_uuid, data) =>{
    return createUserAxios().put(`/api/v3/lss/campaign/${campaign_uuid}/reply_settings/update/`, data);
}

export const update_campaign_point_settings = (campaign_uuid, data) =>{
    return createUserAxios().put(`/api/v3/lss/campaign/${campaign_uuid}/point_settings/update/`, data);
}

export const update_campaign_note_settings = (campaign_uuid, data) =>{
    return createUserAxios().put(`/api/v3/lss/campaign/${campaign_uuid}/note_settings/update/`, data);
}
