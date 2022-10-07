import { createAxios } from "@/libs/axiosClient";

export const get_subscription_plan =(country_code, toastify=null) =>{
    return createAxios(toastify).get(`/api/v2/business-policy/subscription-plan/${country_code}`)
}