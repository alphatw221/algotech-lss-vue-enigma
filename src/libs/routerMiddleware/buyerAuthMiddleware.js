import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
import { get_buyer_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default async (to, from)=>{
    const buyerStore = useLSSBuyerLayoutStore();

    if (cookies.get('login_with')=='anonymousUser') return true

    if (cookies.get('access_token')) {

        try{
            const res = await get_buyer_account()
            if (res.status==200) {
                buyerStore.userInfo = res.data;
                return true
            }
        }
        catch(error){
            //do nothing
        }
        
    }

    cookies.remove('access_token')
    cookies.set('login_with','anonymousUser')
    return true
}
