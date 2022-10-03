import { createAxios } from "@/libs/axiosClient";


export const get_easy_store_checkout_url = (cart_oid,token, toastofy=null) =>{
    return createAxios(toastofy).get(`/api/plugin/easy_store/cart/gateway/${cart_oid}/?recaptcha_token=${token}`);
}

