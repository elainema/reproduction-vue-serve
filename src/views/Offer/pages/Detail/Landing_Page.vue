<template>
    <div v-yeah-loading='loadingZone'>

        <div class="box" ref="ladnging_page_wrapper">
            <div class="box-header" v-box-action-resize>
                <h2>Landing Page</h2>
                <div class="box-action">
                    <i class="icon-chevron-up" title="Fold"></i>
                    <i class="icon-chevron-down hide" title="Unfold"></i>
                </div>
            </div>
            <div class="box-container" >
                <div class="box-content " id="aff_access" ref="aff_access">
                    <form class="form-horizontal frm-entity frm-detail">
                        <div class="control-group form-group">
                            <label class="control-label col-md-2">Key</label>
                            <div class="controls col-md-10 nomargin nopadding">
                                {{offerInfo && offerInfo.unique_key && offerInfo.unique_key.unique_key}}
                            </div>
                        </div>

                        <div class="control-group form-group">
                            <label class="control-label col-md-2">Landing Url</label>
                            <div class="controls col-md-10 nomargin nopadding">
                                <div class="col-md-5 nopadding">
                                    <input type="text" name="fetch_url" class="form-control " v-model="manifest_url_landing">
                                </div>

                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2">Landing Url Name</label>
                            <div class="controls col-md-10 nomargin nopadding">
                                <div class="col-md-5 nopadding">
                                    <input type="text" name="fetch_url_name" class="form-control " v-model="manifest_url_landing_name">
                                </div>
                                <div class="col-md-3">
                                    <button type="button" class="btn btn-primary " @click.prevent="saveLandingPage('landing')">Save</button>
                                </div>
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2">Landing</label>
                            <div class="col-md-10 nopadding">
                                <div class="url_block col-md-5 nopadding">
                                    <ul class="">
                                        <li class="landing_item" v-if="item.is_hide != 1 " v-for="item in landing.landing"  @click="clickLanding('landing', item, $event)" >{{item.name}}  <span v-if="item.is_publish || landing_published_id == item.id"><a ref="landing_published_flag" :data-id="item.id" :href="item.tracking_url" target="_blank"><i class="fa fa-link"  style="color: #677cff;" aria-hidden="true"></i></a></span></li>
                                    </ul>
                                </div>
                                <div class="col-md-3">
                                    <button type="button" class="btn btn-primary" @click="getLandingActionList('landing','publish')">Publish</button><br>
                                    <a :href="newwin_url" target="_blank" ref="preview_url"></a>


                                    <!--<button type="button" class="btn btn-primary mt10" @click="editLandingPage('landing')">Edit</button><br>-->
                                    <button type="button" class="btn btn-default mt10" @click="getLandingActionList('landing','delete')">Delete</button>
                                </div>
                            </div>
                        </div>




                        <div class="control-group form-group">
                            <label class="control-label col-md-2">Pre-Landing Url</label>
                            <div class="controls col-md-10 nomargin nopadding">
                                <div class="col-md-5 nopadding">
                                    <input type="text" name="pre_url" class="form-control " v-model="manifest_url_prelanding">
                                </div>
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2">Pre-Landing Url Name</label>
                            <div class="controls col-md-10 nomargin nopadding">
                                <div class="col-md-5 nopadding">
                                    <input type="text" name="pre_url_name" class="form-control " v-model="manifest_url_prelanding_name">
                                </div>
                                <div class="col-md-3">
                                    <button type="button" class="btn btn-primary " @click.prevent="saveLandingPage('prelanding')">Save</button>
                                </div>
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2">Pre-Landing</label>

                            <div class="col-md-10 nopadding">
                                <div class="url_block col-md-5 nopadding">
                                    <ul class="">
                                        <li class="landing_item" v-if="item.is_hide != 1 "  v-for="item in landing.prelanding" @click="clickLanding('prelanding', item, $event)"  >{{item.name}} <span v-if="item.is_publish || prelanding_published_id == item.id"><a ref="prelanding_published_flag" :data-id="item.id"  :href="item.tracking_url" target="_blank"><i class="fa fa-link"  style="color: #677cff;" aria-hidden="true"></i></a></span></li>
                                    </ul>
                                </div>
                                <div class="col-md-3">
                                    <button type="button" class="btn btn-primary" @click="getLandingActionList('prelanding','publish')">Publish</button><br>
                                    <!--<button type="button" class="btn btn-primary mt10" @click="editLandingPage('prelanding')">Edit</button><br>-->
                                    <button type="button" class="btn btn-default mt10"  @click="getLandingActionList('prelanding','delete')">Delete</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
        <!-- <editLandingModal :modalState="modalState" :hideModal="hideModal" :showAlert="showAlert"  :landing_id="landing_id" :landing_name="landing_name" :landing_url="landing_url" :offer_id="offer_id" :offer_url="offerInfo.offer_url" :tracking_url="tracking_url" :landing_site="landing_site" :onConfirm="publishPage"></editLandingModal> -->

    </div>
