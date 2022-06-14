import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
import { buyer_link_create_cart } from '@/api_v2/pre_order';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default async (to, from) => {

    if (['', undefined, null].includes(cookies.get('access_token')) || ['', undefined, null].includes(cookies.get('login_with'))) {
        return true
    } 
    
    const store = useLSSBuyerLayoutStore();
    const type = to.params.type

    store.loginWith = cookies.get('login_with')
    if (type === 'create') {
        const response = await buyer_link_create_cart(to.params.object_id, cookies.get('login_with'))
        return `/buyer/cart/${response.data.id}`
    } else if (type === 'enter') {
        return `/buyer/cart/${to.params.object_id}`
    } else {
        return '/buyer/'
    }
}