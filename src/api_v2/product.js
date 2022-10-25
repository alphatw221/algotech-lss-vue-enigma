import { createAxios } from '@/libs/axiosClient'

export const retrieve_product = (id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/product/${id}/retrieve/`)
}

export const search_product = (pageSize, currentPage, searchColumn, keyword, product_status, product_type, categoryID, exclude='', sort_by='', toastify=null) => {
    return createAxios(toastify).get(`/api/v2/product/search/?page_size=${pageSize}&page=${currentPage}&search_column=${searchColumn}&keyword=${keyword}&product_status=${product_status}&product_type=${product_type}&category_id=${categoryID}&exclude=${exclude}&sort_by=${sort_by}`)
}

export const create_product = (data, toastify=null) => {
    return createAxios(toastify).post('/api/v2/product/create/', data)
}

export const update_product = (id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/product/${id}/update/`, data)
}

export const bulk_update_product = (data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/product/bulk/update/`, data)
}

export const delete_product = (id, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/product/${id}/delete/`)
}

export const copy_product = (id, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/product/${id}/copy/`)
}

export const list_product_category = (toastify=null) => {
    return createAxios(toastify).get('/api/v2/product/categories/')
}

export const create_product_category = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/product/category/create/`, data)
}

export const update_product_category = (name, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/product/category/update/${name}/`, data)
}

export const delete_product_category = (name, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/product/category/delete/${name}/`)
}



export const wish_list_send_email = (id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/product/${id}/wish_list/send/email`)
}

//----------------------------------buyer----------------------------------------
export const wish_list_add = (id,email, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/product/${id}/wish_list/add/`,{'email':email})
}