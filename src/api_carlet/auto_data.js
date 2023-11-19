import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "@/libs/axiosClient";


export const search_auto_data_vehicles = (query) =>{
    return createUserAxios().get(`/auto_data/vehicles/${createQueryParams(query)}`);
}

