import { createAxiosWithBearer , Paginator} from "@/libs/axiosClient";


export const createCommentPaginator = (campaign_id, platformName, category)=>{
    return new Paginator(`${import.meta.env.VITE_APP_ROOT_API}/api/v2/campaign-comment/${campaign_id}/${platformName}/?category=${category}`)
}

