import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";

export const admin_login = data => {
    console.log(data)
    return axiosInstance.post(`/token/`,data);
};

export const seller_validate_register = (countryCode,data) =>{
    return axiosInstance.post(`/api/user/register/validate/${countryCode}/`,data);
}

export const seller_login = data =>{
    return axiosInstance.post(`/api/user/user_login/`, data);
}

export const get_seller_account = () =>{
    
    return createAxiosWithBearer().get(`/api/user/seller/account/`);
}

export const buyer_login = data =>{
    return axiosInstance.post(`/api/user/customer_login/`,data);
}

export const general_login = data =>{
    return axiosInstance.post(`/api/user/login/general/`, data);
}

export const retrieve_user = id => {
    console.log(id)
    return createAxiosWithBearer().get(`/user/${id}`);
};

export const update_user = (id,data) => {
    console.log(id)
    return createAxiosWithBearer().put(`/user/${id}`, data);
};

export const list_user = () => {
    return createAxiosWithBearer().get('/api/user/list/');
};

export const create_valid_api_user = data => {
    return createAxiosWithBearer().post('/api/user/create_valid_api_user/', data);
};

export const get_buyer_profile_images = () => {
    return createAxiosWithBearer().get('/api/user/buyer_profile_images/');
};

// export const whatever_post_api = data => {
//     return this.axios.post(`/watever_post_path` , data);
// };


export const reset_password = data =>{
    return axiosInstance.post(`/api/user/password/reset/`, data);
}

export const forgot_password = data =>{
    return axiosInstance.post(`/api/user/password/forgot/`, data);
}

export const user_email = data =>{
    return axiosInstance.post(`/api/user/email/`, data);
}

export const get_seller_information =()=>{
    return createAxiosWithBearer().get(`/api/user-subscription/me/`);
}

export const get_user_plan_information = () =>{
    return createAxiosWithBearer().get(`/api/user-subscription/plan/`);
}

