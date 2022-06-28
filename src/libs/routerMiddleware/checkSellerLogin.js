import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_seller_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default async (to, from) => {


    const sellerStore = useLSSSellerLayoutStore();

    if (sellerStore.isAuthenticated ) return '/seller/campaigns'

    if (cookies.get('access_token')) {
        const res = await get_seller_account()
        
        if (res.status==200) {
            sellerStore.isAuthenticated = true;
            sellerStore.userInfo = res.data;
            return '/seller/campaigns'
        }

        cookies.remove('access_token')
        cookies.remove('login_with')
    }

    return true

}