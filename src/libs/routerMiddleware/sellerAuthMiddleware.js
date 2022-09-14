import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_seller_account } from '@/api_v2/user';
import { useCookies } from "vue3-cookies";
import { times } from 'lodash';
const { cookies } = useCookies();


export default async (to, from)=>{
    const sellerStore = useLSSSellerLayoutStore();
    if (sellerStore.isAuthenticated) {
        return true
    }

    if (cookies.get('access_token')) {
        try{
            const res = await get_seller_account()
            sellerStore.userInfo = res.data;
            return true
        }catch(error){
            cookies.remove("access_token")
            return '/seller/web/login'
        }
      
    }
    return '/seller/web/login'
}