import { createAxiosWithBearer } from '@/libs/axiosClient'

export const list_category = () => {
    return createAxiosWithBearer().get('/api/v2/product/list/category')
}

export const create_category = (name) => {
    return createAxiosWithBearer().post(`/api/v2/product/create/category/?category_name=${name}`)
}

export const update_category = (old_category, new_category) => {
    return createAxiosWithBearer().post(`/api/v2/product/update/category/?old_category=${old_category}&new_category=${new_category}`)
}

export const delete_category = (name) => {
    return createAxiosWithBearer().delete(`/api/v2/product/delete/category/?category_name=${name}`)
}