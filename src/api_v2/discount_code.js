import { createAxios } from "@/libs/axiosClient";

// -------------buyer------------------

export const buyer_list_discount_code = (cart_oid, type, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/discount-code/list/${cart_oid}/?type=${type}`)
}


// -------------seller------------------

export const retrieve_discount_code = (id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/discount-code/${id}/`)
}

export const list_discount_code = (pageSize, currentPage, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/discount-code/list/?page_size=${pageSize}&page=${currentPage}`)
}



export const create_discount_code = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/discount-code/create/`, data)
}

export const update_discount_code = (id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/discount-code/${id}/update/`, data)
}

export const delete_discount_code = (id, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/discount-code/${id}/delete/`)
}




export const list_scheduled_campaign_options = (toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign/list/scheduled/options/`)
}


export const discountCodeEndPoints={
    'getCampaigns':list_scheduled_campaign_options,


}