import { useShoppingCartStore } from '@/stores/lss-shopping-cart';
import { buyer_retrieve_order_state } from '@/api_v2/order'


export default async (to, from)=>{
    const cartStore = useShoppingCartStore();
    const order_id = to.params.order_id

    if (cartStore.order.id == parseInt(order_id) && cartStore.order.status == 'complete') return `/buyer/order/${order_id}`
    else if (cartStore.order.id == parseInt(order_id) && cartStore.order.status == 'review') return true

    const response = await buyer_retrieve_order_state(order_id)
    if (response.data == 'complete') {
        console.log('complete')

        return `/buyer/order/${order_id}`
    } 
    
    if (response.status != 200) {
        return from
    }

    return true 
}
