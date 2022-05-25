import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const buyer_login_with_facebook = data =>{
    return axiosInstance.post(`/api/v2/buyer/login/facebook/`,data);
}

export const buyer_login_with_google = data =>{
    return axiosInstance.post(`/api/v2/buyer/login/google/`,data);
}



export const seller_login_with_facebook = data =>{
    return axiosInstance.post(`/api/v2/seller/login/facebook/`,data);
}

export const seller_login_with_google = data =>{
    return axiosInstance.post(`/api/v2/seller/login/google/`,data);
}