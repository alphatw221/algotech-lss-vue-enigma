import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
import { get_buyer_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default async (to, from)=>{
    const buyerStore = useLSSBuyerLayoutStore();

    if (buyerStore.isAuthenticated && cookies.get(cookies.get('login_with')!='anonymousUser')) return true

    if (cookies.get('access_token')) {
        const res = await get_buyer_account()
        
        if (res.status==200) {
            buyerStore.isAuthenticated = true;
            buyerStore.userInfo = res.data;
            return true
        }
    }

    cookies.remove('access_token')
    cookies.set('login_with','anonymousUser')
    return '/buyer/'
}
