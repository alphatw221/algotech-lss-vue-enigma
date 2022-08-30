import { axiosInstance, createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";


export const exchange_easy_store_credential = data =>{
    return axiosInstance.post(`/api/plugin/easy_store/authorization/credential/exchange/`, data);
}

