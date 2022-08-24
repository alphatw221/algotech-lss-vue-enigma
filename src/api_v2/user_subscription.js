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

export const unbind_platform_instance = (platform_name, platform_instance_id) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/platform/${platform_name}/unbind/?instance_id=${platform_instance_id}`)
}

export const bind_platform_instances = (platform_name, data) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/platform/${platform_name}/bind/`,data)
}

export const bind_twitch_platform_instances = (platform_name, channel_name, data) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/platform/${platform_name}/bind/?channel_name=${channel_name}`, data)
}

export const get_platform_instances = (platform_name) => {
    return createAxiosWithBearer().get(`/api/v2/user-subscription/platform/${platform_name}/`)
}

export const upload_animation = (data) => {
    return createAxiosWithBearer().post(`/api/v2/user-subscription/seller/upload/animation/`, data)     
}