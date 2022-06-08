import { createAxiosWithBearer } from '@/libs/axiosClient'


export const list = (pageSize, currentPage, searchColumn, keyword, product_status, category) => {
    return createAxiosWithBearer().get(`/api/v2/product/search/?page_size=${pageSize}&page=${currentPage}&search_column=${searchColumn}&keyword=${keyword}&product_status=${product_status}&category=${category}`)
}

export const create = (data) => {
    return createAxiosWithBearer().get('/api/v2/product/create/', data)
}

export const update = (id, data) => {
    return createAxiosWithBearer().get(`/api/v2/product/${id}/create/`, data)
}

export const list_category = () => {
    return createAxiosWithBearer().get('/api/v2/product/categories/')
}

export const create_category = (data) => {
    return createAxiosWithBearer().post(`/api/v2/product/category/create/`, data)
}

export const update_category = (name, data) => {
    return createAxiosWithBearer().put(`/api/v2/product/category/update/${name}/`, data)
}

export const delete_category = (name) => {
    return createAxiosWithBearer().delete(`/api/v2/product/category/delete/${name}/`)
}