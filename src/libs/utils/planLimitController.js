export const checkReachChannelLimit = (layoutStore, platform) => {
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