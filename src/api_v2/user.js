import { axiosInstance, createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";


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

export const seller_reset_password = (data) => {
    return axiosInstance.post(`/api/v2/user/seller/password/reset/`, data);
}

export const seller_forgot_password = (data) => {
    return axiosInstance.post(`/api/v2/user/seller/password/forgot/`, data);
}

export const seller_validate_register = (countryCode,data) =>{
    return axiosInstance.post(`/api/v2/user/register/validate/${countryCode}/`,data);
}

export const seller_register_stripe = (countryCode,data) =>{
    return axiosInstance.post(`/api/v2/user/register/${countryCode}/stripe/`,data);
}

export const user_register_with_bank_transfer = (countryCode,data) =>{
    return axiosInstance.post(`/api/v2/user/register/${countryCode}/transfer/`,data);
}

export const user_register_with_ecpay = (countryCode,data) =>{
    return axiosInstance.post(`/api/v2/user/register/${countryCode}/ecpay/`,data);
}

export const admin_login = data => {
    return axiosInstance.post(`/api/v2/user/admin/login/`,data);
};

export const dealer_login = data => {
    return axiosInstance.post(`/api/v2/user/dealer/login/`,data);
};