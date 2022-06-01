import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
import { get_buyer_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default async (to, from)=>{
    const buyerStore = useLSSBuyerLayoutStore();

    // console.log(to)
    // console.log(from)
    if (buyerStore.isAuthenticated) {
        console.log('isAuth')
        return true
    }

    if (cookies.get('access_token')) {
        console.log('is not Auth')
        const res = await get_buyer_account()

        buyerStore.isAuthenticated = true;
        buyerStore.userInfo = res.data;

        // buyerStore.$patch((state) => {
        //     state.userInfo = res.data;
        //     state.isAuthenticated = true;
        // // })
        // buyerStore.isAuthenticated = true

        if (res.status!=200) {
            return '/buyer/login'
        }
        return true
    }
}
