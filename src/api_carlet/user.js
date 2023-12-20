import { createAxios, createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const user_login = (username, password) =>{

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    return createAxios().post(`/carlet/api/v2/auth/users/token`,formData);
}

export const get_user_account = () =>{
    return createAxios().get(`/carlet/api/v2/auth/users/me`);
}
