import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_admin_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default async (to, from) => {

    if (cookies.get('access_token')) {
        const res = await get_admin_account().then(res=>{
            sellerStore.userInfo = res.data;
            return true
        }).catch(err=>{
            cookies.remove('access_token')
            return false
        })

        if (res) {
            return '/admin'
        }

    }
    return true
}