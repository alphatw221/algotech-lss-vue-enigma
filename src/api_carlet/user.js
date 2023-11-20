import { createAxios, createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const user_login = (username, password) =>{

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    return createAxios().post(`/token/`,formData);
}

export const get_user_account = () =>{
    return createAxios().get(`/users/me`);
}
