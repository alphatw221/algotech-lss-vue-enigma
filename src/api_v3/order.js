import { createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const get_orders = (keyword, order_by, page, page_size, type) =>{
    return createUserAxios().get(`/api/v3/lss/order/search/?keyword=${keyword}&order_by=${order_by}&page=${page}&page_size=${page_size}&type=${type}`);
}

export const retrieve_order = (order_uuid) =>{
    return createUserAxios().get(`/api/v3/lss/order/${order_uuid}/retrieve/`);
}
