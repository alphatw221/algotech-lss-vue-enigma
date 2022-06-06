import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const buyer_retrieve_order = (order_id) => {
    return createAxiosWithBearer().get(`/api/v2/order/${order_id}/buyer/retrieve/`);
}

export const buyer_upload_receipt = (order_id) => {
    return createAxiosWithBearer().get(`/api/v2/order/${order_id}/buyer/receipt/upload/`);
}

export const buyer_retrieve_order_state = (order_id) => {
    return createAxiosWithBearer().get(`/api/v2/order/${order_id}/buyer/retrieve/state`)
}