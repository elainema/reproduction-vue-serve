import Vue from 'vue'
import VueRouter from 'vue-router'


import auth from '@/util/auth'

import Login from '@/views/login/Login.vue'
import Index from '@/views/Index.vue'
import DashBoard from '@/views/dashboard/dashboard.vue'

/*offer*/
const Offer_Create = r => require.ensure([], () => r(require('@/views/Offer/pages/Create.vue')), 'offer_create')
const Offer_All = r => require.ensure(['@/views/Offer/pages/All.vue'], () => r(require('@/views/Offer/pages/All.vue')), 'p_offers')
const Offer_Detail = r => require.ensure(['@/views/Offer/pages/Detail.vue'], () => r(require('@/views/Offer/pages/Detail.vue')), 'offer_detail')
const Offer_Applications = r => require.ensure(['@/views/Offer/pages/Offer_Applications.vue'], () => r(require('@/views/Offer/pages/Offer_Applications.vue')), 'p_offer_applications')
const P_Create_Category = r => require.ensure(['@/views/Offer/pages/Create_Category.vue'], () => r(require('@/views/Offer/pages/Create_Category.vue')), 'p_create_category')
const P_Offer_Category = r => require.ensure(['@/views/Offer/pages/Manage_Category.vue'], () => r(require('@/views/Offer/pages/Manage_Category.vue')), 'p_offer_category')
const P_Manage_Category = r => require.ensure(['@/views/Offer/pages/Edit_Category.vue'], () => r(require('@/views/Offer/pages/Edit_Category.vue')), 'p_manage_category')
const Offer_Top = r => require.ensure(['@/views/Offer/pages/Top.vue'], () => r(require('@/views/Offer/pages/Top.vue')), 'offer_top')
const P_Products = r => require.ensure(['@/views/Offer/pages/Products.vue'], () => r(require('@/views/Offer/pages/Products.vue')), 'p_products')
/*const File_Application = r => require.ensure(['@/views/FileApplication/File_Application.vue'], () => r(require('@/views/FileApplication/File_Application.vue')), 'file_application')*/
const Offer_Group = r => require.ensure(['@/views/Offer/pages/Group.vue'], () => r(require('@/views/Offer/pages/Group.vue')), 'p_offer_group')
/*report*/
const Report = r => require.ensure(['@/views/Report/pages/Report.vue'], () => r(require('@/views/Report/pages/Report.vue')), 'report')
const Report_Referral = r => require.ensure(['@/views/Report/pages/Report_Referral.vue'], () => r(require('@/views/Report/pages/Report_Referral.vue')), 'report_referral')
const Ocpa_Report = r => require.ensure(['@/views/Report/pages/Ocpa_Report.vue'], () => r(require('@/views/Report/pages/Ocpa_Report.vue')), 'ocpa_report')
const Fraud_Report = r => require.ensure(['@/views/Report/pages/Fraud_Report.vue'], () => r(require('@/views/Report/pages/Fraud_Report.vue')), 'fraud_report')
const Cps_Report = r => require.ensure(['@/views/Report/pages/Cps_Report.vue'], () => r(require('@/views/Report/pages/Cps_Report.vue')), 'cps_report')
const History_Report = r => require.ensure(['@/views/Report/pages/History_Report.vue'], () => r(require('@/views/Report/pages/History_Report.vue')), 'history_report')
const Adv_Report = r => require.ensure(['@/views/Report/pages/Adv_Report.vue'], () => r(require('@/views/Report/pages/Adv_Report.vue')), 'adv_report')
const Affiliate_Commission = r => require.ensure(['@/views/Report/pages/Affiliate_Commission.vue'], () => r(require('@/views/Report/pages/Affiliate_Commission.vue')), 'affiliate_commission')
const Manager_Commission = r => require.ensure(['@/views/Report/pages/Manager_Commission.vue'], () => r(require('@/views/Report/pages/Manager_Commission.vue')), 'manager_commission')
const Antenna_Report = r => require.ensure(['@/views/Report/pages/Antenna_Report.vue'], () => r(require('@/views/Report/pages/Antenna_Report.vue')), 'antenna_report')
const EventReport = r => require.ensure([], () => r(require('@/views/Report/pages/event-report/index.vue')), 'event-report')

