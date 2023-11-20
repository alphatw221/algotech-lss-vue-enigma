
import { useCookies } from "vue3-cookies";
import { times } from 'lodash';
const { cookies } = useCookies();

import { get_user_account } from '../../api_carlet/user.js'
export default async (to, from)=>{

    if(to.path=='/backend/login') return true

    if (cookies.get('access_token')) {
        try{
            const res = await get_user_account()
            return true
        }catch(error){
            cookies.remove("access_token")
            return '/backend/login'
        }
      
    }

    return '/backend/login'

}