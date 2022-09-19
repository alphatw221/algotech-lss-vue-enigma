import { createAxiosWithBearer, axiosInstance } from '@/libs/axiosClient'

export const retrieve_product = (id) => {
    return createAxiosWithBearer().get(`/api/v2/product/${id}/retrieve/`)
}

export const list_product = (pageSize, currentPage, searchColumn, keyword, product_status, product_type, category, exclude='', sort_by) => {
    return createAxiosWithBearer().get(`/api/v2/product/search/?page_size=${pageSize}&page=${currentPage}&search_column=${searchColumn}&keyword=${keyword}&product_status=${product_status}&product_type=${product_type}&category=${category}&exclude=${exclude}&sort_by=${sort_by}`)
}

export const create_product = (data) => {
    return createAxiosWithBearer().post('/api/v2/product/create/', data)
}

export const update_product = (id, data) => {
    return createAxiosWithBearer().put(`/api/v2/product/${id}/update/`, data)
}

export const bulk_update_product = (data) => {
    return createAxiosWithBearer().put(`/api/v2/product/bulk/update/`, data)
}

export const delete_product = (id) => {
    return createAxiosWithBearer().delete(`/api/v2/product/${id}/delete/`)
}

export const copy_product = (id) => {
    return createAxiosWithBearer().post(`/api/v2/product/${id}/copy/`)
}

export const list_product_category = () => {
    return createAxiosWithBearer().get('/api/v2/product/categories/')
}

export const create_product_category = (data) => {
    return createAxiosWithBearer().post(`/api/v2/product/category/create/`, data)
}

export const update_product_category = (name, data) => {
    return createAxiosWithBearer().put(`/api/v2/product/category/update/${name}/`, data)
}

export const delete_product_category = (name) => {
    return createAxiosWithBearer().delete(`/api/v2/product/category/delete/${name}/`)
}

export const wish_list_add = (id,email) => {
    return createAxiosWithBearer().post(`/api/v2/product/${id}/wish_list/add/`,{'email':email})
}

export const wish_list_send_email = (id) => {
    return createAxiosWithBearer().get(`/api/v2/product/${id}/wish_list/send/email`)
}