import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_seller_account } from '@/api_v2/user';
import { useCookies } from "vue3-cookies";
import { times } from 'lodash';
const { cookies } = useCookies();


export default async (to, from)=>{
    const sellerStore = useLSSSellerLayoutStore();
    if (sellerStore.isAuthenticated) {
        if(sellerStore.userInfo.user_subscription.user_plan?.plugins?.['easy_store']){sellerStore.plugins = true}
        else if(sellerStore.userInfo.user_subscription.user_plan?.plugins?.['ordr_startr']){sellerStore.plugins = true}
        else if(sellerStore.userInfo.user_subscription.user_plan?.plugins?.['shopify']){sellerStore.plugins = true}
        console.log('ddd',sellerStore.plugins)
        return true
    }

    if (cookies.get('access_token')) {
        try{
            const res = await get_seller_account()
            sellerStore.userInfo = res.data;
            if(sellerStore.userInfo.user_subscription.user_plan?.plugins?.['easy_store']){sellerStore.plugins = true}
            else if(sellerStore.userInfo.user_subscription.user_plan?.plugins?.['ordr_startr']){sellerStore.plugins = true}
            else if(sellerStore.userInfo.user_subscription.user_plan?.plugins?.['shopify']){sellerStore.plugins = true}
            console.log('ddd',sellerStore.plugins)
            return true
        }catch(error){
            cookies.remove("access_token")
            return '/seller/web/login'
        }
      
    }
    return '/seller/web/login'
}