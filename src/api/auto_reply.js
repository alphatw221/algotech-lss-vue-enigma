import { createAxiosWithBearer } from "@/libs/axiosClient";

export const auto_response_list = () => {
    return createAxiosWithBearer().get(`/api/auto_response/list/`)
} 
export const create_auto_response = (platform_name,platform_id, data) => {
    return createAxiosWithBearer().post(`/api/auto_response/create/${platform_name}/${platform_id}/`, data)
}
export const update_auto_response = (id, data) => {
    return createAxiosWithBearer().put(`/api/auto_response/${id}/update/`, data)
}
export const delete_auto_response = (id) => {
    return createAxiosWithBearer().delete(`/api/auto_response/${id}/delete/`)
}