<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
<div id="breadcrumb_container">
    <ul class="breadcrumb">
        <li><router-link to="./">Home</router-link></li>
        <li class="active">Create Employee</li>
    </ul>
</div>
<div class="box">
    <div class="box-header">
        <h2>Create Employee</h2>
        <div class="box-action"></div>
    </div>
    <div class="box-container">
        <div class="box-content">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <form class="form-horizontal frm-entity" action="" method="post" id="cc_add" ref="cc_add" @submit.prevent="formSubmit">
                <div class="box-sub-header">
                    <h3>Auth</h3>
                </div>
                <div class="box-content">
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="email">Email<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <input type="email" class="col-md-5 form-control" name="email" id="email" required v-model="email"/>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="password">Password<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <div class="input-append">
                                <input v-model="password" class="col-md-3 form-control pull-left mr10" name="password" id="password" maxlength="200" type="text" required />
                                <a class="btn" id="gen_pass" @click.prevent="generate_password">Generate</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-sub-header">
                    <h3>Personal Info</h3>
                </div>
                <div class="box-content">
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="name">First Name<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <input type="text" class="col-md-3" name="first_name" id="first_name" required />
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="last_name">Last Name<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <input type="text" class="col-md-3" name="last_name" id="last_name" required />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label col-md-2" for="phone">Phone</label>
                        <div class="controls">
                            <input v-model="phone" ref="phone" type="text" class="col-md-3" name="profile[phone]" id="phone" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label col-md-2" for="im">IM</label>
                        <div class="col-md-offset-2  " id="ims" ref="ims">
                            <div class="im-base">
                                <select class=" form-control col-md-2  pull-left mr10" v-model="profile_val">
                                    <option value="qq">QQ</option>
                                    <option value="skype">Skype</option>
                                    <option value="msn">Msn</option>
                                    <option value="gtalk">Gtalk</option>
                                    <option value="wechat">Wechat</option>
                                </select>
                                <a href="#" class="btn im-add-btn" id="btn_im_add" @click.prevent="btn_im_add"><i class="icon-plus fa fa-plus"></i></a>
                            </div>
                            <div id="im_container" ref="im_container">
                                <div class="im-base" v-for="(i, index) in ims">
                                    <table>
                                        <colgroup><col width="400" /><col width="" /></colgroup>
                                        <tr>
                                            <td>
                                                <input type="text" class="col-md-11" :name="'profile['+ i.profile_val +']'" :placeholder=" i.profile_name" />
                                            </td>
                                            <td>
                                                <a v-if="index != 0" href="#" class="btn btn-danger" title="Remove" @click.prevent="remove_im(i.profile_val)"><i class="fa fa-remove"></i></a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="role_id">Title<i class="icon-exclamation red"></i></label>
                        <div class="col-md-2 row">
                            <select id="role_id" name="role_id" required>
                                <option value="">- Title -</option>
                                <option :value="n.id" v-for="n in roles">{{n.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="status">Status</label>
                        <div class="col-md-2 row">
                            <select name="status" id="status">
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="deleted">Deleted</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <div class="col-md-offset-2 ">
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <button type="reset" class="btn btn-default">Cancel</button>
                        </div>
                    </div>
                    <input type="hidden" name="token" v-model="token" />
                </div>

            </form>
        </div>
    </div>
</div>
</div>
</template>

<script>
import Vue from "vue"
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_alert_msg from '@/mixins/alert_msg'
import common from '@/util/common'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            loadingZone:false,
            profile_val:'qq',
            ims:[{
                profile_val:'qq',
                profile_name:'QQ'
            }],
            roles:[],
            phone:'',
            password:'',
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            token:'',
            email:''

        }
    },
    computed: {
        ...mapGetters({
            userInfo:"userInfo",
        })
    },
    components: {AlertPop},
    mixins: [mixin_alert_msg],
    methods: {
        generate_password() {
            var password = common.generate_password()
            this.password = password
        },
        btn_im_add(e) {
            var that = this
            var _this = $(e.target);
            var im_base = $(e.target).prev('.im-base');
            var profile_val = this.profile_val;
            var profile_name = $(this.$refs.ims).find("option:selected").text();
            var _im = {
                profile_val,
                profile_name
            }
            if( $(that.$refs.im_container).find('input[name="profile['+ profile_val +']"]').length == 0 ) this.ims.push(_im)
        },
        remove_im(profile_val) {
            var that = this
            var ims = that.ims
            var new_ims = _.filter(ims, function(n) {
                 return n.profile_val != profile_val;
            });
            that.ims = new_ims
        },
        formSubmit() {
            var value = this.phone;
            let that = this
            if(/^\+?[\s\d\-\(\)]*$/.test(value) == false){
                this.showAlert('Please input the correct phone number', 'error');
                $(that.$refs.phone).focus();
                return false;
            }
            this.loadingZone = true
            var query = $(this.$refs.cc_add).getFormQuery()

            Vue.http.post('Employee/create', query).then(response => {
                this.showAlert(response.body.msg, 'success')
                this.$router.push('/admin_manage_emp?id=' + response.body.data.id);
                this.loadingZone = false
            }, response => {
                this.showAlert(response.body.msg)
                this.loadingZone = false
            })
        },
        getRoleList() {
            Vue.http.get('Role/getSelectAllList').then(response => {
                var data = response.body && response.body.data && response.body.data.list;
                this.roles = data
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
    },
    created () {
        let that = this
        that.getRoleList()
    },
    watch:{
        email() {
            this.token = md5(this.userInfo.id + this.email)
        }
    },
    mounted () {

    }
}
</script>


<style scoped>
#im_container .im-base {
    margin-top: 20px;
}
.field-required i.red{
    position: relative;
    top: 0;
    padding-left: 15px;
}
</style>