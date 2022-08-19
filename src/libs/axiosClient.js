import { usePublicLayoutStore } from "@/stores/lss-public-layout";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import axios from "axios";
import i18n from "@/locales/i18n";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


// let axiosClient = axios.create({
//     // baseURL: process.env.BACKEND_URL,
//     // // 跨域請求set-cookie
//     // withCredentials: true
//     // baseURL: "https://gipassl.algotech.app"
//     baseURL: "http://127.0.0.1:8000",
//     headers: { 'Authorization': `Bearer ${cookies.get("access_token")}` }
// });


// axiosClient.interceptors.response.use(
//     response => response,
//     error => {
//         // whatever you want to do with the error
//         if (error.response.status == 401) {
//             // store.commit("SET_USER_DATA", {});
//             // this.$router.push({ name: "login" });
//             console.log(401401401)
//         }
//         return Promise.reject(error);
//     }
// );



const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_ROOT_API,
})
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.data) {
            if (error.response.data.detail){
                usePublicLayoutStore().alert.showMessageToast(error.response.data.detail)
            } else if (error.response.data.message){
                let path = ""
                const contain_main_error_types = ["helper", "util", "stripe", "error_handler"].some(element => {
                    if (error.response.data.message.includes(element)) {
                      return true;
                    }
                    return false;
                  });
                if (contain_main_error_types) {
                    path = "error_messages" + "." + error.response.data.message
                } else if (error.response.config.url.includes("v2")) {
                    console.log(error.response.config.url.split("/").splice(0,4).join("."))
                    path = "error_messages" + error.response.config.url.split("/").splice(0,4).join(".") + "." + error.response.data.message
                } else {
                    path = "error_messages" + error.response.config.url.split("/").splice(0,3).join(".") + "." + error.response.data.message
                }
                usePublicLayoutStore().alert.showMessageToast(i18n.global.t(path))
            }
        }
        else{
            usePublicLayoutStore().alert.showMessageToast('error ! please refresh the page.')
        }
        return Promise.reject(error);
    }
);

export function createAxiosWithBearer(){
    const axiosInstanceWithBearer = axios.create({
        baseURL: import.meta.env.VITE_APP_ROOT_API,
        headers: { 'Authorization': `Bearer ${cookies.get("access_token")}` },
    })
    axiosInstanceWithBearer.interceptors.response.use(
        response => response,
        error => {
            if (error.response.data) {
                if (error.response.data.detail){
                    useLSSSellerLayoutStore().alert.showMessageToast(error.response.data.detail)
                } else if (error.response.data.message){
                    let path = ""
                    if (error.response.data.message.includes("helper") || error.response.data.message.includes("util")) {
                        path = "error_messages" + "." + error.response.data.message
                    } else if (error.response.config.url.includes("v2")) {
                        console.log(error.response.config.url.split("/").splice(0,4).join("."))
                        path = "error_messages" + error.response.config.url.split("/").splice(0,4).join(".") + "." + error.response.data.message
                    } else {
                        path = "error_messages" + error.response.config.url.split("/").splice(0,3).join(".") + "." + error.response.data.message
                    }
                    useLSSSellerLayoutStore().alert.showMessageToast(i18n.global.t(path))
                }
            }
            else{
                useLSSSellerLayoutStore().alert.showMessageToast('error ! please refresh the page.')
            }
            return Promise.reject(error);
        }
    );
    return axiosInstanceWithBearer
}

export function createAxiosWithBearerWithoutInterceptor(){
    return axios.create({
        baseURL: import.meta.env.VITE_APP_ROOT_API,
        headers: { 'Authorization': `Bearer ${cookies.get("access_token")}` },
    })
}

export function facebookAxios(accessToken){
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_FACEBOOK_API_URL_V13,
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    // axiosInstance.interceptors.response.use(
    //     response => response,
    //     error => {
    //         if (error.response.data.message) {
    //             alert(error.response.data.message)
    //         }
    //         else if (error.response.data.detail){
    //             alert(error.response.data.detail)
    //         }else{
    //             alert('error')
    //             console.log(error)
    //         }
    //         return Promise.reject(error);
    //     }
    // );
    return axiosInstance
}

export function instagramAxios(accessToken){
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_FACEBOOK_API_URL_V13,
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    // axiosInstance.interceptors.response.use(
    //     response => response,
    //     error => {
    //         if (error.response.data.message) {
    //             alert(error.response.data.message)
    //         }
    //         else if (error.response.data.detail){
    //             alert(error.response.data.detail)
    //         }else if (error.response.data.error) {
    //             alert(error.response.data.error.message)
    //         }
    //         return Promise.reject(error);
    //     }
    // );
    return axiosInstance
}

export function youtubeAxios(accessToken){
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_YOUTUBE_API_URL,
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    // axiosInstance.interceptors.response.use(
    //     response => response,
    //     error => {
    //         if (error.response.data.message) {
    //             alert(error.response.data.message)
    //         }
    //         else if (error.response.data.detail){
    //             alert(error.response.data.detail)
    //         }else{
    //             alert('error')
    //         }
    //         return Promise.reject(error);
    //     }
    // );
    return axiosInstance
}
// const axiosInstanceWithBearer = axios.create({
//     baseURL: process.env.VUE_APP_ROOT_API,
//     headers: { 'Authorization': `Bearer ${cookies.get("access_token")}` },
    
//     // headers: { 'Authorization': `Bearer ${Vue.$cookies.get("access_token")}` }
// })
// axiosInstanceWithBearer.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response.data.message) {
//             alert(error.response.data.message)
//         }
//         else if (error.response.data.detail){
//             alert(error.response.data.detail)
//         }else{
//             alert('error')
//         }
//         return Promise.reject(error);
//     }
// );

export { axiosInstance }


export class Paginator{
    options = {headers:{ 'Authorization': `Bearer ${cookies.get("access_token")}` }} 
    constructor(url){
        this._next = null
        this._previous = null
        this.url = url
    }

    getData(){
        return axios.get(this.url,this.options).then(res=>this.updatePaginator(res))
    }
    nextPage(){
        return axios.get(this._next,this.options).then(res=>this.updatePaginator(res))
    }

    previousPage(){
        return axios.get(this._previous,this.options).then(res=>this.updatePaginator(res))
    }
    get gotNext() {
        return this._next!=null
    }

    get gotPrevious() {
        return this._previous!=null
    }
    updatePaginator(res){
        this._next = res.data.next
        this._previous = res.data.previous
        return res
    }
}