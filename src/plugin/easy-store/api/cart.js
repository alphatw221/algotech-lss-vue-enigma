import { axiosInstance, createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";


export const buyer_login_with_facebook = data =>{
    return axiosInstance.post(`/api/v2/user/buyer/login/facebook/`,data);
}


export const get_buyer_account = () =>{
    return createAxiosWithBearerWithoutInterceptor().get(`/api/v2/user/buyer/account/`);
}

