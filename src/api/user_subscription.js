import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";

// ('user_subscription_id','maximum_usage_count','interval')
export const create_activate_code = data => {
    console.log(data)
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

export const bind_user_facebook_pages = (data) => {
    return createAxiosWithBearer().post(`/api/user-subscription/v2/bind_facebook_pages/`, data)
}
export const bind_user_instagram_profiles = (data) => {
    return createAxiosWithBearer().post(`/api/user-subscription/v2/bind_instagram_profiles/`, data)
}
export const bind_user_youtube_channels = (data) => {
    return createAxiosWithBearer().post(`/api/user-subscription/bind_youtube_channels/`, data)
}
