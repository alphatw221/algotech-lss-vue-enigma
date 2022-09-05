import { axiosInstance, createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";


export const get_ordr_startr_checkout_url = cart_oid =>{
    return axiosInstance.get(`/api/plugin/ordr_startr/cart/gateway/${cart_oid}/`);
}

