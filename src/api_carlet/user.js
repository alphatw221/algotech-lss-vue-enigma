import { createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const user_login = (data) =>{
    return createUserAxios().post(`/api/v3/lss/user/login/`,data);
}

export const get_user_account = () =>{
    return createUserAxios().get(`/api/v3/lss/user/account/`);
}

