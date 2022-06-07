import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
import { buyer_retrieve_order_state } from '@/api_v2/order'


export default async (to, from)=>{
    const buyerStore = useLSSBuyerLayoutStore();
    const order_id = to.params.order_id

    if (buyerStore.completedOrder.includes(order_id)) {
        console.log('had')
        return true
    }

    const response = await buyer_retrieve_order_state(order_id)
    if (response.data == 'complete') {
        buyerStore.completedOrder.push(order_id)
        console.log('complete')

        return `/buyer/order/${order_id}`
    } 
    
    if (response.status != 200) {
        return from
    }

    return true 
}
