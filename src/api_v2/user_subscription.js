import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";


export const get_notes = () => {
    return createAxiosWithBearer().get('/api/v2/user-subscription/notes/')
};

export const update_notes = (delivery_note, special_note, confirmation_note) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/notes/?delivery_note=${delivery_note}&special_note=${special_note}&confirmation_note=${confirmation_note}`)
}

export const seller_update_subscription = (data) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/seller/update/`,data)
}

export const seller_update_payment = (paymentKey,data) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/payment/${paymentKey}/`,data)
}

export const seller_update_delivery = (data) => {
    return createAxiosWithBearer().put(`/api/v2/user-subscription/delivery/`,data)
}