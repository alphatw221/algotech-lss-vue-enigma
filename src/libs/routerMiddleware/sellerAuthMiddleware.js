import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_seller_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default async (to, from)=>{
    const sellerStore = useLSSSellerLayoutStore();

    if (sellerStore.isAuthenticated) {
        console.log('isAuth')
        return true
    }

    if (cookies.get('access_token')) {
        const res = await get_seller_account()
        
        sellerStore.isAuthenticated = true;
        sellerStore.userInfo = res.data;

        if (res.status!=200) {
            return '/seller/login'
        }
        return true
    }
    return '/seller/login'
}

