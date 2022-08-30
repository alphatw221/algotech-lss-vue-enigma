import { useLSSDealerLayoutStore } from '@/stores/lss-dealer-layout';
import { get_seller_account } from '@/api_v2/user';
import { useCookies } from "vue3-cookies";
import { times } from 'lodash';
const { cookies } = useCookies();


export default async (to, from)=>{
    const dealerStore = useLSSDealerLayoutStore();
    if (dealerStore.isAuthenticated) {
        return true
    }

    if (cookies.get('access_token')) {
        try{
            const res = await get_seller_account()
            if (res.data.user_subscription.type != 'dealer'){
                cookies.remove('access_token')
                cookies.remove('login_with')
                console.log("NOT DEALER ACCOUNT")
                return '/seller/web/login'
            }else{
                dealerStore.userInfo = res.data;
                dealerStore.isAuthenticated = true;
                dealerStore.userInfo = res.data;
                return true
            }
        }catch(error){
            cookies.remove("access_token")
            return '/dealer/login'
        }
    }
    return '/dealer/login'
}