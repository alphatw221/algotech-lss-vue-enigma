import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const buyer_delete_order_product = (order_product_id) =>{
    return createAxiosWithBearer().delete(`/api/v2/order-product/${order_product_id}/buyer/delete/`)
}
