import { createAxiosWithoutInterceptor } from "@/libs/axiosClient";


export const export_product_from_easy_store = data =>{
    return createAxiosWithoutInterceptor().get(`/api/plugin/easy_store/product/export/`);
}
