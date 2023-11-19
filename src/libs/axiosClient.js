import { usePublicLayoutStore } from "@/stores/lss-public-layout";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useLSSDealerLayoutStore } from "@/stores/lss-dealer-layout"
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { useRoute, useRouter } from 'vue-router';
import axios from "axios";
import i18n from "@/locales/i18n";
import { useCookies } from "vue3-cookies";
import {ref} from "vue"
import { useToast } from "vue-toastification";

const toast = useToast();

const { cookies } = useCookies();
// change current language for i18n

// const browserLang = window.navigator.language.toLowerCase()
// const browserLangToVueLang = {
//     "en": "en",
//     "zh-cn": "zh_hans",
//     "zh-hk": "zh_hans",
//     "zh-tw": "zh_hant",
//     "vi": "vi"
// }
// i18n.global.locale.value = browserLangToVueLang[browserLang]
// //

// var reload = null
// var errorAlreadyShown = false

// const get_i18n_path = error=>{
//     let path = ""
//     const contain_main_error_types = ["helper", "util", "stripe", "error_handler"].some(element => {
//         if (error.response.data.message.includes(element)) {
//           return true;
//         }
//         return false;
//       });
//     if (contain_main_error_types) {
//         path = "error_messages" + "." + error.response.data.message
//     } else if (error.response.config.url.includes("v2")) {
//         console.log(error.response.config.url.split("/").splice(0,4).join("."))
//         path = "error_messages" + error.response.config.url.split("/").splice(0,4).join(".") + "." + error.response.data.message
//     } else {
//         path = "error_messages" + error.response.config.url.split("/").splice(0,3).join(".") + "." + error.response.data.message
//     }
//     return path
// }

// const get_i18n_params = params=>{
//     let i18n_params = []
//     if(params){
//         Object.entries(params).forEach(([key, value]) => {
//             i18n_params[key] = i18n.global.t(`error_messages.params.${value}`)
//         }); 
//     }
//     return i18n_params
// }

// const axiosInstanceForBuyerLayout = axios.create({
//     baseURL: import.meta.env.VITE_APP_ROOT_API,
// })
// axiosInstanceForBuyerLayout.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response?.data?.detail){
//             useLSSBuyerLayoutStore().alert.showMessageToast(error.response.data.detail)
//         } else if (error.response?.data?.message){
//             console.log(response?.data?.params)
//             useLSSBuyerLayoutStore().alert.showMessageToast(i18n.global.t(get_i18n_path(error),error.response?.data?.params))
//         } else{
//             useLSSBuyerLayoutStore().alert.showMessageToast('error ! please refresh the page.')
//         }
//         return Promise.reject(error);
//     }
// );


export function createAxiosWithoutInterceptor(){

    const headers = {}
    if(cookies.get("user_access_token")) headers.Authorization = `Bearer ${cookies.get("user_access_token")}`

    return axios.create({
        baseURL: import.meta.env.VITE_APP_ROOT_API,
        headers: headers,
    })
}

export function createAxios(){

    const headers = {}
    if(cookies.get("user_access_token")) headers.Authorization = `Bearer ${cookies.get("user_access_token")}`
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_APP_ROOT_API,
        headers: headers,
    })

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            return Promise.reject(error);
        }
    );
    return axiosInstance
}



export function createUserAxiosWithoutInterceptor(){

    const headers = {}
    if(cookies.get("user_access_token")) headers.Authorization = `Bearer ${cookies.get("user_access_token")}`

    return axios.create({
        baseURL: import.meta.env.VITE_APP_ROOT_API,
        headers: headers,
    })
}

export function createUserAxios(){

    const headers = {}
    if(cookies.get("user_access_token")) headers.Authorization = `Bearer ${cookies.get("user_access_token")}`
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_APP_ROOT_API,
        headers: headers,
    })

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            toast.error(error?.message||error?.code)
            return Promise.reject(error);
        }
    );
    return axiosInstance
}


export function createCustomerAxiosWithoutInterceptor(){

    const headers = {}
    if(cookies.get("customer_access_token")) headers.Authorization = `Bearer ${cookies.get("customer_access_token")}`

    return axios.create({
        baseURL: import.meta.env.VITE_APP_ROOT_API,
        headers: headers,
    })
}

export function createCustomerAxios(){

    const headers = {}
    if(cookies.get("customer_access_token")) headers.Authorization = `Bearer ${cookies.get("customer_access_token")}`
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_APP_ROOT_API,
        headers: headers,
    })

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            return Promise.reject(error);
        }
    );
    return axiosInstance
}

export function createQueryParams(query){

    var queryParams = '?'
    Object.entries(query).forEach(([key, value]) => {
        queryParams+=`${key}=${value}&`
    });
    return queryParams
}
