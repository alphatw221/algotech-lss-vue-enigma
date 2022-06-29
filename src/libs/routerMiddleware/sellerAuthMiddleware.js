import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_seller_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default async (to, from)=>{
    const sellerStore = useLSSSellerLayoutStore();

    if (sellerStore.isAuthenticated) {
        return true
    }

    if (cookies.get('access_token')) {
        const res = await get_seller_account().then(res=>{
            sellerStore.isAuthenticated = true;
            sellerStore.userInfo = res.data;
            return true
        }).catch(err=>{
            cookies.remove("access_token")
            return false
        })

        if (res) {
            return true
        }
    }
    return '/seller/login'
}