/*adv*/
const Adv_Create = r => require.ensure(['@/views/Adv/pages/Create.vue'], () => r(require('@/views/Adv/pages/Create.vue')), 'adv_create')
const Adv_List = r => require.ensure(['@/views/Adv/pages/List.vue'], () => r(require('@/views/Adv/pages/List.vue')), 'adv_list')
const Adv_Rigister = r => require.ensure(['@/views/Adv/pages/Rigister.vue'], () => r(require('@/views/Adv/pages/Rigister.vue')), 'adv_rigister')
const Adv_Manage = r => require.ensure([], () => r(require('@/views/Adv/pages/Manage.vue')), 'adv_manage')
const Adv_Detail = r => require.ensure(['@/views/Adv/pages/Detail.vue'], () => r(require('@/views/Adv/pages/Detail.vue')), 'adv_detail')
/*const Adv_SignUp = r => require.ensure(['@/views/Adv/pages/SignUp.vue'], () => r(require('@/views/Adv/pages/SignUp.vue')), 'adv_signup')*/

/*publisher*/
const Publisher_List = r => require.ensure(['@/views/Publisher/pages/List.vue'], () => r(require('@/views/Publisher/pages/List.vue')), 'publisher_list')
const Publisher_Create = r => require.ensure(['@/views/Publisher/pages/Create.vue'], () => r(require('@/views/Publisher/pages/Create.vue')), 'publisher_create')
const P_Feedback = r => require.ensure(['@/views/Publisher/pages/P_Feedback.vue'], () => r(require('@/views/Publisher/pages/P_Feedback.vue')), 'p_feedback')
const P_Daily_Warning = r => require.ensure(['@/views/Publisher/pages/P_Daily_Warning.vue'], () => r(require('@/views/Publisher/pages/P_Daily_Warning.vue')), 'p_daily_warning')
const P_Email_AM = r => require.ensure(['@/views/Publisher/pages/P_Email_AM.vue'], () => r(require('@/views/Publisher/pages/P_Email_AM.vue')), 'p_email_am')
const P_Email_BD = r => require.ensure(['@/views/Publisher/pages/P_Email_BD.vue'], () => r(require('@/views/Publisher/pages/P_Email_BD.vue')), 'p_email_bd')
const P_Email_Admin = r => require.ensure(['@/views/Publisher/pages/P_Email_Admin.vue'], () => r(require('@/views/Publisher/pages/P_Email_Admin.vue')), 'p_email_admin')
const P_Register_List = r => require.ensure(['@/views/Publisher/pages/P_Register_List.vue'], () => r(require('@/views/Publisher/pages/P_Register_List.vue')), 'p_register_list')
const P_Email_History = r => require.ensure(['@/views/Publisher/pages/P_Email_History.vue'], () => r(require('@/views/Publisher/pages/P_Email_History.vue')), 'p_email_history')
const Manage_Affiliate_Account = r => require.ensure(['@/views/Publisher/pages/Manage_Affiliate_Account.vue'], () => r(require('@/views/Publisher/pages/Manage_Affiliate_Account.vue')), 'manage_affiliate_account')
const Affiliate_Notice = r => require.ensure(['@/views/Publisher/pages/Affiliate_Notice.vue'], () => r(require('@/views/Publisher/pages/Affiliate_Notice.vue')), 'affiliate_notice')
const P_Manage_Approve = r => require.ensure(['@/views/Publisher/pages/P_Manage_Approve.vue'], () => r(require('@/views/Publisher/pages/P_Manage_Approve.vue')), 'p_manage_approve')
const P_Register_History = r => require.ensure(['@/views/Publisher/pages/P_Register_History.vue'], () => r(require('@/views/Publisher/pages/P_Register_History.vue')), 'p_register_history')
const P_AM_History = r => require.ensure(['@/views/Publisher/pages/P_AM_History.vue'], () => r(require('@/views/Publisher/pages/P_AM_History.vue')), 'p_am_history')
const P_BD_History = r => require.ensure(['@/views/Publisher/pages/P_BD_History.vue'], () => r(require('@/views/Publisher/pages/P_BD_History.vue')), 'p_bd_history')
const Publisher_Manage = r => require.ensure([], () => r(require('@/views/Publisher/pages/Manage.vue')), 'publisher_manage')

