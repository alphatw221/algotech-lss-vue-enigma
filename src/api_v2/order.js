import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const buyer_retrieve_order = (order_id) => {
    return createAxiosWithBearer().get(`/api/v2/order/${order_id}/buyer/retrieve/`);
}

