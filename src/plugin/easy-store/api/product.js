import { axiosInstance, createAxiosWithBearer, createAxiosWithBearerWithoutInterceptor } from "@/libs/axiosClient";


export const export_product_from_easy_store = data =>{
    return createAxiosWithBearerWithoutInterceptor().get(`/api/plugin/easy_store/product/export/`);
}
