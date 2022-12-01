export const checkReachChannelLimit = (layoutStore, platform) => {
    if (layoutStore.bindedPlatform.length === 0){
        return false
    }
    if (!layoutStore.userInfo.user_subscription.user_plan?.activated_platform) {
        return true
    }
    return !layoutStore.bindedPlatform.includes(platform) && layoutStore.userInfo.user_subscription.channel_limit != 0 && layoutStore.bindedPlatform.length >= layoutStore.userInfo.user_subscription.channel_limit
}

export const addBindedPlatform = (layoutStore, platform) => {
    if (!layoutStore.bindedPlatform.includes(platform)) {
        layoutStore.bindedPlatform.push(platform)
    }
}

export const removeBindedPlatform = (layoutStore, platform) => {
    layoutStore.bindedPlatform = layoutStore.bindedPlatform.filter(v => v !== platform)
}

export const checkBusinessReportAccessible = (layoutStore) => {
    if (["trial", "lite"].includes(layoutStore.userInfo.user_subscription.type)) {
        layoutStore.menu = layoutStore.menu.filter(e => e.title !== "report")
    }
}