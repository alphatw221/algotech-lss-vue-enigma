import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const buyer_login_with_facebook = data =>{
    return axiosInstance.post(`/api/v2/user/buyer/login/facebook/`,data);
}

export const buyer_login_with_google = data =>{
    return axiosInstance.post(`/api/v2/user/buyer/login/google/`,data);
}
export const get_buyer_account = () =>{
    return createAxiosWithBearer().get(`/api/v2/user/buyer/account/`);
}


export const seller_general_login = data =>{
    return axiosInstance.post(`/api/v2/user/seller/login/general/`,data);
}

export const seller_login_with_facebook = data =>{
    return axiosInstance.post(`/api/v2/user/seller/login/facebook/`,data);
}

export const seller_login_with_google = data =>{
    return axiosInstance.post(`/api/v2/user/seller/login/google/`,data);
}

export const get_seller_account = () =>{
    return createAxiosWithBearer().get(`/api/v2/user/seller/account/`);
}

export const seller_change_password = (data) => {
    return createAxiosWithBearer().post(`/api/v2/user/seller/password/change/`, data);
}

export const seller_changePlan_payment = data =>{
    return createAxiosWithBearer().post(`/api/user-subscription/upgrade/intent/`, data);
}

export const seller_upgrade = data =>{
    return createAxiosWithBearer().post(`/api/user-subscription/upgrade/`, data);
}

export const seller_update_language = (data,language) =>{
    return createAxiosWithBearer().put(`/api/v2/user/seller/language/${language}`);
}