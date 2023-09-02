import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_user_account } from '@/api_v3/user';
import { useCookies } from "vue3-cookies";
import { times } from 'lodash';
const { cookies } = useCookies();


export default async (to, from)=>{
    const sellerStore = useLSSSellerLayoutStore();
    if (sellerStore.isAuthenticated) {
        return true
    }

    if (cookies.get('user_access_token')) {
        try{
            const res = await get_user_account()
            sellerStore.userInfo = res.data;
            sellerStore.isAuthenticated = true
            return true
        }catch(error){
            cookies.remove("user_access_token")
            sellerStore.userInfo = null
            sellerStore.isAuthenticated = false
            return '/user/login'
        }
      
    }
    return '/user/login'
}