import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default async (to, from) => {
    if (!['', undefined, null].includes(cookies.get('access_token'))) {
        return '/seller/campaign-list'
    } 
    return true
}