// import { Paginator} from "@/libs/axiosClient";


export const createCommentPaginator = (campaign_id, platformName, category)=>{
    // return new Paginator(`${import.meta.env.VITE_APP_ROOT_API}/api/v2/campaign-comment/${campaign_id}/${platformName}/?category=${category}`)
}

export const get_summerize_comments = (campaign_id, status, toastify=null) => {
    return createAxios(toastify).get(`/api/v2/campaign-comment/${campaign_id}/summarize/?tag=${status}/`)
}