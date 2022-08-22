import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";

// ('user_subscription_id','maximum_usage_count','interval')
export const create_activate_code = data => {
    // console.log(data)
    return axiosInstance.post(`/create_activate_code/`,data);
};

export const get_user_subscription_facebook_pages = () => {
    return createAxiosWithBearer().get(`/api/user-subscription/facebook_pages/`)
}


export const get_user_subscription_youtube_channels = () => {
    return createAxiosWithBearer().get(`/api/user-subscription/youtube_channels/`)
}

export const get_user_subscription_instagram_profiles = () => {
    return createAxiosWithBearer().get(`/api/user-subscription/instagram_profiles/`)
}

export const get_user_subscription_twitch_channels = () => {
    return createAxiosWithBearer().get(`/api/v2/user-subscription/twitch_channel/`)
}

export const bind_user_facebook_pages = (data) => {
    return createAxiosWithBearer().post(`/api/user-subscription/v2/bind_facebook_pages/`, data)
}
export const bind_user_instagram_profiles = (data) => {
    return createAxiosWithBearer().post(`/api/user-subscription/v2/bind_instagram_profiles/`, data)
}
export const bind_user_youtube_channels = (data) => {
    return createAxiosWithBearer().post(`/api/user-subscription/bind_youtube_channels/`, data)
}


export const unbind_facebook_page = (data) => {
    return createAxiosWithBearer().put(`/api/user-subscription/unbind_facebook_page/`, data)
}

export const unbind_instagram_profile = (data) => {
    return createAxiosWithBearer().put(`/api/user-subscription/unbind_instagram_profile/`, data)
}

export const unbind_youtube_channel = (data) => {
    return createAxiosWithBearer().put(`/api/user-subscription/unbind_youtube_channel/`, data)
}

export const check_activated_platform = (data) => {
    return createAxiosWithBearer().get("/api/user-subscription/check_activated_platform/")
}

export const seller_changePlan_payment = data =>{
    return createAxiosWithBearer().post(`/api/v2/user-subscription/upgrade/intent/`, data);
}

export const seller_upgrade = data =>{
    return createAxiosWithBearer().post(`/api/user-subscription/upgrade/`, data);
}

export const seller_validate_register = (countryCode,data) =>{
    return axiosInstance.post(`/api/user/register/validate/${countryCode}/`,data);
}