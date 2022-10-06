import { createAxios } from "@/libs/axiosClient";


export const exchange_easy_store_credential = (data,toastify=null) =>{
    return createAxios(toastify).post(`/api/plugin/easy_store/authorization/credential/exchange/`, data);
}

