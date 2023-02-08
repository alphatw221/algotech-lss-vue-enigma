// import { useShoppingCartStore } from '@/stores/lss-shopping-cart';
import { buyer_retrieve_order_platform } from '@/api_v2/order'
import { buyer_retrieve_cart_platform } from '@/api_v2/cart'
import { get_buyer_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
const { cookies } = useCookies();

export default async (to, from)=>{
    const buyerStore = useLSSBuyerLayoutStore();
    const order_oid = to.params.order_oid
    const cart_oid = to.params.cart_oid
    console.log('in youtube order middleware')
    let type = ''
    let object_id=''
    let res={data:null}
    if(order_oid){
        type = 'order'
        object_id=order_oid
        try{
            res = await buyer_retrieve_order_platform(order_oid)
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }else if(cart_oid){
        type = 'cart'
        object_id=cart_oid
        try{
            res = await buyer_retrieve_cart_platform(cart_oid, buyerStore.alert)
        }catch(error){}
    }
    if(res.data != 'youtube') return true

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
