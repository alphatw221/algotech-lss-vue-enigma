import { createAxios } from "@/libs/axiosClient";



export const get_general_info = (toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/info/general/`)
}

export const update_general_info = (data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/update/info/general/`, data)
}

export const seller_update_subscription = (data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/seller/update/`,data)
}

export const seller_update_payment = (paymentKey,data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/payment/${paymentKey}/`,data)
}

export const seller_update_delivery = (data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/delivery/`,data)
}

export const unbind_platform_instance = (platform_name, platform_instance_id, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/platform/${platform_name}/unbind/?instance_id=${platform_instance_id}`)
}

export const bind_platform_instances = (platform_name, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/platform/${platform_name}/bind/`,data)
}

export const bind_twitch_platform_instances = (platform_name, channel_name, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/platform/${platform_name}/bind/?channel_name=${channel_name}`, data)
}

export const get_platform_instances = (platform_name, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/platform/${platform_name}/`)
}

export const upload_animation = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/user-subscription/seller/upload/animation/`, data)     
}

export const get_user_subscription_facebook_pages = (data, toastify=null) => {
    return createAxios(toastify).get(`/api/user-subscription/facebook_pages/`,data)
}

// ------------------------- DEALER -------------------------------------

export const dealer_dashboard_card = (toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/dashboard/cards/`)
}

export const dealer_dashboard_members = (date_period,data, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/dashboard/members/growing/?date_period=${date_period}`,data)
}

export const dealer_period_revenue = (period,country_code,data, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/dashboard/period/revenue/?date_period=${period}&country_code=${country_code}`,data)
}

export const user_list_from_dealer = (data, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user/dealer/search/list`,data)
}
