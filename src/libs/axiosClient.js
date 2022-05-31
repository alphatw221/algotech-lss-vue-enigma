import axios from "axios";

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
                alert(error.response.data.detail)
            }else if (error.response.data.message){
                alert(error.response.data.message)
            }
        }
        else{
            alert('error ! please refresh the page.')
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
                    alert(error.response.data.detail)
                }else if (error.response.data.message){
                    alert(error.response.data.message)
                }
            }
            else{
                alert('error ! please refresh the page.')
            }
            return Promise.reject(error);
        }
    );
    return axiosInstanceWithBearer
}

export function facebookAxios(accessToken){
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_FACEBOOK_API_URL_V13,
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error.response.data.message) {
                alert(error.response.data.message)
            }
            else if (error.response.data.detail){
                alert(error.response.data.detail)
            }else{
                alert('error')
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance
}

export function instagramAxios(accessToken){
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_FACEBOOK_API_URL_V13,
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error.response.data.message) {
                alert(error.response.data.message)
            }
            else if (error.response.data.detail){
                alert(error.response.data.detail)
            }else{
                alert('error')
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance
}

export function youtubeAxios(accessToken){
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_YOUTUBE_API_URL,
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error.response.data.message) {
                alert(error.response.data.message)
            }
            else if (error.response.data.detail){
                alert(error.response.data.detail)
            }else{
                alert('error')
            }
            return Promise.reject(error);
        }
    );
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