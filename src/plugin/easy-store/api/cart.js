import { axiosInstance, createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";


export const get_easy_store_checkout_url = cart_oid =>{
    return axiosInstance.get(`/api/plugin/easy_store/cart/gateway/${cart_oid}/`);
}

