import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "@/libs/axiosClient";


export const search_discount_codes = (queryParams) =>{
    return createUserAxios().get(`/api/v3/lss/discount_code/search/${createQueryParams(queryParams)}`);
}

export const retrieve_discount_code = (discount_code_uuid) =>{
    return createUserAxios().get(`/api/v3/lss/discount_code/${discount_code_uuid}/retrieve/`);
}
