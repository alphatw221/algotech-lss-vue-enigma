import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_seller_account } from '@/api_v2/user';
import { useCookies } from "vue3-cookies";
import { times } from 'lodash';
// import i18n from '@/locales/i18n';
const { cookies } = useCookies();


export default async (to, from)=>{
    const sellerStore = useLSSSellerLayoutStore();
    if (sellerStore.isAuthenticated) {
        return true
    }

    if (cookies.get('access_token')) {
        const res = await get_seller_account()
        
        sellerStore.isAuthenticated = true;
        sellerStore.userInfo = res.data;

        if (res.status!=200) {
            cookies.remove("access_token")
            return '/seller/login'
        }
        return true
    }
    return '/seller/login'
}