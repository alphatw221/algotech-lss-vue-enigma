import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";

// -------------guest------------------

export const list_auto_response = (pageSize, currentPage) => {
    return createAxiosWithBearer().get(`/api/v2/auto-response/list/?page_size=${pageSize}&page=${currentPage}`)
}
export const create_auto_response = (platform_name,platform_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/auto-response/create/${platform_name}/${platform_id}/`, data)
}
export const update_auto_response = (id, data) => {
    return createAxiosWithBearer().put(`/api/v2/auto-response/${id}/update/`, data)
}
export const delete_auto_response = (id) => {
    return createAxiosWithBearer().delete(`/api/v2/auto-response/${id}/delete/`)
}