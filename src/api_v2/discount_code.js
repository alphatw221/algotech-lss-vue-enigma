import { axiosInstance, createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";

// -------------guest------------------
export const retrieve_discount_code = (id) => {
    return createAxiosWithBearer().get(`/api/v2/discount-code/${id}/`)
}
export const list_discount_code = (pageSize, currentPage) => {
    return createAxiosWithBearer().get(`/api/v2/discount-code/list/?page_size=${pageSize}&page=${currentPage}`)
}
export const create_discount_code = (data) => {
    return createAxiosWithBearer().post(`/api/v2/discount-code/create/`, data)
}
export const update_discount_code = (id, data) => {
    return createAxiosWithBearer().put(`/api/v2/discount-code/${id}/update/`, data)
}
export const delete_discount_code = (id) => {
    return createAxiosWithBearer().delete(`/api/v2/discount-code/${id}/delete/`)
}




export const list_scheduled_campaign_options = () => {
    return createAxiosWithBearer().get(`/api/v2/campaign/list/scheduled/options/`)
}


export const discountCodeEndPoints={
    'getCampaigns':list_scheduled_campaign_options,


}