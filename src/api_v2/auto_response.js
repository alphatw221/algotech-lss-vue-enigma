import { createAxios } from "@/libs/axiosClient";



// -------------seller------------------
export const list_auto_response = (pageSize, currentPage, keyword, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/auto-response/list/?page_size=${pageSize}&page=${currentPage}&keyword=${keyword}`)
}
export const create_auto_response = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/auto-response/create/`, data)
}
export const update_auto_response = (id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/auto-response/${id}/update/`, data)
}
export const delete_auto_response = (id, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/auto-response/${id}/delete/`)
}
export const batch_delete_auto_response = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/auto-response/batch/delete/`, data)
}