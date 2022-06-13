import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const get_payment_meta = () => {
    return createAxiosWithBearer().get('api/payment/meta/subscribed_country_payment')
}