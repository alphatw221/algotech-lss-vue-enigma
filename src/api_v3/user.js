import { createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const user_login = (data) =>{
    return createUserAxios().post(`/api/v3/lss/user/login/`,data);
}

export const user_register = (data) =>{
    return createUserAxios().post(`/api/v3/lss/user/register/`,data);
}

export const user_forget_password = (email) =>{
    return createUserAxios().post(`/api/v3/lss/user/password/forget/`,{'email':email});
}


export const get_user_account = () =>{
    return createUserAxios().get(`/api/v3/lss/user/account/`);
}



// export const get_seller_account = () =>{
//     return createAxios().get(`/api/v2/user/seller/account/`);
// }
