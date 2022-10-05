import { createAxios, createAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const buyer_login_with_facebook = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user/buyer/login/facebook/`,data);
}

export const buyer_login_with_google = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user/buyer/login/google/`,data);
}
export const get_buyer_account = (toastify=null) =>{
    return createAxios(toastify).get(`/api/v2/user/buyer/account/`);
}


export const seller_general_login = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user/seller/login/general/`,data);
}

export const seller_login_with_facebook = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user/seller/login/facebook/`,data);
}

export const seller_login_with_google = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user/seller/login/google/`,data);
}

export const get_seller_account = () =>{
    return createAxiosWithoutInterceptor().get(`/api/v2/user/seller/account/`);
}

export const seller_change_password = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/user/seller/password/change/`, data);
}

export const seller_reset_password = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/user/seller/password/reset/`, data);
}

export const seller_forgot_password = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/user/seller/password/forgot/`, data);
}

export const seller_validate_register = (countryCode,data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user/register/validate/${countryCode}/`,data);
}

export const seller_register_stripe = (countryCode,data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user/register/${countryCode}/stripe/`,data);
}

export const user_register_with_bank_transfer = (countryCode,data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user/register/${countryCode}/transfer/`,data);
}

export const user_register_with_ecpay = (countryCode,data, toastify=null) =>{
    return createAxios(toastify).post(`/api/v2/user/register/${countryCode}/ecpay/`,data);
}



export const dealer_login = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/user/dealer/login/`,data);
};

export const dealer_verify_code = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/user/dealer/verify_code/`,data);
};





//--------------------------------------admin------------------------------------------
export const get_admin_account = () =>{
    return createAxiosWithoutInterceptor().get(`/api/v2/user/admin/account/`);
}

export const admin_login = (data, toastify=null) => {
    return createAxios(toastify).post(`/api/v2/user/admin/login/`,data);
};

export const admin_import_account = (data) => {
    return createAxiosWithoutInterceptor().post(`/api/v2/user/admin/import/`,data);
};