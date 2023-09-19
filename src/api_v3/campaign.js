import { createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const get_campaigns = (keyword, order_by, page, page_size, type) =>{
    return createUserAxios().get(`/api/v3/lss/campaign/search/?keyword=${keyword}&order_by=${order_by}&page=${page}&page_size=${page_size}&type=${type}`);
}

export const create_campaign = (data) =>{
    return createUserAxios().post(`/api/v3/lss/campaign/create/`, data);
}

export const update_campaign = (campaign_uuid, data) =>{
    return createUserAxios().put(`/api/v3/lss/campaign/${campaign_uuid}/update/`, data);
}
