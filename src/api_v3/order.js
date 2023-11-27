import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "@/libs/axiosClient";


export const search_orders = (queryParams) =>{
    return createUserAxios().get(`/api/v3/lss/order/search/${createQueryParams(queryParams)}`);
}

export const retrieve_order = (order_uuid) =>{
    return createUserAxios().get(`/api/v3/lss/order/${order_uuid}/retrieve/`);
}
