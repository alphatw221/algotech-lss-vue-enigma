import { createUserAxios, createUserAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const bind_social_platform_account = (platform, credentials) =>{
    return createUserAxios().post(`/api/v3/lss/social_platform_account/bind/`, {'platform':platform, 'credentials':credentials});
}


export const unbind_social_platform_account = (social_platform_account_uuid) =>{
    return createUserAxios().delete(`/api/v3/lss/social_platform_account/unbind/${social_platform_account_uuid}`);
}
// export const get_seller_account = () =>{
//     return createAxios().get(`/api/v2/user/seller/account/`);
// }


export const get_social_platform_account_videos = (social_platform_account_uuid) =>{
    return createUserAxios().get(`/api/v3/lss/social_platform_account/${social_platform_account_uuid}/videos/`);
}


export const get_social_platform_account_lives = (social_platform_account_uuid) =>{
    return createUserAxios().get(`/api/v3/lss/social_platform_account/${social_platform_account_uuid}/lives/`);
}