import { createAxiosWithBearer } from "@/libs/axiosClient";

export const auto_response_list = () => {
    return createAxiosWithBearer().get(`/api/auto_response/list/`)
} 
export const create_auto_response = (platform_name,platform_id) => {
    return createAxiosWithBearer().post(`/api/auto_response/create/${platform_name}/${platform_id}/`)
}
export const update_auto_response = (data) => {
    return createAxiosWithBearer().put(`/api/auto_response/update/`,data)
}
export const delete_auto_response = (data) => {
    return createAxiosWithBearer().delete(`/api/auto_response/delete/`,data)
}