<template>
    <div>
        <div id="breadcrumb_container">
            <ul class="breadcrumb">
                <li><router-link to="./">Home</router-link></li>
                <li><router-link to="./p_offers">Offers</router-link></li>
                <li class="active">All Offers</li>
            </ul>
        </div>
        <div class="box">
            <div class="box-header" v-box-action-resize>
                <h2>All Offers</h2>
                <div class="box-action">
                    <span class="icon-chevron-up" title="Fold"></span>
                    <span class="icon-chevron-down hide" title="Unfold"></span>
                </div>
            </div>
            <div class="box-container">
                <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
                <div class="box-content">
                    <form ref="filterForm">
                        <offer-list-filter-form :currentPage="currentPage" :pageLimit="pageLimit" :list_offers="list_offers" :renderFilter="renderFilter" :advChosen="advChosen" :catChosen="catChosen" :geoChosen="geoChosen" :amChosen="amChosen" :platChosen="platChosen" :trafficChosen="trafficChosen" :renderCallback="renderCallback" :showModal="showModal" :showAlert="showAlert" :product_remove_offer="product_remove_offer" :sort_by_advertiser="sortFilter.advertiser" :sort_by_category="sortFilter.category" :sort_by_country="sortFilter.country" :sort_by_device="sortFilter.device" :sort_by_traffic="sortFilter.traffic"></offer-list-filter-form>
                    </form>

                    <div v-yeah-loading='loadingZone'>
                        <div class="row-fluid" id="action_float" v-if="userInfo.role_id != 14">
                            <div class="col-md-12">
                                <span>Action:</span>
                                <div class="btn-group">
                                    <a class="btn" id="status_action" href="#" @click.prevent="status_action">
                                        Change Status
                                    </a>
                                </div>
                                <div class="btn-group">
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                        Change Payout &amp; Revenue
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu" id="payout_revenue_action">
                                        <li><a class="pointer" data-value="payout"  @click.prevent="payout_revenue_action('Payout')">Payout</a></li>
                                        <li><a class="pointer" data-value="revenue" @click.prevent="payout_revenue_action('Revenue')">Revenue</a></li>
                                    </ul>
                                </div>
                                <div class="btn-group">
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                        Recommend Setting
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu" id="recommend">
                                        <li><a class="pointer" data-value="1"  @click.prevent="recommend_action(1)">Recommend</a></li>
                                        <li><a class="pointer" data-value="0" @click.prevent="recommend_action(0)">Not Recommend</a></li>
                                    </ul>
                                </div>
                                <div class="btn-group temp-func-btn">
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                        Batch Sync
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#" id="mul_upload_logo" @click.prevent="mul_upload_logo">Batch Upload Logo</a></li>
                                    </ul>
                                </div>
                                <div class="btn-group temp-func-btn">
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#" :disabled="disabledBatchAff">
                                        Batch Aff
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="javascript:;" id="" @click.prevent="batch_aff_access_action('approved')">Approve</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" id="" @click.prevent="batch_aff_access_action('blocked')">Block</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="btn-group temp-func-btn">
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                        Batch App
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="javascript:;" id="" @click.prevent="batch_publisher_app_action('approved')">Approve</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" id="" @click.prevent="batch_publisher_app_action('blocked')">Block</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="btn-group temp-func-btn">
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                        Batch Caps
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="javascript:;" id="" @click.prevent="batch_publisher_caps_action">Batch Affiliate Caps</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" id="" @click.prevent="batc_app_caps_action">Batch AppCaps</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="btn-group">
                                    <a class="btn" id="add_group" href="#" @click.prevent="add_group">
                                        Add To Group
                                    </a>
                                </div>
                            </div>
                        </div>

                        <pagination  :pageLimit="pageLimit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                        <div style="position: relative;">
                            <input type="button" style="position: absolute;top: -40px;" v-show="renderTable" class="btn btn-primary mb15 tableToExcel" @click="tableToExcel('offer_list', 'W3C Example Table')" value="Export to Excel">
                        </div>

                        <div class="overflow_scroll">
                            <table class="table table-hover tablesorter tbl-fixed list-table"  id="offer_list" >
                                <colgroup>
                                    <col width="15" />
                                    <col width="60" />
                                    <col width="50" />
                                    <col class="hide">
                                    <col width="180" />
                                    <col width="55" />
                                    <col width="55" />
                                    <col width="70" />
                                    <col width="35" />
                                    <col width="35" />
                                    <col width="35" />
                                    <col width="56" />
                                    <col width="56" />
                                    <col width="50" />
                                    <col width="60" />
                                    <col width="90" />
                                    <col width="40" />
                                    <col width="40" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" id="check_all" v-model="toggleAll" @click="selectchange"/>
                                        </th>
                                        <th :class="sorting('offer_id')" data-sort="offer_id" @click="sortOffer('offer_id')">ID</th>
                                        <th>Logo</th>
                                        <th class="hide">Preview Url</th>
                                        <th :class="sorting('name')" data-sort="name" @click="sortOffer('name')">Offer</th>
                                        <th >Am</th>
                                        <th>Status</th>
                                        <th>Advertiser</th>
                                        <th>Category</th>
                                        <th>Geo</th>
                                        <th>Platform</th>
                                        <th :class="sorting('payout')" data-sort="payout" @click="sortOffer('payout')">Payout</th>
                                        <th :class="sorting('revenue')" data-sort="revenue" @click="sortOffer('revenue')">Revenue</th>
                                        <th :class="sorting('create_time')" data-sort="create_time" @click="sortOffer('create_time')">Created</th>
                                        <th :class="sorting('expiration_date')" data-sort="expiration_date" @click="sortOffer('expiration_date')">Expiration</th>
                                        <th :class="sorting('caps')" data-sort="caps" @click="sortOffer('caps')">Caps</th>
                                        <th :class="sorting('risk_rate')" data-sort="risk_rate" data-sort-dir="desc" @click="sortOffer('risk_rate')">Risk</th>
                                        <th>Mana</th>
                                    </tr>
                                </thead>
                                <tbody id="cp_list" ref="cp_list">
                                    <tr v-if="offersData.length == 0 && renderTable"><td colspan="15"><strong>No Results Found.</strong></td></tr>
                                    <tr v-else :data-id="item.offer_id" :class="[dynamicAndCps(item), isActive(item)]" v-for="(item,index ) in offersData">
                                        <td v-if="userInfo.role_id != 14" :class="search_offer == item.offer_id ? ' highlight' : ''">
                                            <input type="checkbox" :value="item.offer_id" v-model="selected_id" name="id[]" class="check-box" @click="getOfferType($event,item)"/>
                                        </td>
                                        <td v-else :class="search_offer == item.offer_id ? ' highlight' : ''"></td>
                                        <td :class="search_offer == item.offer_id ? ' highlight' : ''">
                                            <a class="offer_wrap" :href="'p_manage_offer?id=' + item.offer_id" target="_blank">{{ item.offer_id }}</a>
                                        </td>
                                        <td data-hided="true" :class="search_offer == item.offer_id ? ' highlight' : ''">
                                            <div class="relative">
                                                <div :id="'logo_' + item.offer_id" :class="item.is_recommend == 1 ? 'recommend-logo' : ''"></div>
                                                <span v-if="userInfo.role_id == 14">
                                                    <img :src="(item.logo ? config.parseOfferLogo(item.logo) :  config.defaultBase64)" class="thumbs" width="100" height="50" target="_blank" />
                                                </span>
                                                <span v-else>
                                                    <a :href="item.preview_url" target="_blank">
                                                        <img :src="(item.logo ? config.parseOfferLogo(item.logo) : config.defaultBase64)" class="thumbs" width="100" height="50" target="_blank" />
                                                    </a>
                                                    <a :id="'upload_btn' + item.offer_id"  class="btn swfu-upload-btn" @click.prevent="upload_logo(item.offer_id)">
                                                        <span class="icon-expand-alt fa fa-upload"></span>
                                                    </a>
                                                </span>
                                            </div>
                                        </td>
                                        <td class="hide">{{item.preview_url}}</td>
                                        <td :class="search_offer == item.offer_id ? ' highlight' : ''">
                                            <a class="offer_wrap" :href="'p_manage_offer?id=' + item.offer_id" target="_blank"><strong>{{ item.offer }}</strong>
                                            </a>
                                        </td>
                                        <td>{{item.am_id}} {{item.am_name}}</td>

                                        <td :class="'no-wrap capt ' + item.status + (search_offer == item.offer_id ? ' highlight' : '')" v-if="item.alert_status">
                                            {{ item.status }}
                                            <i class="reserv-notice fa fa-clock-o" :title="item.alert_status_after + ' after ' + item.alert_status_time + ' GMT'"></i>
                                        </td>
                                        <td :class="'no-wrap capt ' + item.status+ (search_offer == item.offer_id ? ' highlight' : '')" v-else>{{ item.status }}</td>
                                        <td :class="search_offer == item.offer_id ? ' highlight' : ''"><span class="offer_wrap filter adv-filter" :title="item.advertiser" @click="sortBySpecific(item.advertiser_id, 'advertiser')">{{ item.advertiser }}</span></td>
                                        <td :class="search_offer == item.offer_id ? ' highlight' : ''" :data-hided="calcu_category_keys(item) && calcu_category_keys(item).flag == true ? 'true' : 'false'">
                                            <span v-if="calcu_category_keys(item) && !calcu_category_keys(item).flag" v-for="(val, key) in item.category">
                                                <span v-if="calcu_category_keys(item).category_keys_len == 1 && val == 'All'"></span>
                                                <span v-else class="label filter cat-filter label-inverse" :title="val" @click.prevent="sortBySpecific(val, 'category')">{{ val }}</span>
                                            </span>
                                            <div v-if="calcu_category_keys(item) && calcu_category_keys(item).flag">
                                                <div class="positional">
                                                    <div class="bdr-text">
                                                        <span v-if="calcu_category_keys(item).category_keys_len != 0 && val != 'All'" class="label filter cat-filter label-inverse" v-for="(val, key) in item.category" :title="val" @click.prevent="sortBySpecific(val, 'category')">{{ val }} </span>

                                                        <!-- <span v-for="(val, key) in item.category">
                                                            <span v-if="calcu_category_keys(item).category_keys_len == 1 && val == 'All'"></span>
                                                            <span v-else class="label filter cat-filter label-inverse" :title="val" @click.prevent="sortBySpecific(val, 'category')">{{ val }}</span>
                                                        </span> -->
                                                    </div>
                                                    {{ calcu_category_keys(item).category_keys_len }} Categories
                                                </div>
                                            </div>
                                        </td>
                                        <td :class="search_offer == item.offer_id ? ' highlight' : ''" :data-hided="calcu_countries_keys(item) && calcu_countries_keys(item).flag == true ? 'true' : 'false'">
                                            <span v-if="!calcu_countries_keys(item).flag" v-for="(val, key) in countriesOrCountry(item)">
                                                <span v-if="calcu_countries_keys(item).countries_keys_len == 1 && val == 'All'">All</span>
                                                <span v-else class="label filter geo-filter" @click="sortBySpecific(countriesOrCountry(item), 'country')">{{ val }}</span>
                                            </span>
                                            <div v-if="calcu_countries_keys(item).flag">
                                                <div class="positional">
                                                    <div class="bdr-text">
                                                    <!-- <span v-for="(val, key) in item.country">
                                                        <span v-if="calcu_countries_keys(item).countries_keys_len == 1 && val == 'All'"></span>
                                                        <span v-else class="label filter geo-filter" @click="sortBySpecific(item.country, 'country')">{{ val.split("_")[0] }}</span>
                                                    </span> -->
                                                        <span  v-if="calcu_countries_keys(item).countries_keys_len == 0" v-for="(val, key) in countriesOrCountry(item)">
                                                        </span>
                                                        <span v-else class="label filter geo-filter" @click.prevent="sortBySpecific(countriesOrCountry(item), 'country')">{{ val.split("_")[0] }} </span>
                                                    </div>
                                                    {{ calcu_countries_keys(item).countries_keys_len }} Countries
                                                </div>

                                            </div>
                                        </td>
                                        <td :class="search_offer == item.offer_id ? ' highlight' : ''" :data-hided="calcu_devices_keys(item).flag == true ? 'true' : 'false'">
                                           <span v-if="!calcu_devices_keys(item).flag" v-for="(val, key) in item.device">
                                               <span v-if="calcu_devices_keys(item).device_keys_len == 1 && val == 'All'">All</span>
                                               <span v-else class="label filter cat-filter label-inverse" :title="val" @click.prevent="sortBySpecific(val, 'device')">{{ val }}</span>
                                           </span>
                                           <div v-if="calcu_devices_keys(item).flag">
                                               <div class="positional">
                                                   <div class="bdr-text">
                                                       <span v-for="(val, key) in item.device">
                                                           <span v-if="calcu_devices_keys(item).device_keys_len === 0"></span>
                                                           <span v-else class="label filter traffic-filter label-inverse" :title="val" @click.prevent="sortBySpecific(val, 'device')">{{ val }} </span>
                                                       </span>
                                                   </div>
                                                   {{ calcu_devices_keys(item).device_keys_len }} Platform
                                               </div>
                                           </div>
                                        </td>
                                        <td :class="search_offer == item.offer_id ? ' highlight' : ''" v-if="calcu_payout_keys(item).dynamic" class="no-wrap payout">Dynamic</td>
                                        <td  :class="search_offer == item.offer_id ? ' highlight' : ''" v-else-if="calcu_payout_keys(item).cps_payout" class="no-wrap payout">{{ item.cps_payout_percentage }} %
                                        </td>
                                        <td v-else :class="'no-wrap payout' + (search_offer == item.offer_id ? ' highlight' : '')">${{ item.payout }}
                                           <span v-if="item.alert_payout"><i class="reserv-notice fa fa-clock-o" :title="'$' +  item.alert_payout_after + ' after ' + item.alert_payout_time + ' GMT'"></i></span>
                                           <span v-else></span>
                                        </td>
                                        <td :class="'no-wrap revenue ' + (search_offer == item.offer_id ? ' highlight' : '')" v-if="calcu_payout_keys(item).dynamic">Dynamic</td>
                                        <td  :class="search_offer == item.offer_id ? ' highlight' : ''" v-else-if="calcu_payout_keys(item).cps_payout" class="no-wrap revenue">{{ item.cps_revenue_percentag }} %
                                        </td>
                                        <td v-else :class="'no-wrap revenue' + (search_offer == item.offer_id ? ' highlight' : '')">{{calcu_currency(item)}} {{ item.revenue }}
                                           <span v-if="item.alert_revenue"><i class="reserv-notice fa fa-clock-o" :title="item.alert_revenue_after + ' after ' + item.alert_revenue_time + ' GMT'"></i></span>
                                           <span v-else></span>
                                        </td>
                                        <td :class="'no-wrap'+ (search_offer == item.offer_id ? ' highlight' : '')"> {{ calcu_date_time(item.create_time) }}</td>
                                        <td :class="'no-wrap'+ (search_offer == item.offer_id ? ' highlight' : '')"> {{ calcu_date_time(item.expiration_date) }}</td>
                                        <td :class="'no-wrap'+ (search_offer == item.offer_id ? ' highlight' : '')">
                                            <div> {{ item.is_caps == 0 || !item.daily_conversions || item.daily_conversions == 0 || typeof item.daily_remain_caps === "undefined"  ||  item.daily_remain_caps === "" ? "" : "daily caps: " + item.daily_conversions }} </div>
                                            <div>{{ item.is_caps == 0 || !item.monthly_conversions || item.monthly_conversions == 0 || typeof item.monthly_remain_caps === "undefined"  ||  item.monthly_remain_caps === "" ? "" : "monthly caps: " + item.monthly_conversions }}</div>
                                            <div class='light_red'>{{ item.is_caps == 0 || typeof item.daily_remain_caps  == "undefined"||  item.daily_remain_caps  === ""? "" : "daily remain caps: " + item.daily_remain_caps }}</div>
                                            <div class='light_red'>{{item.is_caps == 0 || typeof item.monthly_remain_caps == "undefined" ||  item.monthly_remain_caps === ""? "" : "monthly remain caps: " + item.monthly_remain_caps}}</div>
                                        </td>
                                        <td :class="'no-wrap text-center ' + risk_level(item.offer_url_risk_rate) + (search_offer == item.offer_id ? ' highlight' : '')">
                                            <span v-if="risk_level(item.offer_url_risk_rate) !== 'no_risk'">
                                                <span v-if="risk_level(item.offer_url_risk_rate) === 'medium_risk'">
                                                    <i data-toggle="tooltip" data-placement="top" :title="'Medium Malware Risk Level (' + parseFloat(item.offer_url_risk_rate) * 100 + '%'" class="icon-shield fa fa-exclamation-triangle fa-flip-horizontal color_normal_risk"></i>
                                                </span>
                                                <span v-else>
                                                    <i class="icon-shield fa fa-exclamation-triangle fa-flip-horizontal color_high_risk" data-toggle="tooltip" data-placement="top" :title="'High Malware Risk Level (' + parseFloat(item.offer_url_risk_rate) * 100 + '%'"></i>
                                                </span>
                                            </span>
                                            <span v-else></span>
                                        </td>
                                        <td style="text-indent:10px;">{{item.is_exclude_from_mana  ? 'Yes' :  'No' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table id="table2excel" class="hidden">
                                
                            </table>
                        </div>
                        <pagination :pageLimit="pageLimit"　:page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <div id="hidden_sort" :data-sort="key">
            <input type="hidden" name="sort" :value="key" />
            <input type="hidden" name="dir" :value="sort_dir" />
        </div>
        
        <!-- <changeOfferStatusModal :modalState="statusModalState" :hideModal="hideModal" :param_id="'ids'" :showAlert="showAlert" :onSuccess="onSetStatusSuccess" :selected_id="selected_id.join(',')"></changeOfferStatusModal> -->
        <change-offer-status-modal 
            :outerVisible.sync="statusModalState" 
            :showAlert="showAlert"
            :dialogName="'outerVisible'"  
            :onSuccess="onSetStatusSuccess"
            :selected_id="selected_id.join(',')"
            :param_id="'ids'">
        </change-offer-status-modal>

        <!-- <payoutRevenueReserveModal :modalState="payoutRevenueModalState" :hideModal="hideModal" :arrSetTask="arrSetTask" :title="title"></payoutRevenueReserveModal> -->
        <payout-revenue-reserve-modal 
            :outerVisible.sync="payoutRevenueModalState"
            :showAlert="showAlert"
            :arrSetTask="arrSetTask" 
            :title="title"
            :dialogName="'outerVisible'">
        </payout-revenue-reserve-modal>

        <!-- <offerRecommendModal :modalState="offerRecommendState" :hideModal="hideModal" :setBatchRecommendOffer="setBatchRecommendOffer"></offerRecommendModal> -->
        <offer-recommend-modal
            :modalState.sync="offerRecommendState"
            :setBatchRecommendOffer="setBatchRecommendOffer"
            :dialogName="'modalState'">
        </offer-recommend-modal>

        <!-- <batchAffAccessModal :modalState="batchAffAccessModalState" :hideModal="hideModal" :batchAffAccess="batchAffAccess" :batch_title="batch_title"></batchAffAccessModal> -->
        <batch-aff-access-modal
            :modalState.sync="batchAffAccessModalState"
            :batchAffAccess="batchAffAccess" 
            :batch_title="batch_title"
            :dialogName="'modalState'">
        </batch-aff-access-modal>

        <!-- <batchPublisherAccessModal :modalState="batchPublisherAppModalState" :hideModal="hideModal" :batchPublisherAccess="batchPublisherAccess" :batch_title="batch_title"></batchPublisherAccessModal> -->
        <batch-publisher-app-modal
            :modalState.sync="batchPublisherAppModalState"
            :batchPublisherAccess="batchPublisherAccess" 
            :batch_title="batch_title"
            :dialogName="'modalState'">
        </batch-publisher-app-modal>

        <!-- <updateOfferLogoModal :modalState="updateOfferLogoModalState" :hideModal="hideModal" :offer_id="offer_id" :showAlert="showAlert" :renderOffer="renderOffer" :accept="accept" :nonsupport="nonsupport"></updateOfferLogoModal> -->
        <update-offer-logo-modal
            :modalState.sync="updateOfferLogoModalState"
            :offer_id="offer_id" 
            :showAlert="showAlert" 
            :renderOffer="renderOffer" 
            :accept="accept" 
            :nonsupport="nonsupport"
            :dialogName="'modalState'">
        </update-offer-logo-modal>

        <!-- <add_product_offer_dailog :modalState="add_product_offer_dailog" :hideModal="hideModal" :onComfirm="confirmAdded"></add_product_offer_dailog> -->
        <add-product-offer-dailog
            :modalState.sync="add_product_offer_dailog"
            :list_offers="list_offers"
            :showAlert="showAlert"
            :dialogName="'modalState'">
        </add-product-offer-dailog>

        <!-- <BatchAffiliateCaps :modalState="batchAffiliateCapsModal" :hideModal="hideModal" :showAlert="showAlert" :renderOffer="renderOffer" :selected_id="selected_id"></BatchAffiliateCaps> -->
        <batch-affiliate-caps-modal
            :modalState.sync="batchAffiliateCapsModal"
            :showAlert="showAlert" 
            :renderOffer="renderOffer" 
            :selected_id="selected_id"
            :dialogName="'modalState'">
        </batch-affiliate-caps-modal>

        <BatchAppCaps :modalState="batchAppCapsModal" :hideModal="hideModal"  :showAlert="showAlert" :selected_id="selected_id" :renderOffer="renderOffer" :appAccessInfo="activeUsers"></BatchAppCaps>
        <!-- <batch-app-caps
            :modalState.sync="batchAppCapsModal"
            :showAlert="showAlert" 
            :selected_id="selected_id" 
            :renderOffer="renderOffer" 
            :appAccessInfo="activeUsers"
            :dialogName="'modalState'">
        </batch-app-caps> -->

        <!-- <addRotateGroupModal :modalState="offerAddRemoteGroup" :hideModal="hideModal" :param_id="'ids'" :showAlert="showAlert" :onSuccess="onSetStatusSuccess" :selected_id="selected_id.join(',')"></addRotateGroupModal> -->
        <add-rotate-group-modal
            :modalState.sync="offerAddRemoteGroup"
            :list_offers="list_offers"
            :param_id="'ids'"
            :onSuccess="onSetStatusSuccess"
            :showAlert="showAlert"
            :selected_id="selected_id.join(',')"
            :dialogName="'modalState'">
        </add-rotate-group-modal>
    </div>
</template>
<script>
import cors_config from '@/util/config'

import chosen from '@/components/Chosen.vue'
//import filter_form from '@/components/Offer_List_Filter_Form.vue'

const OfferListFilterForm = () => import(
/* webpackChunkName: "OfferListFilterForm" */ '../components/offer-list-filter-form/'
);

const AlertPop = () => import(
/* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/'
);

const ChangeOfferStatusModal = () => import(
/* webpackChunkName: "changeOfferStatusModal" */ '../components/change-offer-status-modal/'
);
/*const payoutRevenueReserveModal = () => import(
 webpackChunkName: "payoutRevenueReserveModal"  '@/components/PayoutRevenueReserveModal.vue'
);*/
const PayoutRevenueReserveModal = () => import(
/* webpackChunkName: "PayoutRevenueReserveModal" */ '../components/payout-revenue-reserve-modal/'
);
/*const offerRecommendModal = () => import(
 webpackChunkName: "offerRecommendModal"  '@/components/OfferRecommendModal.vue'
);*/
const OfferRecommendModal = () => import(
/* webpackChunkName: "OfferRecommendModal" */ '../components/offer-recommend-modal/'
);

/*const batchAffAccessModal = () => import(
 webpackChunkName: "batchAffAccessModal"  '@/components/BatchAffAccessModal.vue'
);*/
const BatchAffAccessModal = () => import(
/* webpackChunkName: "BatchAffAccessModal" */ '../components/batch-aff-access-modal/'
);

/*const batchPublisherAccessModal = () => import(
 webpackChunkName: "batchPublisherAccessModal"  '@/components/BatchPublisherAccessModal.vue'
);*/
const BatchPublisherAppModal = () => import(
/* webpackChunkName: "BatchPublisherAppModal" */ '../components/batch-publisher-app-modal/'
);

/*const updateOfferLogoModal = () => import(
 webpackChunkName: "updateOfferLogoModal"  '@/components/UpdateOfferLogoModal.vue'
);*/
const UpdateOfferLogoModal = () => import(
/* webpackChunkName: "UpdateOfferLogoModal" */  '../components/update-offer-logo-modal/'
);

/*const add_product_offer_dailog = () => import(
 webpackChunkName: "add_product_offer_dailog"  '@/components/Add_Product_Offer_Dailog.vue'
);*/
const AddProductOfferDailog = () => import(
/* webpackChunkName: "AddProductOfferDailog" */  '../components/add-product-offer-dailog/'
);


const pagination = () => import(
/* webpackChunkName: "pagination" */ '@/components/Pagination.vue'
);

const batchAffiliateModal = () => import(
/* webpackChunkName: "batchAffiliateModal" */ '../components/batch-affiliate-caps-modal/'
);
// const BatchAffiliateCaps = () => import(
//  webpackChunkName: "BatchAffiliateCaps"  '@/components/BatchAffiliateCaps.vue'
// );

const batchAppCaps = () => import(
/* webpackChunkName: "batchAppCaps"*/'../components/batch-app-caps/'
);
// const BatchAppCaps = () => import(
//  webpackChunkName: "BatchAppCaps"  '@/components/BatchAppCaps.vue'
// );

/*const addRotateGroupModal = () => import(
     webpackChunkName: "changeOfferStatusModal"  '@/components/AddRotateGroupModal.vue'
 );*/
const AddRotateGroupModal = () => import(
/* webpackChunkName: "AddRotateGroupModal" */ '../components/add-rotate-group-modal/'
);

import mixin_alert_msg from '@/mixins/alert_msg'

import commonDataAPI from '@/api/commonData'
var EventProxy = require('eventproxy');
let ep = new EventProxy()

import { mapGetters, mapActions } from 'vuex'
import VueScript2  from 'vue-script2'

export default {
    data () {
        return {
            loadingZone: false,
            offersData: [],
            currencies: { NULL: '$', USD: '$', EUR: '€', GBP: '£' },
            currentPage: 1,
            pageLimit: 20,
            dataPage:false,
            selected_id:[],
            statusModalState:false,
            payoutRevenueModalState:false,
            offerRecommendState:"hide",
            batchAffAccessModalState: 'hide',
            batchPublisherAppModalState: "hide",
            updateOfferLogoModalState: 'hide',
            add_product_offer_dailog:false,
            batchAffiliateCapsModal:'hide',
            batchAppCapsModal:'hide',
            offerAddRemoteGroup:'hide',
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            title: '',
            recommend_flag: 0,
            'data-sort-dir':'asc',
            key: 'offerID',
            sort_dir: '',
            offer_id: '',
            config:cors_config,
            search_offer:'',
            renderTable:false,
            renderFilter:false,
            advChosen:[],
            catChosen:[],
            geoChosen:[],
            platChosen:[],
            trafficChosen:[],
            amChosen:[],
            product_id:this.$route.query.product_id,
            renderOffer:false,
            accept:'image',
            nonsupport:'image/bmp',
            sortFilter:{
                advertiser:[],
                category:[],
                country:[],
                device:[],
                traffic:[],
            },
            status:'',
            batch_title:'',
            toggleAll :false,
            activeUsers:[],
            selected_types:[],
            disabledBatchAff:false,
            /*sortFilter:[],*/
        }
    },
    mixins: [mixin_alert_msg],    
    components: {
        OfferListFilterForm,
        pagination,
        AlertPop,
        ChangeOfferStatusModal,
        PayoutRevenueReserveModal,
        OfferRecommendModal,
        BatchAffAccessModal,
        BatchPublisherAppModal, 
        UpdateOfferLogoModal,
        AddProductOfferDailog,
        BatchAffiliateCaps,
        BatchAppCaps,
        AddRotateGroupModal
    },
    watch:{
        selected_id() {
            this.toggleAll = this.offersData.length > 0 && (this.selected_id.length == this.offersData.length)
        },
        '$route': {
            handler(to, from) {
                this.product_id = to.query.product_id
                this.init()
            },
            immediate: true
        },
    },
    computed: {
        ...mapGetters({
            appAccessInfo:"appAccessInfo",
            activeUser:'getActiveUserInfo',
        }),
        userInfo(){
          return this.$store.state.app.userInfo
        },
    },
    methods:{
        ...mapActions([
          'getActiveUser',
        ]),
        getOfferType($event,cur) {
            let cur_selected = `${cur.offer_id}-${cur.is_import_offer}` 
            let is_include_import = ''
            if ($event.target.checked) {
                this.selected_types = this.selected_types.concat(cur_selected)
                if (cur.is_import_offer) {
                    this.disabledBatchAff = true
                    return
                }
            } else {
                this.selected_types.splice(this.selected_types.findIndex(item => item === cur_selected), 1)
                is_include_import = this.selected_types.findIndex(item => item.indexOf("-1") >= 0)
            }
            if (this.selected_types.length == 0 || is_include_import < 0) {
                this.disabledBatchAff = false
            }
        },
        initActiveUser() {
            let activeUser = this.activeUser || []
            this.activeUsers = activeUser.map(function(c_obj) {
                var pm = c_obj.pm ? (' - ' + c_obj.pm) :'';
                var text =  c_obj.id + ' - ' + (c_obj.firstName || '') +  ' ' + (c_obj.lastName || '')  + pm;
                var name = (c_obj.firstName || '') +  ' ' + (c_obj.lastName|| '');
                return { id: c_obj.id, name: name, text:text};
            })
        },
        batch_publisher_caps_action() {
            let that = this
            var ids = this.selected_id;
            if (ids.length != 0) {
                this.renderOffer = true
                that.batchAffiliateCapsModal = 'show'
            } else {
                that.showAlert('Please select at least one offer')
            }
        },
        batc_app_caps_action() {
            let that = this
            var ids = this.selected_id;
            if (ids.length != 0) {
                this.renderOffer = true
                that.batchAppCapsModal = 'show'
            } else {
                that.showAlert('Please select at least one offer')
            }
        },
        tableToExcel(table, name){
            var deep = _.cloneDeep($("#offer_list").html());
            $("#table2excel").html(deep).find("input").parent().remove()
            $("#table2excel").table2excel({
                exclude: ".excludeThisClass",
                name: "Worksheet Name",
                filename: "offer-list.xls", //do not include extension
            });
        },
        product_remove_offer() {
            let that = this
            var ids = this.selected_id;
            var query = {
                offer_id:ids.join(","),
                offer_product_id:-1
            }
            if (ids.length != 0) {
                that.$http.post('Offer/updateParentProduct', query).then(response => {
                    $("#cp_list .check-box:checked").closest("tr").fadeOut()
                }, response => {
                    that.loadingZone = ""
                    // error callback
                    that.showAlert(response.body.msg)
                })
            } else {
                that.showAlert('Please select at least one offer')
            }
        },
        confirmAdded() {
            var offers = $(this.$refs.selecOffer).getFormQuery();
            var that = this
            var query = $.extend(offers, {offer_product_id: that.product_id});

            this.$http.post('Offer/updateParentProduct', query).then(response => {
                that.list_offers();
                that.add_product_offer_dailog = false
            }, response => {
                that.loadingZone = ""
                // error callback
                that.showAlert(response.body.msg)
            })
        },
        showModal() {
            this.add_product_offer_dailog = true
        },
        renderCallback(page_limit, current_page) {
            if (page_limit) {
                this.pageLimit = page_limit
            }
            if (current_page) {
                this.currentPage = current_page
            }
        },
        countriesOrCountry(item) {
            return item.country || item.countries
        },
        selectchange (e) {
            var selectall = e.target.checked
            this.toggleAll = selectall
            this.selected_id = []
            if (selectall) {
                let is_include_import = this.offersData.findIndex(item => item.is_import_offer == 1)
                for (var i = 0; i < this.offersData.length; i++) {
                    let cur_ = `${this.offersData[i].offer_id}-${this.offersData[i].is_import_offer}` 
                    this.selected_id.push(this.offersData[i].offer_id)
                    this.selected_types.push(cur_)
                }
                if (is_include_import >= 0) {
                    this.disabledBatchAff = true
                }
            } else {
                this.disabledBatchAff = false
                this.selected_types = []
            }
        },
        sortBySpecific(value, type) {
            this.sortFilter[type] = []
            this.currentPage = 1
            this.sortFilter[type].push(value)
            this.$nextTick(function() {
                this.list_offers('sortBySpecific')
            })
        },
        sorting(type){
            if (type == this.key) {
                return 'tl-left sorting ' + this.key
            } else {
                return 'sorting'
            }
        },
        sortOffer(type, dir) {
            var _this = $(this);
            var _key = type;
            var _sort = $('#hidden_sort'); //点击的排序字段
            var _sort_key = this.key;     //上次点击的排序字段

            var sort_dir = dir || "ASC"  //排序类型asc or desc

            if (_key != '') {
                if (_key != _sort_key) {
                    this.key = type
                    this.sort_dir = sort_dir
                } else {
                    var dir = this.sort_dir
                    if (dir == 'ASC') {
                        this.sort_dir = 'DESC';
                    } else {
                        this.sort_dir= 'ASC';
                    }
                }
                this.list_offers()
            }
        },
        mul_upload_logo(id, type) {
            var sync_api = 'Sync/syncLogos'
            var ids = this.selected_id;
            if (ids.length != 0) {
                this.upload_logo(ids.join(','));
                this.updateOfferLogoModalState = 'show'
            } else {
                this.showAlert( 'Please choose the offer to sync.', "info")
            }
        },
        upload_logo (id, type) {
            this.offer_id = id;
            this.updateOfferLogoModalState = 'show'
            this.renderOffer = true
        },
        setBatchRecommendOffer(params) {
            var params = params || {recommend_info: ''},
                id = this.selected_id,
                recommend_flag = this.recommend_flag,
                s = {offer_ids:id.join(','), recommend_flag:recommend_flag},
                query = $.extend(s, params);
            this.$http.post('Offer2/setBatchRecommendOffer', query)
                .then(response => {
                    this.loadingZone = ""
                    this.$nextTick(function(){
                        if(response.body.flag != "success"){
                            this.showAlert( response.body.msg)
                        } else {
                            this.offerRecommendState = "hide"
                            this.list_offers()
                        }
                        this.selected_id = [];
                    })
                }, response => {
                    this.loadingZone = ""
                    console.log("error")
                    this.offerRecommendState = "hide"
                    this.showAlert(response.body.msg)
                })
        },
        batchPublisherAccess(data){
            var query = {
                offer_ids:this.selected_id.join(','),
                app_ids:data.app_ids,
                status: this.status
            }
            this.$http.post('Offer2/BatchSaveAppAccess', query)
                .then(response => {
                    this.loadingZone = ""
                    this.$nextTick(function(){
                        if(response.body.flag != "success"){
                            this.showAlert(response.body.msg)
                        } else {
                            this.showAlert(response.body.msg, "success")
                            //this.list_offers()
                        }
                        this.selected_id = [];
                    })
                }, response => {
                    this.loadingZone = ""
                    console.log("error")
                    this.showAlert(response.body.msg)
                })
        },
        batchAffAccess(affs){
            var query = {
                offer_ids:this.selected_id.join(','),
                status: this.status
            }
            var param = $.extend(query, affs);
            this.$http.post('Offer2/batchSaveAffAccess', param)
                .then(response => {
                    this.loadingZone = ""
                    this.$nextTick(function(){
                        if(response.body.flag != "success"){
                            this.showAlert(response.body.msg)
                        } else {
                            this.showAlert(response.body.msg, "success")
                            this.batchAffAccessModalState = "hide"
                            //this.list_offers()
                        }
                        this.selected_id = [];
                    })
                }, response => {
                    this.loadingZone = ""
                    console.log("error")
                    this.batchAffAccessModalState = "hide"
                    this.showAlert(response.body.msg)
                })
        },
        arrSetTask(params, flag) {
            if (flag) {
                var params = params,
                    id = this.selected_id,
                    query = $.extend({ids:id.join(',')}, params)
                this.$http.post('Offer2/arrSetTask', query)
                    .then(response => {
                        this.loadingZone = ""
                        this.$nextTick(function(){
                            if(response.body.flag != "success"){
                                this.showAlert(response.body.msg)
                                return
                            } else {
                                if (response.body.data && response.body.data.not_execute_id && response.body.data.not_execute_id.length > 0) {
                                    var msgs = "The following offers' payout is more than revenue, adjustment failed:" + response.body.data.not_execute_id;
                                    this.showAlert(msgs)
                                } else {
                                    this.showAlert("Success", "success")
                                    this.list_offers()
                                    this.selected_id = [];
                                }
                                this.payoutRevenueModalState = false
                            }
                            $('#check_all').attr("checked", false);
                        })
                    }, response => {
                        this.loadingZone = ""
                        console.log("error")
                        this.payoutRevenueModalState = false
                        this.showAlert(response.body.msg)
                    })
            } else {
                return false
            }
        },
        onSetStatusSuccess(params) {
            this.$nextTick(function(){
                this.list_offers()
            })
        },
        hideModal () {
            this.statusModalState = false
            this.payoutRevenueModalState = false
            this.offerRecommendState = "hide"
            this.batchAffAccessModalState = 'hide'
            this.updateOfferLogoModalState = 'hide'
            this.add_product_offer_dailog = 'hide'
            this.batchPublisherAppModalState = "hide"
            this.batchAffiliateCapsModal = 'hide'
            this.batchAppCapsModal = 'hide'
            this.offerAddRemoteGroup = 'hide'
        },
        hideAlertPop() {
          this.alertPop = "hide"
        },
        //判断是否是动态revenue的offer，是否是cps类型的offer
        isDynamic (title) {
            var flag = false
            var checkId = this.selected_id;
            for (var i = 0, len = checkId.length; i <  len; i++) {
                var cls = $("#offer_list tbody tr td input[value='" + checkId[i] + "']").closest('tr').attr('class');
                if (cls.toLowerCase().indexOf("dynamic") >= 0) {
                    var msg = "Offers with dynamic revenue are not supported. Please verify your selection.";
                    this.showAlert( msg, "info")
                    flag = false;
                    return false;
                } else {
                    flag = true;
                }
                if (cls.toLowerCase().indexOf("cps") >= 0) {
                    var msg = "CPS Offers are not supported. Please verify your selection.";
                    this.showAlert(msg, "info")
                    flag = false;
                    return false;
                } else {
                    flag = true;
                }
            }
            if (flag) {
                this.payoutRevenueModalState = true
            }
        },
        batch_publisher_app_action(action) {
            var ids = this.selected_id;
            this.status = action
            if (ids.length != 0) {
                this.batchPublisherAppModalState = 'show';
                
            } else {
                this.showAlert("Please choose the offer.",  "info")
            }
            this.batch_title = action == "approved" ? "Approve" : "Block"
        },
        batch_aff_access_action(action) {
            var ids = this.selected_id;
            this.status = action
            if (ids.length != 0) {
                this.batchAffAccessModalState = 'show';
                $("#modal_batch_aff_access").find("[name='affiliates']").val("").change()
            } else {
                this.showAlert("Please choose the offer.",  "info")
            }
            this.batch_title = action == "approved" ? "Approve" : "Block"
        },
        recommend_action(recommend_flag) {
            var checkId = this.selected_id;
            if (checkId.length < 1) {
                this.showAlert("Please choose an offer to recommend", "info")
            } else  if (recommend_flag == 1) {
                this.offerRecommendState = 'show'
                this.recommend_flag = 1
            } else {
                this.recommend_flag = 0
                this.setBatchRecommendOffer()
            }
        },
        payout_revenue_action(title) {
            var checkId = this.selected_id;
            var flag = false;
            if (checkId.length < 1) {
                this.showAlert('Please choose an offer to change ' + title + '.', "info")
            } else {
                this.title = title
                this.isDynamic();
            }
        },
        status_action() {
            var checkId = this.selected_id;
            if (checkId.length < 1) {
                this.showAlert("Please choose an offer to change status.", "info")
                return;
            } else {
                this.statusModalState = true
            }
        },
        add_group() {
            var checkId = this.selected_id;
            if (checkId.length < 1) {
                this.showAlert("Please choose an offer to add group.", "info")
                return;
            } else {
                this.offerAddRemoteGroup = "show"
            }
        },
        curPage() {
          return this.$store.state.offer_all.page
        },
        pagLimit() {
          return this.$store.state.offer_all.limit
        },
        onChangePage(page){
            this.currentPage = page;

            this.$nextTick(function(){
                this.list_offers()
            })
        },
        onChangeLimit(limit){
            this.pageLimit = limit;
            this.currentPage = 1;
            this.$nextTick(function(){
                this.list_offers()
            })
        },
        parseFloat (number){
            return parseFloat(number)
        },
        risk_level(offer_url_risk_rate) {
            var level = ""
            if (parseFloat(offer_url_risk_rate) > 0.6 || parseFloat(offer_url_risk_rate) === 0.6) {
                level = "high_risk"
            } else if (parseFloat(offer_url_risk_rate) < 0.6 && parseFloat(offer_url_risk_rate) > 0) {
                level = "medium_risk"
            } else {
                level = "no_risk"
            }
            return level
        },
        calcu_date_time(time) {
            return moment(new Date(time)).format('YY-MM-DD')
        },
        calcu_currency(item) {
            var currency = item.currency || 'USD';
            if (!(currency in this.currencies)) currency = 'USD';
            return this.currencies[currency];
        },
        calcu_category_keys(item) {
            var flag = false
            var category_keys = _.isObject(item.category) ? _.keys(item.category) : []
            var category_keys_len = category_keys.length
            var max_len = 0;
            if (_.isObject(item.category)) {
                if (category_keys_len > max_len) {
                    flag = true
                }
            }
            return ({
                category_keys_len:category_keys_len,
                flag:flag
            })
        },
        calcu_countries_keys(item) {
            var flag = false
            var countries_keys = _.isObject(item.countries || item.country) ? _.keys(item.countries || item.country) : []
            var countries_keys_len = countries_keys.length
            var max_len = 0;
            if (_.isObject(item.countries) || _.isObject(item.country)) {
                if (countries_keys_len > max_len && item.countries[0].toLowerCase() !== "all") {
                    flag = true
                }
            }
            return ({
                countries_keys_len,
                flag
            })
        },
        calcu_devices_keys(item) {
            var flag = false
            var device_keys = _.isObject(item.device) ? _.keys(item.device) : []
            var device_keys_len = device_keys.length
            var max_len = 0;
            if (_.isObject(item.device)) {
                if (device_keys_len > max_len && item.device[0].toLowerCase() !== "all") {
                    flag = true
                }
            }
            return ({
                device_keys_len,
                flag
            })
        },
        calcu_payout_keys(item) {
            if (item.is_dynamic_revenue == 1) {
                return ({
                    dynamic:true,
                    cps_payout:false,
                    stat:false
                })
            } else if (item.offer_type == "cps") {
                return ({
                    dynamic:false,
                    cps_payout:true,
                    stat:false
                })
            } else {
                return ({
                    dynamic:false,
                    cps_payout:false,
                    stat:true
                })
            }
        },
        dynamicAndCps(item) {
            let dynamic = "";
            if (item.is_dynamic_revenue == 1) {
                dynamic = "dynamic"
            }
            if (item.offer_type === "cps") {
                dynamic = "cps"
            }
            if (item.offer_type === "cps" && item.is_dynamic_revenue == 1) {
                dynamic = "cps dynamic"
            }
            return dynamic
        },
        isActive(item) {
            if (this.selected_id.indexOf(item.offer_id) > 0 || this.toggleAll) {
                return ' active';
            } else {
                return ''
            }
        },
        alert_status(item) {
        },
        getFormQuery() {
            var queryData = $(this.$refs.filterForm).serialize() + "&limit=" + this.pageLimit + "&page=" + this.currentPage
            if (this.key != "offerID") {
                queryData += '&sort='+ this.key + '&dir=' + this.sort_dir
            }
            return queryData;
        },
        /*form_submit (params) {
            this.list_offers()
        },*/
        list_offers(type, id) {
            let that = this
            that.loadingZone = true
            this.selected_id = []
            this.selected_types = []
            this.disabledBatchAff = false

            var params = that.getFormQuery()
            
            /*if (type != 'init' && type !== 'search_offer') {
                 window.location.hash = params
                 console.log(params)
            }*/
            
            if (type == 'search_offer') {
                that.search_offer = ""
                var id = $.trim($('.offer_id').val())
                var targetObj = _.find(that.offersData,{offer_id: parseInt(id)})
                if($('[data-id="'+id+'"]').length || targetObj) {
                    that.loadingZone = ""
                    var targetIndex = _.indexOf(that.offersData, targetObj)
                    that.offersData.splice(targetIndex,1)
                    that.offersData.unshift(targetObj)
                    that.$nextTick(function(){
                        setTimeout(function(){ 
                            that.search_offer = targetObj.offer_id
                        },500)
                    })
                    $.scrollToDom($("#cp_list"))
                    return
                }
                params = 'q=' +　'id:' + id
                that.$nextTick(function() {
                    that.$http.get('Offer2/getCurrentUnionAllList?' + params)
                    .then(response => {
                        that.loadingZone = ""
                        that.renderTable = true;
                        if(response.body.data &&　response.body.data.list.length == 0){
                            that.showAlert("The offer doesn't existed!.", "info")
                            that.loadingZone = ""
                            return;
                        }
                        that.offersData.unshift(response.body.data.list.length && response.body.data.list[0])
                        that.search_offer = response.body.data.list[0].offer_id
                        $.scrollToDom($("#cp_list"))
                    }, response => {
                        that.loadingZone = ""
                        that.renderTable = true;
                        that.showAlert(response.body.msg)
                    })
                })
            } else {
                that.$nextTick(function() {
                    that.$http.get('Offer2/getCurrentUnionAllList?' + params)
                    .then(response => {
                        that.renderTable = true;
                        that.loadingZone = ""

                        that.offersData = response.body && response.body.data && response.body.data.list
                        that.dataPage = response.body && response.body.data && response.body.data.paginator

                        if(response.body.data &&　response.body.data.list.length == 0){
                            return;
                        }
                        if ($.isMobile()) {
                            $.scrollToDom($("#cp_list"), -250)
                        }

                    }, response => {
                        that.loadingZone = ""
                        that.renderTable = true;
                        that.showAlert(response.body.msg)
                    })
                })
            }

        },
        action_float () {
            var tFlag = true,
                scroll_top;
            $(window).scroll(function() {
                let f_div = $('#action_float')
                if (tFlag == true) {
                    f_div.attr('m_top', f_div.offset().top);
                    tFlag = false;
                }
                scroll_top = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
                if (scroll_top > parseInt(f_div.attr('m_top'))) {
                    if (f_div.css('position') != 'fixed') {
                        f_div.css({ 'position': 'fixed' });
                        f_div.addClass('fl_top');
                    }

                } else if (f_div.css('position') != 'static') {
                    f_div.removeClass('fl_top');
                    f_div.css({ 'position': 'static' });
                }
            });
        },
        init (){
            if (this.userInfo.role_id != 14) {
                this.action_float()
            }
        }
    },
    created () {
        let that = this

        ep.all('categories', 'geos', 'platforms', 'traffics', 'advertisers', 'ams',  function(categories, geos, platforms, traffics,advertisers, ams) {
            that.renderFilter = true
        });

        commonDataAPI.getCategories(function(data) {
            that.catChosen = data;
            ep.emit("categories", data)
        })
        commonDataAPI.getGeos(function(data) {
            that.geoChosen = data;
            ep.emit("geos", data)
        })
        commonDataAPI.getPlatforms(function(data) {
            that.platChosen = data;
            ep.emit("platforms", data)
        })
        commonDataAPI.getTraffics(function(data) {
            that.trafficChosen = data;
            ep.emit("traffics", data)
        })
        commonDataAPI.getAdvertisers(function(data) {
            that.advChosen = data;
            ep.emit("advertisers", data)
        })
        commonDataAPI.getAMs(function(data) {
            that.amChosen = data;
            ep.emit("ams", data)
        })
        that.getActiveUser({ cb: function(data){
            that.initActiveUser()
        }})
        that.loadingZone = true
    },
    mounted () {
        this.init()
        this.product_id = this.$route.query.product_id
        VueScript2.load('../../js/jquery.table2excel.min.js')
    }
}
</script>


<style scoped>

.btn:focus{
    color: #000
}


.input_date {
    width: 25%;
}

.text-center {
    text-align: center;
}

.hide {
    display: none;
}

.text_area {
    width: 500px;
    height: 200px;
}

.pointer {
    cursor: pointer;
}
.light_red {
    color: #8b1f1f;
}
.table th {
    padding: 4px;
    height: 36px;
    line-height: 36px;
    text-align: left;
    text-overflow: ellipsis;
}

.table td {
    padding: 4px;
}

.relative {
    position: relative;
}
.offer_wrap {
    word-break: break-word;
}

.tl-left {
    text-align: left;
}

.icon-shield {
    font-size: 16px;
    vertical-align: middle;
}

.color_high_risk {
    color: #FF0F00;
}

.high_risk .tooltip.top .tooltip-arrow {
    border-top-color: #FF0F00;
}

.high_risk .tooltip-inner {
    background-color: #FF0F00;
}

.color_normal_risk {
    color: #FFA800;
}

.medium_risk .tooltip.top .tooltip-arrow {
    border-top-color: #FFA800;
}

.medium_risk .tooltip-inner {
    background-color: #FFA800;
}
[data-type="text"] {
    cursor: pointer;
}


.label.filter {
    white-space: normal;
}
.modal-large .modal-body {
    min-height: 250px;
    padding-left: 50px;
    padding-top: 50px;
}

.tbl-fixed .row-name {
    width: 30%
}

.swfu-upload-btn {
    background: #9e9797;
    color: #000;
}
.fl_top{
    width:100%;
}
</style>
