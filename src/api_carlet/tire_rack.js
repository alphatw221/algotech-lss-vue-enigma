// import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "@/libs/axiosClient";

import { createAxios, createAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "@/libs/axiosClient";

export const search_tire_rack_vehicles = (query) =>{
    return createAxios().get(`/carlet/tire_rack/vehicles${createQueryParams(query)}`);
}

