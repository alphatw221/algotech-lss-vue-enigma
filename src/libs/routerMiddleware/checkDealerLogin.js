import { useLSSDealerLayoutStore } from '@/stores/lss-dealer-layout';
import { get_seller_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default async (to, from) => {

    const dealerStore = useLSSDealerLayoutStore();

    if (dealerStore.isAuthenticated ) return '/dealer/dashboard'

    if (cookies.get('access_token')) {
        const res = await get_seller_account().then(res=>{
            console.log(res)
            if (res.data.user_subscription.type != 'dealer'){
                cookies.remove('access_token')
                cookies.remove('login_with')
                console.log("NOT DEALER ACCOUNT")
                return '/seller/web/login'
            }else{
                dealerStore.isAuthenticated = true;
                dealerStore.userInfo = res.data;
                return true
            }
        }).catch(err=>{
            cookies.remove('access_token')
            cookies.remove('login_with')
            return false
        })

        if (res) {
            return '/dealer/dashboard'
        }

    }
    return true
}