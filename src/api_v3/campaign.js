import { createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const get_campaigns = (keyword, order_by, page, page_size, type) =>{
    return createUserAxios().get(`/api/v3/lss/campaign/search/?keyword=${keyword}&order_by=${order_by}&page=${page}&page_size=${page_size}&type=${type}`);
}

