import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const buyer_cart_retrieve = (pre_order_id) => {
    return createAxiosWithBearer().get(`/api/v2/pre_order/${pre_order_id}/buyer_retrieve/`);
}

export const delivery_info = (pre_order_id, data) =>{
    return createAxiosWithBearer().post(`/api/v2/pre_order/${pre_order_id}/delivery_info/`, data)
}