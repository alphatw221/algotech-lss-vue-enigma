// import { useShoppingCartStore } from '@/stores/lss-shopping-cart';
import { buyer_retrieve_order_platform } from '@/api_v2/order'
import { buyer_retrieve_cart_platform_and_products } from '@/api_v2/cart'
import { get_buyer_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
const { cookies } = useCookies();

export default async (to, from)=>{
    const buyerStore = useLSSBuyerLayoutStore();
    console.log('redirect login and youtube order check')
    const cart_oid = to.params.cart_oid
    const res = await buyer_retrieve_cart_platform_and_products(cart_oid, buyerStore.alert)
    console.log(res)
    if (res.data.platform == null) {
        return
    } else if (res.data.platform == "youtube" && Object.keys(res.data.products).length !== 0) {
        if (!cookies.get('access_token')) {
            return `/buyer/login/cart/${cart_oid}`
        }
        
    } else if (Object.keys(res.data.products).length == 0) {
        return '/buyer/orders'
    }

    if (cookies.get('access_token')) {
        try{
            const res = await get_buyer_account()
            buyerStore.userInfo = res.data;
            return true
        }
        catch(error){
            console.log(error)
            cookies.remove("access_token")
        }
        
    }
    return `/buyer/login/${type}/${object_id}`

}