/*Tools*/
const Notice = r => require.ensure(['../src/views/Tool/Notice.vue'], () => r(require('../src/views/Tool/Notice.vue')), 'notice')
const Offer_Audit_Log = r => require.ensure(['../src/views/Tool/Offer_Audit_Log.vue'], () => r(require('../src/views/Tool/Offer_Audit_Log.vue')), 'offer_audit_log')
const Offer_Approval_Query = r => require.ensure(['../src/views/Tool/Offer_Approval_Query.vue'], () => r(require('../src/views/Tool/Offer_Approval_Query.vue')), 'offer_approval_query')
const Offer_Daily_Exception_Monitoring = r => require.ensure(['../src/views/Tool/Offer_Daily_Exception_Monitoring.vue'], () => r(require('../src/views/Tool/Offer_Daily_Exception_Monitoring.vue')), 'offer_daily_exception_monitoring')
const Affiliate_Daily_Exception_Monitoring = r => require.ensure(['../src/views/Tool/Affiliate_Daily_Exception_Monitoring.vue'], () => r(require('../src/views/Tool/Affiliate_Daily_Exception_Monitoring.vue')), 'affiliate_daily_exception_monitoring')
const Adv_Offer_ID = r => require.ensure(['../src/views/Tool/Adv_Offer_ID.vue'], () => r(require('../src/views/Tool/Adv_Offer_ID.vue')), 'adv_offer_id')
const Hide_Conversion_Setting = r => require.ensure(['../src/views/Tool/Hide_Conversion_Setting.vue'], () => r(require('../src/views/Tool/Hide_Conversion_Setting.vue')), 'hide_conversion_setting')
const Settings = r => require.ensure(['../src/views/Tool/Settings.vue'], () => r(require('../src/views/Tool/Settings.vue')), 'settings')
/*Employee*/
const Admin_Create_Emp = r => require.ensure(['@/views/Employees/Admin_Create_Emp.vue'], () => r(require('@/views/Employees/Admin_Create_Emp.vue')), 'admin_create_emp')
const Admin_Employees = r => require.ensure(['@/views/Employees/Admin_Employees.vue'], () => r(require('@/views/Employees/Admin_Employees.vue')), 'admin_employees')
const Admin_Employees_Team = r => require.ensure(['@/views/Employees/Admin_Employees_Team.vue'], () => r(require('@/views/Employees/Admin_Employees_Team.vue')), 'admin_employees_team')
const Admin_Manage_Emp = r => require.ensure(['@/views/Employees/Admin_Manage_Emp.vue'], () => r(require('@/views/Employees/Admin_Manage_Emp.vue')), 'admin_manage_emp')
const Add_Employees_Team = r => require.ensure(['@/views/Employees/Add_Employees_Team.vue'], () => r(require('@/views/Employees/Add_Employees_Team.vue')), 'add_employees_team')

/*Titles*/
const Create_Title = r => require.ensure(['@/views/Titles/Create_Title.vue'], () => r(require('@/views/Titles/Create_Title.vue')), 'admin_create_title')
const Admin_Titles = r => require.ensure(['@/views/Titles/Admin_Titles.vue'], () => r(require('@/views/Titles/Admin_Titles.vue')), 'admin_titles')
const Create_Auth = r => require.ensure(['@/views/Titles/Create_Auth.vue'], () => r(require('@/views/Titles/Create_Auth.vue')), 'admin_create_auth')
const Admin_Auths = r => require.ensure(['@/views/Titles/Admin_Auths.vue'], () => r(require('@/views/Titles/Admin_Auths.vue')), 'admin_auths')
const Admin_Manage_Title = r => require.ensure(['@/views/Titles/Create_Title.vue'], () => r(require('@/views/Titles/Create_Title.vue')), 'admin_manage_title')
const Admin_Manage_Auth = r => require.ensure(['@/views/Titles/Create_Auth.vue'], () => r(require('@/views/Titles/Create_Auth.vue')), 'admin_manage_auth')

