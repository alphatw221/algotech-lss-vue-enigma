import { useLSSAdminLayoutStore } from '@/stores/lss-admin-layout';
import { get_admin_account } from '@/api_v2/user';
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();


export default async (to, from)=>{

    const layoutStore = useLSSAdminLayoutStore()
    if (layoutStore.isAuthenticated) {
        return true
    }

    if (cookies.get('access_token')) {
        try{
            const res = await get_admin_account()

            layoutStore.userInfo = res.data;
            layoutStore.isAuthenticated = true
            return true
        }catch(error){
            cookies.remove("access_token")
            return '/seller/web/admin/login'
        }
      
    }
    return '/seller/web/admin/login'
}