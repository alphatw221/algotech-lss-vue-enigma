import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "@/libs/axiosClient";


export const search_carlet_vehicles = (query) =>{
    return createUserAxios().get(`/carlet/vehicles/${createQueryParams(query)}`);
}