/*Settings*/
const Admin_Settings = r => require.ensure(['@/views/Settings/Admin_Settings.vue'], () => r(require('@/views/Settings/Admin_Settings.vue')), 'admin_settings')


const Logout = r => require.ensure(['@/views/Logout.vue'], () => r(require('@/views/Logout.vue')), 'logout')
const Profile = r => require.ensure(['@/views/Profile.vue'], () => r(require('@/views/Profile.vue')), 'profile')

const Messages = r => require.ensure(['@/views/Message/index.vue'], () => r(require('@/views/Message/index.vue')), 'messages')
const HelpCenter_List = r => require.ensure(['@/views/HelpCenter/List.vue'], () => r(require('@/views/HelpCenter/List.vue')), 'helpcenter_list')
const HelpCenter_Edit = r => require.ensure(['@/views/HelpCenter/Edit.vue'], () => r(require('@/views/HelpCenter/Edit.vue')), 'helpcenter_edit')
const HelpCenter_Detail = r => require.ensure(['@/views/HelpCenter/Detail.vue'], () => r(require('@/views/HelpCenter/Detail.vue')), 'helpcenter_detail')
const SupportCenter_List = r => require.ensure(['@/views/SupportCenter/List.vue'], () => r(require('@/views/SupportCenter/List.vue')), 'supportcenter_list')
const SupportCenter_Edit = r => require.ensure(['@/views/SupportCenter/Edit.vue'], () => r(require('@/views/SupportCenter/Edit.vue')), 'supportcenter_edit')

//const CR_Monitor = r => require.ensure(['@/views/Tool/CR_Monitor.vue'], () => r(require('@/views/Tool/CR_Monitor.vue')), 'cr_monitor')
//const Offer_Url_Check = r => require.ensure(['@/views/Tool/Offer_Url_Check.vue'], () => r(require('@/views/Tool/Offer_Url_Check.vue')), 'offer_url_check')
//const Adv_Transfer_Tool = r => require.ensure(['@/views/Tool/Adv_Transfer_Tool.vue'], () => r(require('@/views/Tool/Adv_Transfer_Tool.vue')), 'adv_transfer_tool')
//const Aff_Transfer_Tool = r => require.ensure(['@/views/Tool/Aff_Transfer_Tool.vue'], () => r(require('@/views/Tool/Aff_Transfer_Tool.vue')), 'aff_transfer_tool')


/*BI*/
const BI = r => require.ensure(['@/views/BI/Index.vue'], () => r(require('@/views/BI/Index.vue')), 'bi')
const BI_Adv = r => require.ensure(['@/views/BI_Adv/List.vue'], () => r(require('@/views/BI_Adv/List.vue')), 'bi_adv_list')
const BI_Adv_Detail = r => require.ensure(['@/views/BI_Adv/Detail.vue'], () => r(require('@/views/BI_Adv/Detail.vue')), 'bi_adv_detail')


Vue.use(VueRouter)

function requireAuth(to, from, next) {
    if (!auth.loggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })

    } else {
        next()
    }
}
function requirePass(to,from,next) {
    next()
}


