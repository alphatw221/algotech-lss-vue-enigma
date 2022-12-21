import { createAxios } from "@/libs/axiosClient";


export const create_ecpay_delivery_order = (order_oid, data, toastify=null) => {
    return createAxios(toastify).put(`/api/v2/delivery/ecpay/create/delivery_order/${order_oid}/`, data)
}