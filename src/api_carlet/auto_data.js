// import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "@/libs/axiosClient";
import { createAxios, createAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "@/libs/axiosClient";


export const search_auto_data_vehicles = (query) =>{
    return createAxios().get(`/carlet/auto_data/vehicles${createQueryParams(query)}`);
}

