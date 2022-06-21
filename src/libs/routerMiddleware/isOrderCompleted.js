// import { useShoppingCartStore } from '@/stores/lss-shopping-cart';
import { buyer_retrieve_order_state, guest_retrieve_order_state } from '@/api_v2/order'
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
export default async (to, from)=>{
    // const cartStore = useShoppingCartStore();
    const order_oid = to.params.order_oid

    // if (cartStore.order.id == parseInt(order_id) && cartStore.order.status == 'complete') return `/buyer/order/${order_id}`
    // else if (cartStore.order.id == parseInt(order_id) && cartStore.order.status == 'review') return true

    const retrieve_order_state=cookies.get("login_with")=='anonymousUser'?guest_retrieve_order_state:buyer_retrieve_order_state
    const response = await retrieve_order_state(order_oid)
    if (response.data == 'complete') {
        console.log('complete')

        return `/buyer/order/${order_oid}`
    } 
    
    if (response.status != 200) {
        return from
    }

    return true 
}
