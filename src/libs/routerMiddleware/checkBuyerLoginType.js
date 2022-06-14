import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
import { buyer_link_create_cart } from '@/api_v2/pre_order';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default async (to, from) => {
    const store = useLSSBuyerLayoutStore();
    const type = to.params.type
    let pre_order_id = to.params.pre_order_id
    const campaign_id = to.params.campaign_id
    

    if (['', undefined, null].includes(cookies.get('access_token'))) {
        return true
    } else {
        store.loginWith = cookies.get('login_with')
        if (type === 'create') {
            const response = await buyer_link_create_cart(campaign_id, cookies.get('login_with'))
            return `/buyer/cart/${response.data.id}`
        } else if (type === 'enter' && !['', undefined, null, 0].includes(pre_order_id)) {
            return `/buyer/cart/${pre_order_id}`
        } else {
            return '/buyer/'
        }
    }
}