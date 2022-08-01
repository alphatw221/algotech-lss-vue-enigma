import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";



export const get_general_info = () => {
    return createAxiosWithBearer().get(`/api/v2/user-subscription/info/general/`)
}

export const update_general_info = (data) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/update/info/general/`, data)
}

export const seller_update_subscription = (data) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/seller/update/`,data)
}

export const seller_update_payment = (paymentKey,data) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/payment/${paymentKey}/`,data)
}

export const seller_update_delivery = (data) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/delivery/`,data)
}

export const unbind_platform_instance = (platform_name, data) => {
    return createAxiosWithBearer().put(`/api/user-subscription/platform/${platform_name}/unbind/`, data)
}

export const upload_animation = (data) => {
    return createAxiosWithBearer().post(`/api/v2/user-subscription/seller/upload/animation/`, data)     
}