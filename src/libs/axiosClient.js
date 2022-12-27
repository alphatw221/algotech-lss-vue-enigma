import { usePublicLayoutStore } from "@/stores/lss-public-layout";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useLSSDealerLayoutStore } from "@/stores/lss-dealer-layout"
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { useRoute, useRouter } from 'vue-router';
import axios from "axios";
import i18n from "@/locales/i18n";
import { useCookies } from "vue3-cookies";
import {ref} from "vue"
const { cookies } = useCookies();
// change current language for i18n
const browserLang = window.navigator.language.toLowerCase()
const browserLangToVueLang = {
    "en": "en",
    "zh-cn": "zh_hans",
    "zh-hk": "zh_hans",
    "zh-tw": "zh_hant",
    "vi": "vi"
}
i18n.global.locale.value = browserLangToVueLang[browserLang]
//

var reload = null
var errorAlreadyShown = false

const get_i18n_path = error=>{
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
    return path
}

const get_i18n_params = params=>{
    let i18n_params = []
    if(params){
        Object.entries(params).forEach(([key, value]) => {
            i18n_params[key] = i18n.global.t(`error_messages.params.${value}`)
        }); 
    }
    return i18n_params
}

const axiosInstanceForBuyerLayout = axios.create({
    baseURL: import.meta.env.VITE_APP_ROOT_API,
})
axiosInstanceForBuyerLayout.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.data?.detail){
            useLSSBuyerLayoutStore().alert.showMessageToast(error.response.data.detail)
        } else if (error.response?.data?.message){
            console.log(response?.data?.params)
            useLSSBuyerLayoutStore().alert.showMessageToast(i18n.global.t(get_i18n_path(error),error.response?.data?.params))
        } else{
            useLSSBuyerLayoutStore().alert.showMessageToast('error ! please refresh the page.')
        }
        return Promise.reject(error);
    }
);

export function createAxiosWithoutInterceptor(){

    const headers = {}
    if(cookies.get("access_token")) headers.Authorization = `Bearer ${cookies.get("access_token")}`

    return axios.create({
        baseURL: import.meta.env.VITE_APP_ROOT_API,
        headers: headers,
    })
}

export function createAxios(toastify){

    const headers = {}
    if(cookies.get("access_token")) headers.Authorization = `Bearer ${cookies.get("access_token")}`
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_APP_ROOT_API,
        headers: headers,
    })

    if(!toastify){
        toastify = useLSSSellerLayoutStore().alert != undefined ? useLSSSellerLayoutStore().alert: useLSSDealerLayoutStore().alert != undefined ? useLSSDealerLayoutStore().alert : useLSSBuyerLayoutStore().alert != undefined ? useLSSBuyerLayoutStore().alert: usePublicLayoutStore().alert != undefined ? usePublicLayoutStore().alert: undefined
    }

    if(!toastify) return axiosInstance

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.data?.code){
                if(error.response.data.code === "token_not_valid") {
                    if(errorAlreadyShown) return
                    errorAlreadyShown = true
                    console.log('token_not_valid')
                    toastify.showMessageToast(i18n.global.t(`error_messages.token_not_valid`))

                    if (reload) clearTimeout(reload)
                    reload = setTimeout(() => {window.location.reload()}, 4000)
                } else {
                    toastify.showMessageToast(i18n.global.t(`error_messages.${error.response.data.code}`))
                }
            } else if (error.response?.data?.message){
                toastify.showMessageToast(i18n.global.t(`error_messages.${error.response.data.message}`, get_i18n_params(error.response?.data?.params)))
                // toastify.showMessageToast(i18n.global.t(i18n.global.t(get_i18n_path(error), get_i18n_params(error.response?.data?.params))))
            } else{
                toastify.showMessageToast('error_messages.please_refresh_page')
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance
}

export function facebookAxios(accessToken){
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_FACEBOOK_API_URL_V13,
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    return axiosInstance
}

export function instagramAxios(accessToken){
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_FACEBOOK_API_URL_V13,
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    return axiosInstance
}

export function youtubeAxios(accessToken){
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_YOUTUBE_API_URL,
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    return axiosInstance
}

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