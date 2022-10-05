import { createAxios } from "@/libs/axiosClient";


export const get_ordr_startr_checkout_url = (cart_oid, token, toastify=null) =>{
    return createAxios(toastify).get(`/api/plugin/ordr_startr/cart/gateway/${cart_oid}/?recaptcha_token=${token}`);
}

