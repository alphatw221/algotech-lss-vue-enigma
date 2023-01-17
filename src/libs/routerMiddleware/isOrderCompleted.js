// import { useShoppingCartStore } from '@/stores/lss-shopping-cart';
import { buyer_retrieve_order_state } from '@/api_v2/order'
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
export default async (to, from)=>{
    // const cartStore = useShoppingCartStore();
    const order_oid = to.params.order_oid

    // if (cartStore.order.id == parseInt(order_id) && cartStore.order.status == 'complete') return `/buyer/order/${order_id}`
    // else if (cartStore.order.id == parseInt(order_id) && cartStore.order.status == 'review') return true


    const response = await buyer_retrieve_order_state(order_oid)
    console.log(response.data)
    if (response.data.payment_status == 'paid' || response.data.payment_method.includes('ecpay')) {

        return `/buyer/order/${order_oid}/confirmation`
    }
    if (response.status != 200) {
        return from
    }

    return true 
}
