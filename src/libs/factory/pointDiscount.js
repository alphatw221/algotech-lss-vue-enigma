class PointDiscountHelper{

    static computePointsEarned(user, point_meta, subtotal_after_discount){
        var point_redemption_rate = point_meta?.default_point_redemption_rate||0

        for(let i=0; i<(point_meta?.reward_table||[]).length; i++){
            const tier = point_meta.reward_table[i]
            if(subtotal_after_discount < tier?.upper_bound||0){
                point_redemption_rate = tier?.point_redemption_rate||0
                break
            }

        }
        
        return Math.floor(subtotal_after_discount * point_redemption_rate)
    }

    static computePointDiscount(user, point_meta, points_used){
                
        return Math.floor( (points_used /(point_meta?.redemption_rate_point||1)) )*(point_meta?.redemption_rate_cash||0)

    }

}

class SHCPointDiscountHelper extends PointDiscountHelper{

    static computePointsEarned(user, point_meta, subtotal_after_discount){
        var point_redemption_rate = point_meta?.default_point_redemption_rate||0

        for(let i=0; i<(point_meta?.reward_table||[]).length; i++){
            const tier = point_meta.reward_table[i]
            if(subtotal_after_discount < tier?.upper_bound||0){
                point_redemption_rate = tier?.point_redemption_rate||0
                break
            }

        }

        return Math.floor(subtotal_after_discount * point_redemption_rate)
    }

    static computePointDiscount(user, point_meta, points_used){
                
        return Math.floor( (points_used /(point_meta?.redemption_rate_point||1)) )*(point_meta?.redemption_rate_cash||0)

    }

}

const pointDiscountHelperClassMap={
    'default':PointDiscountHelper,
    '617':SHCPointDiscountHelper,
}


export const getPointDiscountHelper = (user_subscription)=>{
    return pointDiscountHelperClassMap[user_subscription.id] ? pointDiscountHelperClassMap[user_subscription.id] : pointDiscountHelperClassMap['default']
}