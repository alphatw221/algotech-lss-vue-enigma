import { createAxios } from "@/libs/axiosClient";

export const admin_login = (data, toastify=null) => {
    return createAxios(toastify).post(`/token/`,data);
};

export const seller_validate_register = (countryCode,data, toastify=null) =>{
    return createAxios(toastify).post(`/api/user/register/validate/${countryCode}/`,data);
}

export const seller_login = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/user/user_login/`, data);
}

export const get_seller_account = (toastify=null) =>{
    
    return createAxios(toastify).get(`/api/user/seller/account/`);
}

export const buyer_login = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/user/customer_login/`,data);
}

export const general_login = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/user/login/general/`, data);
}

export const retrieve_user = (id, toastify=null) => {
    return createAxios(toastify).get(`/user/${id}`);
};

export const update_user = (id,data, toastify=null) => {
    return createAxios(toastify).put(`/user/${id}`, data);
};

export const list_user = (toastify=null) => {
    return createAxios(toastify).get('/api/user/list/');
};

export const create_valid_api_user = (data, toastify=null) => {
    return createAxios(toastify).post('/api/user/create_valid_api_user/', data);
};

export const get_buyer_profile_images = (toastify=null) => {
    return createAxios(toastify).get('/api/user/buyer_profile_images/');
};

// export const whatever_post_api = data => {
//     return this.axios.post(`/watever_post_path` , data);
// };


export const reset_password = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/user/password/reset/`, data);
}

export const forgot_password = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/user/password/forgot/`, data);
}

export const user_email = (data, toastify=null) =>{
    return createAxios(toastify).post(`/api/user/email/`, data);
}

export const get_seller_information =(toastify=null)=>{
    return createAxios(toastify).get(`/api/user-subscription/me/`);
}

export const get_user_plan_information = (toastify=null) =>{
    return createAxios(toastify).get(`/api/user-subscription/plan/`);
}