</template>

<script>
    import common from '@/util/common'

    import mixin_modal from '@/mixins/modal'

    import Vue from "vue"

   // const editLandingModal = () => import(/* webpackChunkName: "editLandingModal" */ '@/components/EditLandingModal.vue');
    
    export default {
        data() {
            return {
                loadingZone:false,
                offer_id:this.$route.query.id,
                manifest_url_prelanding:"",
                manifest_url_landing:"",
                manifest_url_landing_name:"",
                manifest_url_prelanding_name:"",
                landing_site:"",
                landing_name:"",
                landing_url:"",
                landing_id:"",
                tracking_url:"",
                newwin_url:"",
                landing_published_id:"",
                prelanding_published_id:"",
                landing:{landing:{},prelanding:{}},
                selected:{landing:{},prelanding:{}}

            }
        },
        props:{
            renderOffer:{default:false},
            offerInfo:{},
            showAlert:{},
            setOfferEditAuth:{}
        },
        mixins:[mixin_modal],
        // components: {editLandingModal},
        methods: {
            fetchManiFestUrl(type){
                let that = this
                let params = {id:this.offer_id,unique_key: this.offerInfo.unique_key.unique_key, manifest_url: this['manifest_url_' + type] }

                this.landing_published_id = $(this.$refs.landing_published_flag).attr("data-id");
                this.prelanding_published_id = $(this.$refs.prelanding_published_flag).attr("data-id");
                Vue.http.post("Offer2/fetchManiFestUrl", params).then(response => {
                    let data =  response.body && response.body.data
                    that.landing.landing = _.filter(data, function(item){ return item.type === "landing"})
                    that.landing.prelanding = _.filter(data, function(item){ return item.type === "prelanding"})

                }, response => {
                    // error callback

                    this.showAlert(response.body.msg, 'info')
                })
            },
            openWin(url){
                window.open(url, "_blank")
                window.prompt('Press CTRL+C, then ENTER', url);

            },
            clickLanding(type, item, $event){
                this.selected[type] = item;
                $(".landing_item").removeClass("hover")
                $($event.target).addClass("hover")
            },
            /*showEditModal(selected){
                let that = this;
                this.getDomain(function(data){
                    that.landing_site = data.ind_domain
                    that.modalState= "show"
                })
            },*/
            previewLandingPage(type, action){
                let that = this
                if(_.isEmpty(that.selected[type])) return
                let  selected = _.find(that.landing[type], {id:that.selected[type].id})

                if(_.isEmpty(selected.is_publish)) {
                    that.getLandingList("", function(){
                        if(!_.isEmpty(selected)) {
                            that.openWin(selected.tracking_url)
                        }
                    })
                } else {
                    if(!_.isEmpty(selected)) {
                        that.openWin(selected.tracking_url)
                    }
                }

            },
            /*getDomain(callback){
                Vue.http.get("Advertiser/getAdvertiserIndDomain", {params: {advertiser_id: this.offerInfo.advertiser_id} }).then(response => {
                    let data =  response.body && response.body.data
                    if(!data) return this.showAlert("Please add domain first", "info")
                    callback && callback(data)
                }, response => {
                    // error callback
                })
            },*/
            /*editLandingPage(type){
                let that = this
                let  selected = _.find(that.landing[type], {name:that.selected[type].name})
                if(_.isEmpty(selected)) return;
                if(_.isEmpty(selected.is_publish)) {
                    that.getLandingList("", function(){
                        if(!_.isEmpty(selected)) {
                            that.landing_name = selected.name
                            that.landing_url = selected.url
                            that.landing_id = selected.land_id
                            that.tracking_url = selected.tracking_url
                            that.showEditModal(selected)
                        }
                    })
                } else {
                    if(!_.isEmpty(selected)) {
                        that.landing_name = selected.name
                        that.landing_url = selected.url
                        that.landing_id = selected.land_id
                        that.tracking_url = selected.tracking_url
                        that.showEditModal(selected)
                    }
                }

            },*/
            removeLandingList(type) {
                let that = this
                if(_.isEmpty(that.selected[type])) return
                let params = {id:this.offer_id, action:"delete", land_id:that.selected[type].land_id}
                Vue.http.post("Offer2/getLandingList", params).then(response => {
                    let data =  response.body && response.body.data
                    that.landing.landing = data && data.landings || []
                    that.landing.prelanding = data && data.prelandings || []


                }, response => {
                    // error callback
                })
            },
            publishPage(landing_name, landing_url, site, land_id){
                let that = this
                let params = {id:this.offer_id, action:"publish", tracking_url:landing_url, land_id:land_id}
                Vue.http.post("Offer2/getLandingList", params).then(response => {
                    let data =  response.body && response.body.data

                    that.landing.landing = data && data.landings || []
                    that.landing.prelanding = data &&  data.prelandings || []

                    that.showAlert("Publish Successfully!","success")
                }, response => {
                    // error callback
                })
            },
            getLandingList(type, callback){
                let that = this

                let params = {id:this.offer_id,}
                Vue.http.post("Offer2/getLandingList", params).then(response => {
                    let data =  response.body && response.body.data
                    //data = {landings:[{"url":"http://baidu.com", "name":"Hammer of Thor (blue drops) - VN - Blue [25093] (+mobile) 1","type":"landing","land_id":1}],prelandings:[{"url":"https://m.baidu.com/", "name":"Hammer of Thor (blue drops) - VN - Blue [25093] (+mobile) 2","type":"prelanding","land_id":2}]}

                    if(data){
                        that.landing.landing = data.landings;
                        that.landing.prelanding = data.prelandings;
                        callback && callback()
                    } else {
                        type !== "init" &&  that.showAlert("Please wait util landing list complete", "info")
                        return
                    }

                }, response => {
                    // error callback
                })
            },
            saveLandingPage(type){
                let that = this;
                let inputUrl = this['manifest_url_' + type];
                let inputName = $.trim(this['manifest_url_'+ type +'_name']);
                if (!this.checkUrl(inputUrl)){
                    this.showAlert('URL format error!', 'info');
                    return false;
                }
                if (inputName == ''){
                    this.showAlert('URL Name can\'t be empty!', 'info');
                    return false;
                }
                let params = {id:this.offer_id,type:type, tracking_url: inputUrl ,name:inputName}

                this.landing_published_id = $(this.$refs.landing_published_flag).attr("data-id");
                this.prelanding_published_id = $(this.$refs.prelanding_published_flag).attr("data-id");
                Vue.http.post("Offer2/saveLandingPage", params).then(response => {
                    let data =  response.body && response.body.data
                    that.landing.landing = data.landings;
                    that.landing.prelanding = data.prelandings;

                }, response => {
                    this.showAlert(response.body.msg, 'info')
                })
            },
            checkUrl(str) {
                var RegUrl = new RegExp();
                RegUrl.compile("[a-zA-z]+://[^\s]*");
                if (!RegUrl.test(str)) {
                    return false;
                }
                return true;
            },
            getLandingActionList(type, action,callback){
                let that = this

                let  selected = _.find(that.landing[type], {id:that.selected[type].id});
                if(_.isEmpty(selected)) return;

                let params = {id:this.offer_id,action:action,land_id:selected.id}
                Vue.http.post("Offer2/getLandingList", params).then(response => {
                    let data =  response.body && response.body.data
                    //data = {landings:[{"url":"http://baidu.com", "name":"Hammer of Thor (blue drops) - VN - Blue [25093] (+mobile) 1","type":"landing","land_id":1}],prelandings:[{"url":"https://m.baidu.com/", "name":"Hammer of Thor (blue drops) - VN - Blue [25093] (+mobile) 2","type":"prelanding","land_id":2}]}

                    if(data){

                        that.landing.landing = data.landings;
                        that.landing.prelanding = data.prelandings;
                        callback && callback()
                    } else {
                        type !== "init" &&  that.showAlert("Please wait util landing list complete", "info")
                        return
                    }

                }, response => {
                    // error callback
                })
            }
        },
        watch:{

            renderOffer(newVal, oldVal) {
                let that = this
                if (newVal) {
                    this.$nextTick(function () {
                        this.setOfferEditAuth(this.$refs.ladnging_page_wrapper)
                    })
                }
            },


        },
        mounted() {
            this.getLandingList("init")
        },
    }
</script>
<style scoped>
    .url_block {
        border: 1px solid #cecece;
        height: 200px;
        overflow-y: scroll;
    }

    .url_block  li {
        line-height: 35px;
        padding: 0 10px;
        cursor: pointer;
        border-bottom: 1px solid #eae8e8;
    }
    .url_block  li:hover,
    .url_block  li.hover{
        background: #efefef
    }
</style>