import { buyer_retrieve_cart } from '@/api_v2/cart';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default async (to, from) => {
    console.log("redirectLoginPageMiddleware")
    try {
        const response = await buyer_retrieve_cart(to.params.cart_oid)
        if (response.data.platform && Object.keys(response.data.products).length === 0) {
            if (cookies.get('access_token')) {
                return '/buyer/orders'
            } 
            return '/buyer/login'
        }
    } catch {
        return '/buyer/login'
    }
    
    return true
}






