import { createAxiosWithBearer } from "@/libs/axiosClient";

export const manage_order_list = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/dashboard/order_list/?campaign_id=${campaign_id}`)
}

export const campaign_manage_order = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/dashboard/campaign_manage_order/?campaign_id=${campaign_id}`)
}

export const edit_allow_checkout = (campaign_id,status) => {
    return createAxiosWithBearer().get(`/api/dashboard/edit_allow_checkout/?campaign_id=${campaign_id}&status=${status ? 0 : 1}`)
}

export const order_export = (campaign_id) => {
    return createAxiosWithBearer().get(`/api/order/report/?campaign_id=${campaign_id}&column_list=id,created_at,platform,customer_name,shipping_phone,shipping_email,shipping_method,shipping_address_1,shipping_location,shipping_region,shipping_postcode,pick_up_date,pick_up_store,shipping_remark,payment_method,status,payment_card_type,payment_card_number,last_five_digit,total`,{responseType : 'blob'})
}