import { createAxios } from '@/libs/axiosClient'


export const list_product_category = (toastify=null) => {
    return createAxios(toastify).get(`/api/v2/product-category/list/`)
}

export const retrieve_product_category = (product_category_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/product-category/${product_category_id}/retrieve/`)
}

export const create_product_category = (data, toastify=null) => {
    return createAxios(toastify).post('/api/v2/product-category/create/', data)
}

export const update_product_category = (product_category_id, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/product-category/${product_category_id}/update/`, data)
}

export const delete_product_category = (product_category_id, toastify=null) => {
    return createAxios(toastify).delete(`/api/v2/product-category/${product_category_id}/delete/`)
}


