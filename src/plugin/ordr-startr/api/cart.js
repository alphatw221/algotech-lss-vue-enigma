import { axiosInstance, axiosInstanceForBuyerLayout, createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";


export const get_ordr_startr_checkout_url = (cart_oid, token) =>{
    return axiosInstanceForBuyerLayout.get(`/api/plugin/ordr_startr/cart/gateway/${cart_oid}/?recaptcha_token=${token}`);
}

