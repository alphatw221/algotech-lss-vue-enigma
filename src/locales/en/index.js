import global from './global.json'
import error_messages from './error_messages.json'
import vulidate from './vulidate.json'

import stock from './views/stock.json'
import settings from './views/settings.json'
import shopping_cart from './views/shopping_cart.json'
import manage_order from './views/manage_order.json'
import order_detail from './views/order_detail.json'
import order_history from './views/order_history.json'
import campaign_list from './views/campaign_list.json'
import campaign_live from './views/campaign_live.json'
import create_campaign from './views/create_campaign.json'
import edit_campaign from './views/edit_campaign.json'
import lucky_draw from './views/lucky_draw.json'
import auto_reply from './views/auto_reply.json'
import assign_product from './views/assign_product.json'
import change_plan from './views/change_plan.json'
import layout from './views/layout.json'
import edit_campaign_product from './views/edit_campaign_product.json'
import profile from './views/profile.json'
import register from './views/register.json'
import tooltips from './views/tooltips.json'
import quiz_game from './views/quiz_game.json'
import login from './views/login.json'
import forgot_password from './views/forgot_password.json'
import reset_password from './views/reset_password.json'
import discount from './views/discount.json'
import dealer from './views/dealer.json'
import order_points from './views/order_points.json'

import order from './models/order.json'
import product_category from './models/product_category.json'
import product from './models/product.json'
import cart from './models/cart.json'

export default {

    //global--------------
    global,
    error_messages,
    vulidate,
    
    //view----------------
    campaign_list,
    campaign_live,
    create_campaign,
    edit_campaign,
    lucky_draw,
    manage_order,
    order_detail,
    order_history,
    settings,
    shopping_cart,
    stock,
    auto_reply,
    assign_product,
    layout,
    edit_campaign_product,
    change_plan,
    profile,
    register,
    tooltips,
    quiz_game,
    login,
    forgot_password,
    reset_password,
    discount,
    order_points,

    dealer,
    //model--------------
    order,
    product,
    product_category,
    cart
}