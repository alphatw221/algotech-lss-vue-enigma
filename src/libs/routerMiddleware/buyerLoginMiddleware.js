import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
import { buyer_create_blank_cart } from '@/api_v2/pre_order';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default async (to, from) => {


    
    if (['', undefined, null].includes(cookies.get('access_token'))) {
        console.log('no access token')
        return true
    } 
    
    // const store = useLSSBuyerLayoutStore();
    const type = to.params.type


    if (type === 'create' && cookies.get('login_with')!='anonymousUser') {
        const response = await buyer_create_blank_cart(to.params.object_id, cookies.get('login_with'))
        if(response.status!=200){
            // add error handle over here
            cookies.remove('access_token')
            cookies.remove('login_with')
            return '/buyer/login'
        }
        return `/buyer/cart/${response.data.id}?tag=openAddOn`
    } else if (type === 'cart') {
        return `/buyer/cart/${to.params.object_id}`
    } else if (type === 'order') {
        return `/buyer/order/${to.params.object_id}`
    } else {
        return '/buyer/'
    }
}






