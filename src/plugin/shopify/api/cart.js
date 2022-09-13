import { axiosInstance, createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";


export const get_shopify_checkout_url = (cart_oid) =>{
    return axiosInstance.get(`/api/plugin/shopify/cart/gateway/${cart_oid}/`);
}