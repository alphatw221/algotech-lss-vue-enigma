import { createAxios} from "@/libs/axiosClient";


export const get_shopify_checkout_url = (cart_oid, toastify=null) =>{
    return createAxios(toastify).get(`/api/plugin/shopify/cart/gateway/${cart_oid}/`);
}