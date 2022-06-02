import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";



export const list_buyer_campapign_product = (pre_order_id) => {
    return createAxiosWithBearer().get(`/api/v2/campaign-product/buyer/list/?pre_order_id=${pre_order_id}`)
}

