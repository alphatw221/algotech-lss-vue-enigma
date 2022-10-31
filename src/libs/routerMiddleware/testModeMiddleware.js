import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_seller_account } from '@/api_v2/user';
import { useCookies } from "vue3-cookies";
import { times } from 'lodash';
const { cookies } = useCookies();


export default async (to, from)=>{
    const sellerStore = useLSSSellerLayoutStore();
    const mode = layout.userInfo.user_subscription.status
}