import { createAxios, createAxiosWithoutInterceptor } from "@/libs/axiosClient";



export const get_general_info = (toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/info/general/`)
}

export const update_general_info = (data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/update/info/general/`, data)
}

export const seller_update_subscription = (data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/seller/update/`,data)
}

export const seller_switch_subscription_mode = (data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/seller/switch_mode/`,data)
}

export const seller_update_payment = (paymentKey,data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/payment/${paymentKey}/`,data)
}

export const seller_update_delivery = (data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/delivery/`,data)
}

export const unbind_platform_all = (data, toastify=null) => {
    return createAxios(toastify).put("/api/v2/user-subscription/platform/unbind/all/", data)
}

export const unbind_platform_instance = (platform_name, platform_instance_id, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/platform/${platform_name}/unbind/?instance_id=${platform_instance_id}`)
}

export const bind_platform_instances = (platform_name, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/user-subscription/platform/${platform_name}/bind/`,data)
}

export const get_single_platform_instance = (platform_name, platform_instance_id, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/platform/${platform_name}/${platform_instance_id}/`)
}

export const get_platform_instances = (platform_name, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/platform/${platform_name}/`)
}

export const upload_animation = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/user-subscription/seller/upload/animation/`, data)     
}

export const sales_report = (start_time, end_time, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/sales_report/?start_time=${start_time}&end_time=${end_time}`)
}



export const list_animation = (toastify=null) => {
    return createAxios(toastify).get('/api/v2/user-subscription/list/animation/')
}

export const list_buyers = (keyword,page,page_size, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/list/buyers/?keyword=${keyword}&page=${page}&page_size=${page_size}`)
}

export const retrieve_buyer_history = (buyer_id,points_relative,page,page_size, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/user-subscription/retrieve/buyers/history/?buyer_id=${buyer_id}&points_relative=${points_relative}&page=${page}&page_size=${page_size}`)
}

export const seller_changePlan_payment = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user-subscription/upgrade/intent/`, data);
}

export const seller_upgrade = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user-subscription/upgrade/`, data);
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
