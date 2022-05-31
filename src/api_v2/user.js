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


export const seller_login_with_facebook = data =>{
    return axiosInstance.post(`/api/v2/user/seller/login/facebook/`,data);
}

export const seller_login_with_google = data =>{
    return axiosInstance.post(`/api/v2/user/seller/login/google/`,data);
}

export const get_seller_account = () =>{
    return createAxiosWithBearer().get(`/api/v2/user/seller/account/`);
}