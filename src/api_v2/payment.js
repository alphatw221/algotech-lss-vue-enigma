import { createAxios } from "@/libs/axiosClient";


const get_stripe_gateway = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/payment/stripe/gateway/?order_oid=${order_oid}`)
}

const get_hitpay_gateway = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/payment/hitpay/gateway/?order_oid=${order_oid}`)
}

const get_paypal_gateway = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/payment/paypal/gateway/?order_oid=${order_oid}`)
}

const get_first_data_credential = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/payment/first_data/credential/?order_oid=${order_oid}`)
}

const get_ecpay_credential = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/payment/ecpay/gateway/?order_oid=${order_oid}`)
}

const get_pay_mongo_gateway = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/payment/pay_mongo/gateway/?order_oid=${order_oid}`)
}

const get_rapyd_gateway = (order_oid, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/payment/rapyd/gateway/?order_oid=${order_oid}`)
}


export const paymentEndPoints={
    'getStripeGateway':get_stripe_gateway,
    'getFirstDataCredential':get_first_data_credential,
    'getHitpayGateway':get_hitpay_gateway,
    'getPaypayGateway':get_paypal_gateway,
    'getEcpayCredential':get_ecpay_credential,
    'getPayMongoGateway':get_pay_mongo_gateway,
    'getRapydGateway':get_rapyd_gateway
}