const router = new VueRouter({
    base: __dirname,
    mode: 'history',
    routes: [
        { path: '/', redirect: 'dashBoard', beforeEnter: requireAuth },
        { path: '/login', component: Login },
        { path: '/dashBoard', component: DashBoard, name: 'dashBoard', beforeEnter: requireAuth },
        { path: '/p_create_offer', component: Offer_Create, beforeEnter: requireAuth },
        { path: '/p_offers', component: Offer_All, beforeEnter: requireAuth},
        { path: '/p_offer_group', component: Offer_Group, beforeEnter: requireAuth},
        { path: '/p_manage_offer', component: Offer_Detail, beforeEnter: requireAuth },
        { path: '/p_offer_applications', component: Offer_Applications, beforeEnter: requireAuth},
        { path: '/p_create_category', component: P_Create_Category, beforeEnter: requireAuth },
        { path: '/p_offer_category', component: P_Offer_Category, beforeEnter: requireAuth },
        { path: '/p_manage_category', component:  P_Manage_Category, beforeEnter: requireAuth },
        { path: '/offer_top', component: Offer_Top, beforeEnter: requireAuth},
        { path: '/p_products', component: P_Products, beforeEnter: requireAuth },
       /* { path: '/file_application', component: File_Application, beforeEnter: requireAuth },*/

        { path: '/report', component: Report, beforeEnter: requireAuth },
        { path: '/report_referral', component: Report_Referral, beforeEnter: requireAuth },
        { path: '/ocpa_report', component: Ocpa_Report, beforeEnter: requireAuth },
        { path: '/fraud_report', component: Fraud_Report, beforeEnter: requireAuth, name: 'fraudReport' },
        { path: '/cps_report', component: Cps_Report, beforeEnter: requireAuth },
        { path: '/history_report', component: History_Report, beforeEnter: requireAuth },
        { path: '/adv_report', component: Adv_Report, beforeEnter: requireAuth },
        { path: '/affiliate_commission', component: Affiliate_Commission, beforeEnter: requireAuth },
        { path: '/manager_commission', component: Manager_Commission, beforeEnter: requireAuth },
        { path: '/antenna_report', component: Antenna_Report, beforeEnter: requireAuth },
        { path: '/event-report', component: EventReport, beforeEnter: requireAuth, name: 'eventReport'},

        { path: '/p_create_adv', component: Adv_Create, beforeEnter: requireAuth },
        { path: '/p_advertisers', component: Adv_List, beforeEnter: requireAuth },
        { path: '/bd_high_advertiser', component: Adv_Rigister, beforeEnter: requireAuth },
        { path: '/p_manage_adv', component: Adv_Manage, beforeEnter: requireAuth },
        { path: '/bd_high_advertiser_detail', component: Adv_Detail, beforeEnter: requireAuth },
/*        { path: '/Advertiser/sign-up', component: Adv_SignUp,caseSensitive:true },*/

        { path: '/p_affs', component: Publisher_List, beforeEnter: requireAuth },
        { path: '/p_create_aff', component: Publisher_Create, beforeEnter: requireAuth },
        { path: '/p_feedback', component:  P_Feedback, beforeEnter: requireAuth },
        { path: '/p_daily_warning', component:  P_Daily_Warning, beforeEnter: requireAuth },
        { path: '/p_email_am', component:  P_Email_AM, beforeEnter: requireAuth },
        { path: '/p_email_bd', component:  P_Email_BD, beforeEnter: requireAuth },
        { path: '/p_email_admin', component:  P_Email_Admin, beforeEnter: requireAuth },
        { path: '/p_register_list', component:  P_Register_List, beforeEnter: requireAuth },
        { path: '/p_email_history', component:  P_Email_History, beforeEnter: requireAuth },
        { path: '/manage_affiliate_account', component:  Manage_Affiliate_Account, beforeEnter: requireAuth },
        { path: '/affiliate_notice', component:  Affiliate_Notice, beforeEnter: requireAuth },
        { path: '/p_manage_approve', component:  P_Manage_Approve, beforeEnter: requireAuth },
        { path: '/p_register_history', component:  P_Register_History, beforeEnter: requireAuth },
        { path: '/p_am_history', component:  P_AM_History, beforeEnter: requireAuth },
        { path: '/p_bd_history', component:  P_BD_History, beforeEnter: requireAuth },
        { path: '/p_manage_aff', component: Publisher_Manage, beforeEnter: requireAuth },

        { path: '/notice', component: Notice, beforeEnter: requireAuth },
        { path: '/offer_audit_log', component: Offer_Audit_Log, beforeEnter: requireAuth },
        { path: '/offer_approval_query', component: Offer_Approval_Query, beforeEnter: requireAuth },
        { path: '/update_help_center', component: HelpCenter_List, beforeEnter: requireAuth },
        { path: '/edit_help_center', component: HelpCenter_Edit, beforeEnter: requireAuth },
        { path: '/help_center_detail', component: HelpCenter_Detail, beforeEnter: requireAuth },
        { path: '/update_support_center', component: SupportCenter_List, beforeEnter: requireAuth },
        { path: '/edit_support_center', component: SupportCenter_Edit, beforeEnter: requireAuth },
        { path: '/offer_daily_exception_monitoring', component: Offer_Daily_Exception_Monitoring, beforeEnter: requireAuth },
        { path: '/affiliate_daily_exception_monitoring', component: Affiliate_Daily_Exception_Monitoring, beforeEnter: requireAuth },
        { path: '/adv_offer_id', component: Adv_Offer_ID, beforeEnter: requireAuth },
        { path: '/hide_conversion_setting', component: Hide_Conversion_Setting, beforeEnter: requireAuth },
        { path: '/settings', component: Settings, beforeEnter: requireAuth },

        { path: '/admin_create_emp', component: Admin_Create_Emp, beforeEnter: requireAuth },
        { path: '/admin_employees', component: Admin_Employees, beforeEnter: requireAuth },
        { path: '/admin_employees_team', component: Admin_Employees_Team, beforeEnter: requireAuth },
        { path: '/admin_manage_emp', component: Admin_Manage_Emp, beforeEnter: requireAuth },
        { path: '/add_employees_team', component: Add_Employees_Team, beforeEnter: requireAuth },

        { path: '/admin_create_title', component: Create_Title, beforeEnter: requireAuth },
        { path: '/admin_titles', component: Admin_Titles, beforeEnter: requireAuth },
        { path: '/admin_create_auth', component: Create_Auth, beforeEnter: requireAuth },
        { path: '/admin_auths', component: Admin_Auths, beforeEnter: requireAuth },
        { path: '/admin_manage_title', component: Admin_Manage_Title, beforeEnter: requireAuth },
        { path: '/admin_manage_auth', component: Admin_Manage_Auth, beforeEnter: requireAuth },

        { path: '/admin_settings', component: Admin_Settings, beforeEnter: requireAuth },

        { path: '/bi', component: BI, beforeEnter: requireAuth },
        { path: '/bi_adv_dedail', component: BI_Adv_Detail, beforeEnter: requireAuth },
        { path: '/bi_adv', component: BI_Adv, beforeEnter: requireAuth },



        { path: '/messages', component: Messages, beforeEnter: requireAuth, name: 'message' },
        { path: '/p_profile', component: Profile, beforeEnter: requireAuth },
        { path: '/logout', component: Logout },

        //{ path: '/cr_monitor', component: CR_Monitor, beforeEnter: requireAuth },
        //{ path: '/offer_url_check', component: Offer_Url_Check, beforeEnter: requireAuth },

        {
            path: '*/:html.html',
            redirect: to => {
                // 方法接收 目标路由 作为参数
                // return 重定向的 字符串路径/路径对象
                if(to.params[0]) {
                    return to.params[0] + "/" + to.params.html
                } else {
                    return to.params.html
                }
            }
        },

        { path: '*', redirect: '/'}

    ]
})

let  to_path = ""
router.beforeEach((to, from, next) => {
    try{
        console.log("from: " + from.fullPath)
        console.log("to path: " + to.fullPath)
        to_path = to.fullPath
        next() // 确保一定要调用 next()
    }catch(e){
        location.href = "./" + to.fullPath
        next(e)
    }

})

router.onError(function(error){
    location.href = "./" + to_path
})
export default router
