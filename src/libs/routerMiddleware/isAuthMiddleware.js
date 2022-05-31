import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
import { get_buyer_account } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default (to, from)=>{
    const buyerStore = useLSSBuyerLayoutStore();
    const token = cookies.get('access_token')
    console.log(to)
    console.log(from)

    if (token == '' && buyerStore.isAuthenticated == false) {
        return from
    } else if (token != '' && buyerStore.isAuthenticated == false) {
        get_buyer_account().then(
            response => {
                buyerStore.$patch((state) => {
                    state.userInfo = response.data;
                    state.isAuthenticated = true;
                })
            }
        )
    }
    
    return true
}
