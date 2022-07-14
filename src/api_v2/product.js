import { createAxiosWithBearer } from '@/libs/axiosClient'

export const retrieve_product = (id) => {
    return createAxiosWithBearer().get(`/api/v2/product/${id}/retrieve/`)
}

export const list_product = (pageSize, currentPage, searchColumn, keyword, product_status, product_type, category, exclude='') => {
    return createAxiosWithBearer().get(`/api/v2/product/search/?page_size=${pageSize}&page=${currentPage}&search_column=${searchColumn}&keyword=${keyword}&product_status=${product_status}&product_type=${product_type}&category=${category}&exclude=${exclude}`)
}

export const create_product = (data) => {
    return createAxiosWithBearer().post('/api/v2/product/create/', data)
}

export const update_product = (id, data) => {
    return createAxiosWithBearer().put(`/api/v2/product/${id}/update/`, data)
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