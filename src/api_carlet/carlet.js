import { createAxios, createAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "@/libs/axiosClient";


export const search_carlet_vehicles = (query) =>{
    return createAxios().get(`/carlet/api/v2/vehicles${createQueryParams(query)}`);
}

export const search_yahoo_vehicles = (query) =>{
    return createAxios().get(`/carlet/api/v2/yahoo/vehicles${createQueryParams(query)}`);
}

export const update_carlet_vehicle = (carlet_vehicle_id, data) =>{
    return createAxios().put(`/carlet/api/v2/vehicles/${carlet_vehicle_id}/update`, data);
}

export const update_auto_data_vehicle_id = (carlet_vehicle_id, auto_data_vehicle_id) =>{
    return createAxios().put(`/carlet/api/v2/vehicles/${carlet_vehicle_id}/mapping/auto_data`, {'auto_data_vehicle_id':auto_data_vehicle_id});
}

export const update_tire_rack_vehicle_id = (carlet_vehicle_id, tire_rack_vehicle_id) =>{
    return createAxios().put(`/carlet/api/v2/vehicles/${carlet_vehicle_id}/mapping/tire_rack`, {'tire_rack_vehicle_id':tire_rack_vehicle_id});
}

export const update_yahoo_vehicle_id = (carlet_vehicle_id, yahoo_vehicle_id) =>{
    return createAxios().put(`/carlet/api/v2/vehicles/${carlet_vehicle_id}/mapping/yahoo`, {'yahoo_vehicle_id':yahoo_vehicle_id});
}
