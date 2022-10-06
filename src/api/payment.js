import { createAxios } from "@/libs/axiosClient";


export const get_payment_meta = (toastify=null) => {
    return createAxios(toastify).get('api/payment/meta/subscribed_country_payment')
}