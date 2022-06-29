import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_seller_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default async (to, from) => {

    const sellerStore = useLSSSellerLayoutStore();

    if (sellerStore.isAuthenticated ) return '/seller/campaign-list'

    if (cookies.get('access_token')) {
        const res = await get_seller_account().then(res=>{
            console.log(res)
            sellerStore.isAuthenticated = true;
            sellerStore.userInfo = res.data;
            return true
        }).catch(err=>{
            cookies.remove('access_token')
            cookies.remove('login_with')
            return false
        })

        if (res) {
            return '/seller/campaign-list'
        }

    }
    return true
}