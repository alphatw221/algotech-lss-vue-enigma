import { createAxiosWithBearer } from "@/libs/axiosClient";

export const update_platform_live_id = (campaign_id, platform, post_id) => {
    return createAxiosWithBearer().put(`/api/v2/campaign/${campaign_id}/live/update/?platform=${platform}&post_id=${post_id}`)
}

