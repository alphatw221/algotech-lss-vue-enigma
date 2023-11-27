import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "@/libs/axiosClient";


export const search_customers = (queryParams) =>{
    return createUserAxios().get(`/api/v3/lss/customer/search/${createQueryParams(queryParams)}`);
}

export const retrieve_customer = (customer_uuid) =>{
    return createUserAxios().get(`/api/v3/lss/customer/${customer_uuid}/retrieve/`);
}
