import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";

export const get_subscription_plan =(country_code) =>{
    return axiosInstance.get(`/api/v2/business-policy/subscription-plan/${country_code}`)
}