import { createAxios } from "@/libs/axiosClient";

export const auto_response_list = (toastify=null) => {
    return createAxios(toastify).get(`/api/auto_response/list/`)
} 
export const create_auto_response = (platform_name,platform_id, data, toastify=null) => {
    return createAxios(toastify).post(`/api/auto_response/create/${platform_name}/${platform_id}/`, data)
}
export const update_auto_response = (id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/auto_response/${id}/update/`, data)
}
export const delete_auto_response = (id, toastify=null) => {
    return createAxios(toastify).delete(`/api/auto_response/${id}/delete/`)
}