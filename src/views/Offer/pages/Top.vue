<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class="active">Top Offers</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <div class="box-container ">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

            <form class="form-horizontal frm-entity frm-detail form-report ocpaReportForm" ref="form_report" action="" method="post" id="qf_offer">
                <div class="box-container" id="filter_check_box">
                    <!-- <div class="box-sub-header" v-box-action-resize>
                        <h3>Options</h3>
                        <div class="box-action">
                            <span class="icon-chevron-up" title="Fold"></span>
                            <span class="icon-chevron-down hide" title="Unfold"></span>
                        </div>
                    </div> -->
                    <div class="box-content">
                        <div class="form-group">
                            <label class="control-label col-md-2">Sort</label>
                            <div class="col-md-10">
                                <select class="form-control col-md-4"　name="" id="" v-model="sort">
                                    <option value="conversion">Volume</option>
                                    <option value="rpc">EPC</option>
                                    <option value="revenue">Revenue</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">Filter:</label>
                            <div class="col-md-10">
                                <chosen_container_offer class="pull-left" :option0="option0" :chosenInfo="sourceCategory" :renderOffer="renderOffer" :chosenCallback="categoryChosenCallback"  :chosenName="'conversionFlow'" ref="category" id="category"></chosen_container_offer>

                                <chosen_container_offer class="pull-left" :option0="option1" :chosenInfo="sourceGeo" :renderOffer="renderOffer" :chosenCallback="geoChosenCallback"></chosen_container_offer>

                                <select class="col-md-4 chosenSelect inline-block" v-model="conversion_flow">
                                    <option value="" >{{option2}}</option>
                                    <option v-for="n in sourceConversionFlow" :value="n.name" :data-name="n.name">{{ n.name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="control-group form-group hide">
                            <label class="control-label col-md-2" for="offerType">Offer Type</label>
                            <div class="col-lg-10 col-md-10 col-sm-10 ">
                                <select class=" form-control col-md-4" data-name="filters[offer_type]"  >
                                    <option value="app_download">APP Download</option>
                                    <option value="mobile_content">Mobile Content</option>
                                </select>
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="control-label col-md-2">Date</label>
                            <div class="col-lg-10 col-md-10 col-sm-10 ">
                                <dateTimePicker_range :no_hour="true" :show_date_shortcut="false" :from_date="'week'"></dateTimePicker_range>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">EPC</label>
                            <div class="col-md-10">
                                <input type="number" :name="EPCFrom != '' ? 'filters[cpc][$gte]' : ''" class="col-md-3 form-control" placeholder="From" v-model="EPCFrom"/>
                                <input type="number" :name="EPCTo != '' ? 'filters[cpc][$lte]' : ''" class="col-md-3 form-control" placeholder="To" v-model="EPCTo"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">Conversion</label>
                            <div class="col-md-10">
                                <input type="number" :name="conversionFrom != '' ? 'filters[conversion][$gte]' : ''" class="col-md-3 form-control" placeholder="From" v-model="conversionFrom"/>
                                <input type="number" :name="conversionTo != '' ? 'filters[conversion][$lte]' : ''"　class="col-md-3 form-control" placeholder="To" v-model="conversionTo"/>
                            </div>
                        </div>
                        <div class="form-group col-md-offset-2" v-show="isShowFilter">
                            <span class="label label-orange label-filter" v-if="filters_category" v-for="i in filters_category" :id="i.id">Category: {{ i.text }}<i @click="removeLabel(i.id, i.text, 'category')" class="fa fa-remove"></i></span>

                            <span class="label label-orange label-filter" v-if="filters_geo" v-for="i in filters_geo" :id="i.id">Geo: {{ i.text }}<i @click="removeLabel(i.id, i.text, 'geo', i.optionId)" class="fa fa-remove"></i></span>
                        </div>
                        <div class="form-group">
                            <div class="form-actions col-md-offset-2 text-right">
                                <button type="submit" class="btn btn-primary" id="onlineReport" @click.prevent="showModal">Export</button>
                                <button class="btn btn-primary sendTopOffers" style="display:inline" @click.prevent="sendTopOffers('addOffer')" v-if="isAllowed">Send Top Offers</button>
                                <button class="btn btn-primary sendTopOffers" style="display:inline" @click.prevent="getLastSendEmail" v-if="isAllowed">The Last Sent Top Offers</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hidden">
                    <input type="text" name="sort[conversion]" value="-1" v-if="sort === 'conversion'" />
                    <input type="text" name="sort[cpc]" value="-1" v-if="sort === 'rpc'" />
                    <input type="text" name="sort[revenue]" value="-1" v-if="sort === 'revenue'" />
                    <input type="text" name="report_type" value="manage_top_offer">
                    <input type="text" name="page" :value="page">
                    <input type="text" name="limit" :value="limit">
                    <input type="text" name="name" :value="report_name">
                    <input type="text" name="statistic[click]" value="">
                    <input type="text" name="statistic[conversion]" value="">
                    <input type="text" name="calcus[cr][$gt]" value="">
                    <input type="text" name="calcus[cpc]" value="">
                    <input type="text" name="other_data[conversion_flow]" :value="conversion_flow" v-if="conversion_flow != ''" />
                    <input type="text" name="druid2" value="1">
                </div>
            </form>
        </div>
    </div>
    <div class="box">
        <div class="box-header" v-box-action-resize>
            <h2>Result</h2>
            <div class="box-action"><span class="icon-chevron-up" title="Fold"></span> <span class="icon-chevron-down hide" title="Unfold"></span></div>
        </div>
        <div class="box-content">
            <div v-show="action === 'export' && !showPreviewTopOffer && !showLastSendEmail">
                <pagination  v-if="dataPage" :pageLimit="limit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="page"></pagination>
                <div class="box-content overflow_scroll">
                    <table id="pageTable" class="table table-bordered table-hover">
                        <thead class="" v-show='reportName.length'>
                            <tr>
                                <th v-for="(item,index ) in reportName" v-if="item.toLowerCase()!=='id' && item.toLowerCase()!=='type' && item.toLowerCase()!=='failed_reason'"> {{item | capitalize}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="reportData.length == 0"><td colspan="4"><strong>No Results.</strong></td></tr>
                            <tr v-else v-for="(item,index ) in reportData">
                                <td v-for="(_item,_index ) in item"  v-if="_index !== 0 && _index !== item.length -1 && _index !== item.length - 2">
                                    <a v-if="_index === 4 && _item" title="" target="_blank" download="" :href="_item">Download</a>
                                    <span v-text="_item" v-else></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pagination v-if="dataPage" :pageLimit="limit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="page"></pagination>
            </div>

            <div v-show="action === 'addOffer' && !showPreviewTopOffer && !showLastSendEmail" id="AddTopOfferController">
                <div class="headerView">
                    <h1 class="mb10">Top Offers for Last 7 Days</h1>
                    <h2 class="mb10" id="timeSection" v-html="timeSection">{{timeZone}}</h2>
                </div>
                <div class="offerAddActionView" id="offerAddActionView">
                    <input type = "text" class="col-md-2 pull-left mr10" placeholder="please enter the offer id" v-model.trim="offer"></input>
                    <button class="btn btn-primary " value="Add" @click="addOffer(offer)">Add</button>
                    <span>Please add offers to the list. Make sure that CR and EPC values are edited reasonably.</span>
                </div>
                <ul id="offerTabtabListView" class="nav nav-tabs  mt20">
                    <li class="active"  @click="actionHandler('EPC')"><a href="#editEPCTable" data-toggle="tab">Top offers by EPC</a></li>
                    <li class="" @click="actionHandler('Volume')"><a href="#editVolumeTable" data-toggle="tab">Top offers by Volume</a></li>
                    <li class="" @click="actionHandler('Potential')"><a href="#editPotentialTable" data-toggle="tab">New and Potential Top Offers</a></li>
                </ul>
                <div id="tabAddContentView" class="tab-content box-content overflow_scroll">
                    <div class="tab-pane active" id="editEPCTable">
                        <table class="table table-hover tablesorter tbl-fixed emailCloneTable" id="edit_EPC_list">
                            <colgroup>
                                <col width="8%">
                                <col width="15%">
                                <col width="15%">
                                <col width="1%">
                                <col width="15%">
                                <col width="8%">
                                <col width="5%">
                                <col width="5%">
                                <col width="5%">
                                <col width="9%">
                                <col width="5%">
                                <col width="5%">
                            </colgroup>
                            <thead>
                                <tr class="head_tr">
                                    <th><p class="MsoNormal">Offer ID</p></th>
                                    <th><p class="MsoNormal">Offer Name</p></th>
                                    <th><p class="MsoNormal">Category</p></th>
                                    <th><p class="MsoNormal">Geo</p></th>
                                    <th><p class="MsoNormal">Payout $</p></th>
                                    <th><p class="MsoNormal">CR(Gross) %</p></th>
                                    <th><p class="MsoNormal">EPC $</p></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="EPC_offers.length > 0" v-for="data in EPC_offers">
                                    <td width="60" class="offerId" :id="'offer_' +  data.id">
                                        <div class="MsoNormal">{{ data.id }}</div>
                                    </td>
                                    <td width="350">
                                        <div class="MsoNormal"> {{ data.name }}</div>
                                    </td>
                                    <td width="250">
                                        <div class="MsoNormal">{{ data.category.join(",") }} </div>
                                    </td>
                                    <td width="100">
                                        <div class="MsoNormal"><input type="text"  name="geo" class="" style="width:90px;"  @keyup="updateTopOfferList" /></div>
                                    </td>
                                    <td width="80">
                                        <div class="MsoNormal" v-if="data.is_dynamic_revenue == 1">Dynamic</div>
                                        <div v-else>{{data.payout_per_conversion}}</div>
                                    </td>
                                    <td width="80">
                                        <div class="MsoNormal">
                                            <input type="text"  name="cr" class="" style="width:70px;" @keyup="updateTopOfferList" />
                                        </div>
                                    </td>
                                    <td width="80">
                                        <div class="MsoNormal"><input type="text"  name="epc" class="" style="width:70px;"  @keyup="updateTopOfferList" /></div>
                                    </td>
                                    <td width="20">
                                        <div class="MsoNormal"><a href="javascript:;" class="remove" @click.prevent="removeAdded(data.id, 'EPC')"><i class="fa fa-remove"></i></a></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane" id="editVolumeTable">
                        <table class="table table-hover tablesorter tbl-fixed emailCloneTable" id="edit_volume_list">
                            <colgroup>
                                <col width="8%">
                                <col width="15%">
                                <col width="15%">
                                <col width="1%">
                                <col width="15%">
                                <col width="8%">
                                <col width="5%">
                                <col width="5%">
                                <col width="5%">
                                <col width="9%">
                                <col width="5%">
                                <col width="5%">
                            </colgroup>
                            <thead>
                                <tr class="head_tr">
                                    <th><p class="MsoNormal">Offer ID</p></th>
                                    <th><p class="MsoNormal">Offer Name</p></th>
                                    <th><p class="MsoNormal">Category</p></th>
                                    <th><p class="MsoNormal">Geo</p></th>
                                    <th><p class="MsoNormal">Payout $</p></th>
                                    <th><p class="MsoNormal">CR(Gross) %</p></th>
                                    <th><p class="MsoNormal">EPC $</p></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="Volume_offers.length > 0" v-for="data in Volume_offers">
                                    <td width="60" class="offerId" :id="'offer_' +  data.id">
                                        <div class="MsoNormal">{{ data.id }}</div>
                                    </td>
                                    <td width="350">
                                        <div class="MsoNormal"> {{ data.name }}</div>
                                    </td>
                                    <td width="250">
                                        <div class="MsoNormal">{{ data.category.join(",") }} </div>
                                    </td>
                                    <td width="100">
                                        <div class="MsoNormal"><input type="text"  name="geo" class="" style="width:90px;"  @keyup="updateTopOfferList" /></div>
                                    </td>
                                    <td width="80">
                                        <div class="MsoNormal" v-if="data.is_dynamic_revenue == 1">Dynamic</div>
                                        <div v-else>{{data.payout_per_conversion}}</div>
                                    </td>
                                    <td width="80">
                                        <div class="MsoNormal">
                                            <input type="text"  name="cr" class="" style="width:70px;" @keyup="updateTopOfferList" />
                                        </div>
                                    </td>
                                    <td width="80">
                                        <div class="MsoNormal"><input type="text"  name="epc" class="" style="width:70px;"  @keyup="updateTopOfferList" /></div>
                                    </td>
                                    <td width="20">
                                        <div class="MsoNormal"><a href="javascript:;" class="remove" @click.prevent="removeAdded(data.id, 'Volume')"><i class="fa fa-remove"></i></a></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="tab-pane" id="editPotentialTable" >
                        <table class="table table-hover tablesorter tbl-fixed emailCloneTable" id="edit_potential_list">
                            <colgroup>
                                <col width="8%">
                                <col width="15%">
                                <col width="15%">
                                <col width="1%">
                                <col width="15%">
                                <col width="8%">
                                <col width="5%">
                                <col width="5%">
                                <col width="5%">
                                <col width="9%">
                                <col width="5%">
                                <col width="5%">
                            </colgroup>
                            <thead>
                                <tr class="head_tr">
                                    <th><p class="MsoNormal">Offer ID</p></th>
                                    <th><p class="MsoNormal">Offer Name</p></th>
                                    <th><p class="MsoNormal">Category</p></th>
                                    <th><p class="MsoNormal">Geo</p></th>
                                    <th><p class="MsoNormal">Payout $</p></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="Potential_offers.length > 0" v-for="data in Potential_offers">
                                    <td width="60" class="offerId" :id="'offer_' +  data.id">
                                        <div class="MsoNormal">{{ data.id }}</div>
                                    </td>
                                    <td width="350">
                                        <div class="MsoNormal"> {{ data.name }}</div>
                                    </td>
                                    <td width="250">
                                        <div class="MsoNormal">{{ data.category.join(",") }} </div>
                                    </td>
                                    <td width="100">
                                        <div class="MsoNormal"><input @keyup="updateTopOfferList" type="text"  name="geo" class="" style="width:90px;"/></div>
                                    </td>
                                    <td width="80">
                                        <div class="MsoNormal" v-if="data.is_dynamic_revenue == 1">Dynamic</div>
                                        <div v-else>{{data.payout_per_conversion}}</div>
                                    </td>
                                    <td width="20">
                                        <div class="MsoNormal"><a href="javascript:;" class="remove" @click.prevent="removeAdded(data.id, 'Potential')"><i class="fa fa-remove"></i></a></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="text-center mt20 previewBtn"><button class="btn btn-primary preview" :disabled="disabled_preview_btn" @click="onClickPreviewBtn">Preview</button>
                </div>
            </div>

            <div class="mt20" id="previewTopOfferController" v-if="showPreviewTopOffer">
                <div class="form-horizontal frm-entity previewView" id="previewView">
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="subject">Subject</label>
                        <div class="controls">
                            <input type="text" class="col-md-6" id="subject" v-model="getMonthDay" readonly>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label  col-md-2" for="content">Content</label>
                        <div class="controls content">
                            <div src="" frameborder="0" class="" id="emailContentIframe" title="" aria-describedby="cke_38" tabindex="0" allowtransparency="true" style="width: 1050px; height: 500px" ref="emailContentIframe">
                            </div>
                        </div>
                    </div>

                    <div class="control-group form-group text-center" >
                        <label class="control-label col-md-2">&nbsp;</label>
                        <div class="controls">
                            <a href="offer_top" class="btn" id="back" @click.prevent="backToAddContent">Back</a>
                            <a href="javascript:;" class="btn" id="sendEmail" @click.prevent="showConfirmModal">Confirm & Send Email </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt20" id="lastSendEmailController" v-show="showLastSendEmail">
                <div class="form-horizontal frm-entity lastSendEmailView" id="lastSendEmailView">
                    <div v-if="isEmptyLastSendEmailInfo">
                        <p>System has not sent any top offers emails.</p>
                    </div>
                    <div v-else>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2" for="subject">Subject</label>
                            <div class="controls">
                                <input type="text" class="col-md-6" id="subject" :value="lastSendEmailInfo.email_info.title" readonly>
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2" for="sendTo">Send to</label>
                            <div class="controls sendTo  col-md-6 nomargin">
                                <ul>
                                    <li v-for="i in lastSendEmailInfo.passport_info">
                                        {{i.id}}  |  {{i.email}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2" for="editedBy">Edited by</label>
                            <div class="controls">
                                <input type="text" class="col-md-6" id="editedBy" :value="lastSendEmailInfo.email_info.first_name + '.' + lastSendEmailInfo.email_info.last_name" readonly>
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2" for="sendTime">Send Time</label>
                            <div class="controls">
                                <input type="text" class="col-md-6" id="sendTime" :value="lastSendEmailInfo.email_info.send_time" readonly>
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2" for="content">Content</label>
                            <div class="controls content" v-html="lastSendEmailInfo.email_info.content">
                            </div>
                        </div>
                        <div class="control-group form-group text-center" >
                            <label class="control-label col-md-2">&nbsp;</label>
                            <div class="controls">
                                <a href="offer_top" class="btn" id="back">Back</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="email hide" ref="email">
        <p style="font-size: 10.5pt;font-family: 'Calibri', sans-serif;">Dear publishers,</p>
        <p style="font-size: 10.5pt;font-family: 'Calibri', sans-serif;">We are excited to present our top offers which are showing great results for our partners.</p>
        <p style="font-size: 10.5pt;font-family: 'Calibri', sans-serif;">Don't miss these leading campaigns and raise your volumes today!</p>
         <div v-html="convertTableELmToHTml(topOfferLists)"></div>
        <p style="font-size: 10.5pt;font-family: 'Calibri', sans-serif;">Best regards</p>
        <p style="font-size: 10.5pt;font-family: 'Calibri', sans-serif;">YeahMobi Team</p>
        <p style="font-size: 10.5pt;font-family: 'Calibri', sans-serif;">If you don't want to receive these emails, <a target="_blank" href="https://affiliate.yeahmobi.com/index.html#!/account/subscription" style="text-decoration: underline;color: #337ab7;">manage your notification options.</a></p>
    </div>
    <!-- <offlineReportModal :modalState="modalState" :hideModal="hideModal" :runOfflineReport="submitForm"></offlineReportModal> -->
    <offline-report-modal
      :modalState.sync="modalState" 
      :runOfflineReport="submitForm"
      :dialogName="'modalState'"
    ></offline-report-modal>
    <!-- <confirmModal :modalState="confirmModalState" :hideModal="hideModalConfirmModal" :editable_modal_body="editable_modal_body" :onConfirm="onConfirm"></confirmModal> -->
    <modal 
      :dialogVisible.sync="confirmModalState" 
      :dialogBody="editable_modal_body" 
      :title="title"
      :onConfirm="onConfirm">
    </modal>
</div>
</template>

<script>
import Vue from 'vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_alert_msg from '@/mixins/alert_msg'

import chosen_container_offer from '@/components/Chosen_Container_Offer.vue'
import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import pagination from '@/components/Pagination.vue'
//import offlineReportModal from '@/components/OfflineReportModal.vue'
import Validator from '@/util/validator'
//import confirmModal from '@/components/ConfirmModal.vue'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
const OfflineReportModal = () => import(
/* webpackChunkName: "OfflineReportModal" */ '@/components/business/offline-report-modal/'
);

//let ep = new eventProxy()
let EventProxy = require('eventproxy');
let ep = new EventProxy()

export default {
    data(){
        return {
            offer:'',
            loadingZone:"",
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            renderOffer:false,
            option0:'-Category-',
            option1:'-Geo-',
            option2:'-Conversion Flow-',
            sourceCategory:{},
            sourceGeo:{},
            sourceConversionFlow:{},
            filters_category:[],
            filters_geo:[],
            sort:"conversion",
            category:[],
            geo:[],
            reportName:[],
            reportData:[],
            dataPage:false,
            page:1,
            limit:20,
            modalState:'hide',
            confirmModalState:'hide',
            report_name:'',
            conversion_flow:'',
            EPCFrom:'',
            EPCTo:'',
            conversionFrom:'',
            conversionTo:'',
            action:'export',
            timeZone:'',
            timeSection:'',
            offer:'',
            EPC_offers:[],
            Potential_offers: [],
            Volume_offers:[],
            type :'EPC',
            disabled_preview_btn:true,
            topOfferLists:'',
            showPreviewTopOffer:false,
            editable_modal_body:'<p>Confirm and send Top Offers Email now?</p><p>Please note that you can resend email after thirty minutes.</p>',
            Volume:[],
            EPC:[],
            Potential:[],
            showLastSendEmail:false,
            lastSendEmailInfo:{},
            isEmptyLastSendEmailInfo:true,
            emailHeader: '<head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=Generator content="Microsoft Word 15 (filtered medium)"><!--[if gte mso 9]><xml><o:shapedefaults v:ext="edit" spidmax="1026" /></xml><![endif]--><!--[if gte mso 9]><xml><o:shapelayout v:ext="edit"><o:idmap v:ext="edit" data="1" /></o:shapelayout></xml><![endif]--></head>',
            title:'Confirm'
        }
    },
    mixins: [mixin_alert_msg],
    watch:{
        timeZone(newVal, oldVal) {
            if (newVal) {
                this.timeSection = '<span>【GMT 0】' + this.timeZone.start_time + ' - ' + this.timeZone.end_time + '</span>'
            }
        },
    },
    computed: {
        userInfo(){
          return this.$store.state.app.userInfo
        },
        isShowFilter() {
            if (this.filters_category || this.filters_geo) {
                return true
            } else {
                return false
            }
        },
        getMonthDay(){
            var dateObj = new Date();
            var month =  dateObj.getUTCMonth() + 1 ; //months from 1-12
            var day = dateObj.getUTCDate();
            month = month > 9 ? month : ("0" + month);
            day =  day > 9 ? day : ("0" + day);
            return 'Top Offers ' +  month + "-" + day + ' YeahMobi'
        },
        isAllowed() {
            var that = this
            var userRole = (that.userInfo.name || "").toLowerCase().replace(/\s/gi,"_")
            if (_.indexOf(["am","super_am","am-bd"], userRole) !== -1) {
                return true
            } else {
                return false
            }
        },
    },
    mixins: [mixin_alert_msg],
    components: {AlertPop, chosen_container_offer, dateTimePicker_range, pagination,OfflineReportModal,Modal},
    methods: {
        getLastSendEmail() {
            let that = this
            that.showLastSendEmail = true
            that.showPreviewTopOffer = false
            Vue.http.get('Email/getLastTopOfferEmail').then(response => {
                var data = response.body && response.body.data
                if (data) {
                    that.lastSendEmailInfo = data
                    that.isEmptyLastSendEmailInfo = false
                } else {
                    that.isEmptyLastSendEmailInfo = true
                }
            }, response => {
                var msg = response && response.body && response.body.msg
                that.showAlert(msg)
            })
        },
        onConfirm() {
/*
                    that.$("#sendEmail").prop("disabled",true).text("Sending Email")
                    that.$("#sendEmail").attr("disabled",true)
                    */
            var that = this;
            var params = this.getParams();
            var content =  '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head>' + that.emailHeader + '</head><body>' + $(that.$refs.emailContentIframe).html() + "<body></html>"
            var query = $.extend(params, {content:content});
            that.hideModal();
            Vue.http.post('Email/sendTopOfferEmail', query).then(response => {
                that.showAlert("send email success", "success")
            }, response => {
                var msg = response && response.body && response.body.msg
                that.showAlert(msg,"error")
            })
            this.confirmModalState = false

        },
        getParams:function(){
            var obj = {
                volume:this.Volume.join(','),
                epc:this.EPC.join(','),
                new_potential:this.Potential.join(',')
            }
            return obj
        },
        showConfirmModal() {
            this.confirmModalState = 'show'
        },
        removeAdded(id, type) {
            var that = this;
            var oldV = that[type + '_offers']
            var newV = _.filter(oldV, function(item) {
                return item.id != id
            });
            that[type + '_offers'] = newV
        },
        backToAddContent() {
            this.showPreviewTopOffer = false
        },
        onClickPreviewBtn: function() {
            var cloneTable = $(".emailCloneTable").clone()
            var that = this
            this.topOfferLists = cloneTable

            $(that.$refs.emailContentIframe).html('')
            that.showPreviewTopOffer = true;
            setTimeout(function(){
                var appendHtml = $(that.$refs.email).html()
                $(that.$refs.emailContentIframe).html(appendHtml)
                that.showLastSendEmail = false
            }, 100)

        },
        convertTableELmToHTml(topOfferLists){
            var html = ""
            var that = this
            _.each(topOfferLists, function(table, key) {
                var $table = $(table)
                if($table.find("tbody tr").length){
                    var id = $table.attr("id");
                    var colspan = id === "edit_potential_list" ? "5" : "7"
                    $table.find("input").each(function() {
                        var name = $(this).attr("name");
                        var val = $(this).val()
                        /*if(name = "geo"){
                            val = val.replace(/\s/gi,",")
                            val = val.split(",").length > 1 ? "Multi countries" : val;
                        }*/
                        $(this).replaceWith(val)
                    })

                    $table.find("tr").each(function(){
                        $(this).find("td:last,th:last").remove()
                    })


                    $table.find("thead").each(function(){
                        $(this).find(".head_tr").css("background","#C5D9F1");
                        $(this).find("th").attr("style","font-size:10.5pt;font-weight: bold;text-align: left;border: 1px solid windowtext;color: black;");
                        $(this).prepend("<tr ><td colspan='"+colspan+"' class='tableTitle' style='text-align: center;font-weight: bold;'> <p style='text-align: center;font-size: 11.0pt;color: black;'>"+ that.tableIdFullNameMapping(id)+"</p></td></tr>")
                    })

                    $table.find("td,th").each(function(){
                        $(this).css({"border":"1px solid windowtext",'color': 'black'})
                    })
                    $table.find("td").each(function(){
                        $(this).css({"font-size":"10.5pt", 'font-family': "'Calibri', sans-serif"})
                    })
                    $table.find("p").each(function(){
                        $(this).css({'font-family': "'Calibri', 'sans-serif'",'color': 'black'})
                    })
                    html += "<table style='background:#fff;font-size:10.5pt;border-collapse: collapse;' data_offer_ids='"+that.tableIdNameMapping(id) + ":" + that.convertIdsToParms($table)+"'>" + $table.html() + "</table><br>";
                }

            })
            return html
        },
        convertIdsToParms($table){
            var arr = []
            $table.find("td.offerId").each(function(){
                arr.push($(this).trimText());
            })
            return arr.join(",")
        },
        tableIdFullNameMapping(id){
            switch(id){
                case "edit_volume_list":
                    return "Top Offers by Volume"
                    break;
                case "edit_EPC_list":
                    return "Top Offers by EPC"
                    break;
                case "edit_potential_list":
                    return "New and Potential Offers"
                    break;
            }
        },
        tableIdNameMapping(id){
            switch(id){
                case "edit_volume_list":
                    return "volume"
                    break;
                case "edit_EPC_list":
                    return "epc"
                    break;
                case "edit_potential_list":
                    return "new_potential"
                    break;
            }
        },
        updateTopOfferList() {
            var disabled =  Validator.check($("table input"),"isNotEmpty") && Validator.check($("table tbody"),"isHtmlNotEmpty")? false : true;
            this.disabled_preview_btn = disabled
        },
        actionHandler(type) {
            this.type = type
        },
       /* sliceCountry(country){
            if(!_.isEmpty(country) && country.length>15){
                return country.slice(0,14)+'...';
            }else{
                if(country){
                    return country;
                }else{
                    return 'All country'
                }
            }
        },
        sliceCategory(category){
            var categoryList = !_.isEmpty(category) && category.split(',');
            if(categoryList.length>3){
                return categoryList.slice(0,3).join(',')+'...';
            }else{
                return category
            }
        },
        needSliceCategory(category){
              if(!_.isEmpty(category) && category.split(',').length>3){
                  return 'need'
              }else{
                  return 'no'
              }
        },*/
        addOffer(offer_id) {
            let that = this
            Vue.http.get('Offer2/getById?id=' + offer_id).then(response => {
                var data =  response && response.body && response.body.data
                if(data.status !== "active"){
                    that.showAlert("The Offer is not Active", "info")
                    return
                }

                var exist = _.findIndex(that[that.type + '_offers'], function(item) {
                    return item.id == offer_id
                });
                if (exist == '-1') {
                    data.category = _.pluckAttrById(that.sourceCategory,data.category_ids,'id',"name")
                    that[that.type + '_offers'].push(data)
                } else {
                    that.showAlert("You have added this offer", "info")
                    return
                }
                that[that.type].push(offer_id)
            }, response => {
                var msg = response && response.body && response.body.msg
                that.showAlert(msg === "param is fail." ? "The offer id is invalid" : msg)
            })
            that.offer = ''
        },
        sendTopOffers(type) {
            this.action = type
            this.showLastSendEmail = false
        },
        getTopOffers() {
            let that = this
            Vue.http.get('Offer2/getTopOffer').then(response => {
                var data =  response && response.body && response.body.data && response.body.data.time
                that.timeZone = data
            }, response => {

            })
        },
        showModal() {
            this.modalState = 'show'
            this.action = 'export'
            this.showPreviewTopOffer = false
            this.showLastSendEmail = false
        },
        hideModal:function() {
          this.modalState = "hide"
        },
        hideModalConfirmModal(){
          this.confirmModalState = 'hide'
        },
        checkAndAdd(val, text, type) {
            if (!_.isEmpty(val)) {
                var id = md5(text)
                var exist = _.findIndex(this['filters_' + type], function(item) {
                  return item.id == id
                });
                if (exist == '-1') {
                    if (type === 'geo') {
                        this.geo.push(val)
                    } else {
                        this[type].push(text)
                    }
                    this['filters_' + type].push({id:id, text:text, optionId:val})
                }
            }
        },
        categoryChosenCallback(val, text) {
            this.checkAndAdd(val, text, 'category')
        },
        geoChosenCallback(val, text) {
            this.checkAndAdd(val, text, 'geo')
        },
        filter_span_id(text) {
            return md5(text)
        },
        removeLabel(id, text, type, optionId) {
            var that = this
            that['filters_' + type] = _.filter(that['filters_' + type], function(item) {
                return item.id != id
            });
            if (type === "geo") {
                that[type] = _.filter(that[type], function(item) {
                    return item != optionId
                });
            } else {
                that[type] = _.filter(that[type], function(item) {
                    return item != text
                });
            }
        },
        hideAlertPop:function() {
          this.alertPop = "hide"
        },
        getTopOfferCategory() {
            let that = this
            Vue.http.get('Category/getCategoryIdAndName').then(response => {
                var data =  response && response.body && response.body.data && response.body.data.list
                that.sourceCategory = data
                // get body data
                ep.emit("category", data)
            }, response => {

            })
        },
        getTopOfferGeo() {
            let that = this
            Vue.http.get('Info/getCountryIdAndName').then(response => {
                var data =  response && response.body && response.body.data && response.body.data.list
                var source = data.map(function(c_obj) {
                    return {
                        id: c_obj.id,
                        text: c_obj.code +　' - ' + c_obj.name,
                        name: c_obj.code +　' - ' + c_obj.name,
                    };
                })


                that.sourceGeo = source
                // get body data
                ep.emit("geo", data)
            }, response => {
            })
        },
        getConversionFlow() {
            let that = this
            Vue.http.get('Info/getConversionFlow').then(response => {
                var data =  response.body && response.body.data
                that.sourceConversionFlow = data
                // get body data
                ep.emit("conversionFlow", data)
            }, response => {
            })
        },
        check() {
            var flag = false;
            var start = $("input[name='start']").val()
            var to = $("input[name='end']").val()
            var d1 = new Date(start.replace(/\-/g, "\/"));
            var d2 = new Date(to.replace(/\-/g, "\/"));
            var datadiff = d2 - d1;
            var time = 31*24*60*60*1000;
            if (datadiff > time) {
                this.showAlert("The time range can't be more 30 days!", 'info')
                return
            }
            return true;
        },
        submitForm(report_name) {
            let that = this
            var flag = that.check()
            that.report_name = report_name
            that.hideModal()
            if (flag) {
                that.loadingZone = true;
                this.$nextTick(function(){
                    var query = $(that.$refs.form_report).getFormQuery()
                    var new_param = {
                        "other_data[category]": that.category,
                        "filters[country]" : that.geo
                    }
                    var params = $.extend(query, new_param);
                    Vue.http.post('Report/jobOfflineReport', params).then(response => {
                        that.getList();
                        that.loadingZone = false;
                    }, response => {
                        this.showAlert(response.body && response.body.msg, 'error')
                        that.loadingZone = false;
                    })
                })

            }
        },
        onChangeLimit(limit){
            this.limit = limit;
            this.page = 1;
            this.$nextTick(function(){
                this.getList()
            })
        },
        onChangePage(page){
            this.page = page;
            this.$nextTick(function(){
                this.getList()
            })
        },
        getList(limit) {
            var that = this;
            var type = 'manage_top_offer';
            var limit = that.limit;
            var page = that.page;
            var query = {
                type: type,
                limit: limit,
                page: page
            }
            let is_refresh = false;
            that.dataPage = []
            Vue.http.get('Report/getJobOfflineReportList', {params:query}).then(response => {
                var _data =  response.body && response.body.data && response.body.data.data
                that.reportName = _data.shift();
                that.reportData = _data
                that.dataPage = response.body && response.body.data && response.body.data.page
                that.loadingZone = false;
                $.each(_data,function(i,v){
                    if(v[2] === "preparing" || v[2] === "queueing" || v[2] === "resolving") {
                        is_refresh = true;
                    }
                })
                if(is_refresh) {
                    clearTimeout(window.timeout_offline)
                    window.timeout_offline = setTimeout(function(){
                        that.getList()
                    },10000)
                }
            }, response => {
                that.loadingZone = false;
            })
            that.loadingZone = false;
        }
    },
    created () {
        let that = this;
        that.getTopOfferGeo();
        that.getTopOfferCategory();
        that.getConversionFlow();
        ep.all("category","geo", 'conversionFlow', function(category, geo, conversionFlow){
            that.renderOffer = true
        })
    },
    mounted () {
        this.getList()
        this.getTopOffers();
    }
}
</script>

<style scoped>
.frm-entity .controls {
    margin-left: 11%;
}
.form-horizontal .form-group.col-md-offset-2{
    margin-left: 16.66666667%;
}
.box-content h1 {
    text-align: center;
    font-size: 2em;
}
.box-content h2 {
    text-align: center;
    font-size: 14px;
    font-weight: normal;
}
td, th {
    border: 1px solid #ddd;
}
div.MsoNormal{
    word-break: break-all;display: block;
}
p.MsoNormal {
    margin: 0cm;
    margin-bottom: .0001pt;
    text-align: justify;
    text-justify: inter-ideograph;
    font-size: 10.5pt;
    font-family: "Calibri", sans-serif;
}
#tabAddContentView p.MsoNormal {
    margin: 0cm;
    margin-bottom: .0001pt;
    text-align: justify;
    text-justify: inter-ideograph;
    color: #666 !important;
    font-size: 12px !important;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif !important
}
@font-face {
    font-family: 宋体;
    panose-1: 2 1 6 0 3 1 1 1 1 1;
}

@font-face {
    font-family: "Cambria Math";
    panose-1: 2 4 5 3 5 4 6 3 2 4;
}

@font-face {
    font-family: Calibri;
    panose-1: 2 15 5 2 2 2 4 3 2 4;
}

@font-face {
    font-family: "\@宋体";
    panose-1: 2 1 6 0 3 1 1 1 1 1;
}


.previewView .content,
.previewView .sendTo,
.lastSendEmailView .content,
#emailContentIframe .lastSendEmailView .sendTo {
    background-color: #eee;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px 6px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #555;
    overflow: auto;
}
.previewView .sendTo.controls ,
#emailContentIframe .lastSendEmailView .sendTo.controls{
    height: 150px;
    margin-left: 20px;
    padding: 0;
}
#emailContentIframe .sendTo ul{
    margin-left: 6px
}
#emailContentIframe .sendTo ul li{
    display: table;
}
#emailContentIframe .frm-entity .control-label{
    width: 100px;
}
#emailContentIframe .frm-entity .controls{
    margin-left:120px;
}
.lastSendEmailView .sendTo {
    background-color: #eee;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px 6px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #555;
    /* overflow: auto; */
}
.nav-tabs>li>a{
    text-decoration: none;
    color: #565656;
}
.sendTo.controls{
    height: 150px;
    margin-left: 20px;
    padding: 0;
}
#emailContentIframe .sendTo ul{
    margin-left: 6px
}
#emailContentIframe .sendTo ul li{
    display: table;
}
#emailContentIframe .frm-entity .control-label{
    width: 100px;
}
#emailContentIframe .frm-entity .controls{
    margin-left:120px;
}
.lastSendEmailView .sendTo {
    background-color: #eee;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px 6px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #555;
    /* overflow: auto; */
}
.nav-tabs>li>a{
    text-decoration: none;
    color: #565656;
}
@media (max-width:767px) {
.form-actions .btn {
    width: 100%;
    margin-top: 10px
}
}

</style>