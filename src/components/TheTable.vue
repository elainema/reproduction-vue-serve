<template>
    <div style="overflow:scroll">
    <table class="table table-hover tablesorter tbl-fixed list-table" id="offers_list">
        <colgroup>
            <col width="15">
            <col width="40">
            <col width="50">
            <col width="110">
            <col width="55">
            <col width="70">
            <col width="60">
            <col width="60">
            <col width="60">
            <!-- <col width="100" /> -->
            <col width="56">
            <col width="56">
            <col width="50">
            <col width="60">
            <col width="160">
            <col width="40">
        </colgroup>
        <thead>
            <tr>
                <th>
                    <input type="checkbox" id="check_all">
                </th>
                <th class="sorting offerID" data-sort="offer_id">ID</th>
                <th>Logo</th>
                <th class="sorting" data-sort="name">Offer</th>
                <th>Status</th>
                <th>Advertiser</th>
                <th>Category</th>
                <th>Geo</th>
                <th>Platform</th>
                <!-- <th>Traffic</th> -->
                <th class="sorting" data-sort="payout">Payout</th>
                <th class="sorting" data-sort="revenue">Revenue</th>
                <th class="sorting" data-sort="create_time">Created</th>
                <th class="sorting" data-sort="expiration_date">Expiration</th>
                <th class="no-wrap">Caps</th>
                <th class="sorting" data-sort="risk_rate" data-sort-dir="desc">Risk</th>
            </tr>
        </thead>
        <tbody id="cp_list">
            <tr class="">
                <td>
                    <input type="checkbox" value="3343717" name="id[]" class="check-box">
                </td>
                <td class="">3343717</td>
                <td data-hided="true">
                    <div class="relative">
                        <div id="logo_3343717"></div>
                        <a href="ssssss" target="_blank"><img src="http://uploads.yeahmobi.com/offer_file/a0b64f5c45a2e396b46fb4b9fe5cb15e.png" class="thumbs" width="100" height="50" target="_blank"></a><a href="javascript:upload_logo(3343717)" id="upload_btn3343717" class="hide btn swfu-upload-btn"><span class="icon-expand-alt fa fa-upload"></span></a></div>
                </td>
                <td><a class="offer_wrap" href="p_manage_offer.html?id=3343717" target="_blank" title="eeeeeeeeee"><strong>eeeeeeeeee</strong></a></td>
                <td class="no-wrap capt pending">pending</td>
                <td><span class="offer_wrap  filter adv-filter" title="assssss">assssss</span></td>
                <td data-hided="false"><span class="label filter cat-filter label-inverse" title="App Download-Game">App Download-Game</span><span class="label filter cat-filter label-inverse" title="App Download-iOS">App Download-iOS</span></td>
                <td data-hided="false"><span class="label filter geo-filter">CN</span></td>
                <td data-hided="false"><span class="label filter dev-filter label-inverse" title="Android">Android</span><span class="label filter dev-filter label-inverse" title="Windows Server">Windows Server</span></td>
                <td class="no-wrap payout">$1.000</td>
                <td class="no-wrap revenue">€2.300</td>
                <td class="no-wrap">17-03-13</td>
                <td class="no-wrap">27-03-13</td>
                <td class="no-wrap">
                    <div></div>
                    <div></div>
                    <div class="light_red"></div>
                    <div class="light_red"></div>
                </td>
                <td class="no-wrap text-center no_risk"></td>
            </tr>
            <tr class="">
                <td>
                    <input type="checkbox" value="1025328" name="id[]" class="check-box">
                </td>
                <td class="">1025328</td>
                <td data-hided="true">
                    <div class="relative">
                        <div id="logo_1025328"></div>
                        <a href="ssssss" target="_blank"><img src="http://uploads.yeahmobi.com/offer_file/a0b64f5c45a2e396b46fb4b9fe5cb15e.png" class="thumbs" width="100" height="50" target="_blank"></a><a href="javascript:upload_logo(3343717)" id="upload_btn3343717" class="hide btn swfu-upload-btn"><span class="icon-expand-alt fa fa-upload"></span></a></div>
                </td>
                <td><a class="offer_wrap" href="p_manage_offer.html?id=1025328" target="_blank" title="Test Offer - Public016"><strong>Test Offer - Public016</strong></a></td>
                <td class="no-wrap capt active">active</td>
                <td><span class="offer_wrap  filter adv-filter" title="adv08">adv08</span></td>
                <td data-hided="false"><span></span></td>
                <td data-hided="false"><span>All</span></td>
                <td data-hided="false"><span>All</span></td>
                <td class="no-wrap payout">$1.000</td>
                <td class="no-wrap revenue">$2.000</td>
                <td class="no-wrap">15-12-14</td>
                <td class="no-wrap">16-12-14</td>
                <td class="no-wrap">
                    <div></div>
                    <div></div>
                    <div class="light_red"></div>
                    <div class="light_red"></div>
                </td>
                <td class="no-wrap text-center no_risk"></td>
            </tr>
            <tr class="dynamic">
                <td>
                    <input type="checkbox" value="112441" name="id[]" class="check-box">
                </td>
                <td class="">112441</td>
                <td data-hided="true">
                    <div class="relative">
                        <div id="logo_112441"></div>
                        <a href="ssssss" target="_blank"><img src="http://uploads.yeahmobi.com/offer_file/a0b64f5c45a2e396b46fb4b9fe5cb15e.png" class="thumbs" width="100" height="50" target="_blank"></a><a href="javascript:upload_logo(3343717)" id="upload_btn3343717" class="hide btn swfu-upload-btn"><span class="icon-expand-alt fa fa-upload"></span></a></div>
                </td>
                <td><a class="offer_wrap" href="p_manage_offer.html?id=112441" target="_blank" title="s"><strong>s</strong></a></td>
                <td class="no-wrap capt pending">pending</td>
                <td><span class="offer_wrap  filter adv-filter" title="adv03">adv03</span></td>
                <td data-hided="true">
                    <div class="positional">
                        <div class="hide bdr-text"><span class="label filter cat-filter label-inverse" title="Anti-Virus Subscription">Anti-Virus Subscription</span><span class="label filter cat-filter label-inverse" title="App Download-Android">App Download-Android</span><span class="label filter cat-filter label-inverse" title="CPS">CPS</span><span class="label filter cat-filter label-inverse" title="Dating">Dating</span><span class="label filter cat-filter label-inverse" title="Gambling">Gambling</span><span class="label filter cat-filter label-inverse" title="Incentive">Incentive</span></div>6 Categories</div>
                </td>
                <td data-hided="false"><span class="label filter geo-filter">AM</span><span class="label filter geo-filter">AF</span></td>
                <td data-hided="false"><span>All</span></td>
                <td class="no-wrap payout">Dynamic</td>
                <td class="no-wrap revenue">Dynamic</td>
                <td class="no-wrap">17-03-09</td>
                <td class="no-wrap">18-03-09</td>
                <td class="no-wrap">
                    <div>daily caps: 10</div>
                    <div></div>
                    <div class="light_red no-wrap" >daily remain caps: 10</div>
                    <div class="light_red"></div>
                </td>
                <td class="no-wrap text-center no_risk"></td>
            </tr>
            <tr class="">
                <td>
                    <input type="checkbox" value="112440" name="id[]" class="check-box">
                </td>
                <td class="">112440</td>
                <td data-hided="true">
                    <div class="relative">
                        <div id="logo_112440"></div>
                        <a href="ssssss" target="_blank"><img src="http://uploads.yeahmobi.com/offer_file/a0b64f5c45a2e396b46fb4b9fe5cb15e.png" class="thumbs" width="100" height="50" target="_blank"></a><a href="javascript:upload_logo(3343717)" id="upload_btn3343717" class="hide btn swfu-upload-btn"><span class="icon-expand-alt fa fa-upload"></span></a></div>
                </td>
                <td><a class="offer_wrap" href="p_manage_offer.html?id=112440" target="_blank" title="asdfasdfasdf"><strong>asdfasdfasdf</strong></a></td>
                <td class="no-wrap capt pending">pending</td>
                <td><span class="offer_wrap  filter adv-filter" title="adv04">adv04</span></td>
                <td data-hided="true">
                    <div class="positional">
                        <div class="hide bdr-text"><span class="label filter cat-filter label-inverse" title="Adult/Sexy">Adult/Sexy</span><span class="label filter cat-filter label-inverse" title="Anti-Virus Subscription">Anti-Virus Subscription</span><span class="label filter cat-filter label-inverse" title="App Download-Android">App Download-Android</span><span class="label filter cat-filter label-inverse" title="App Download-Game">App Download-Game</span><span class="label filter cat-filter label-inverse" title="CPS">CPS</span><span class="label filter cat-filter label-inverse" title="Email/Zip Submit">Email/Zip Submit</span><span class="label filter cat-filter label-inverse" title="Entertainment Subscription">Entertainment Subscription</span><span class="label filter cat-filter label-inverse" title="Gambling">Gambling</span><span class="label filter cat-filter label-inverse" title="Incentive">Incentive</span></div>9 Categories</div>
                </td>
                <td data-hided="false"><span class="label filter geo-filter">AM</span></td>
                <td data-hided="false"><span>All</span></td>
                <td class="no-wrap payout">$5.000</td>
                <td class="no-wrap revenue">$10.000</td>
                <td class="no-wrap">17-03-09</td>
                <td class="no-wrap">18-03-09</td>
                <td class="no-wrap">
                    <div>daily caps: 80</div>
                    <div></div>
                    <div class="light_red">daily remain caps: 80</div>
                    <div class="light_red"></div>
                </td>
                <td class="no-wrap text-center no_risk"></td>
            </tr>
        </tbody>
    </table>
    </div>


</template>