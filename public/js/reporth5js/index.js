var TOUCH = "stop",
    TOUCH_X = 0,
    TOUCH_Y = 0,
    OFFSET_X = 0,
    OFFSET_Y = 0,
    console = console || {
        log: function() {}
    };
colorList = [
    '#827bff', '#a5a2f1', '#ba75fe', '#cc4a76', '#fdb15b',
    '#4dd8ff', '#80baff', '#98cd98','#e597b2'
];
//PC端点击和手机触屏之间的转换
/*var touchEvents = {
    touchstart:"touchstart",
    touchmove:"touchmove",
    touchend:"touchend",
    initTouchEvents:function () {
        var self = this;
        if (self.isPC()) {
            self.touchstart = "mousedown";
            self.touchmove = "mousemove";
            self.touchend = "mouseup";
        }
    },
    isPC:function(){  //判断pc端与移动端

        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  //判断用户代理头信息
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) != -1) { flag = false; break; }
        }
        return flag;   //true为pc端，false为非pc端

    }
};*/
if ("ontouchstart" in document) var touchstart = "touchstart",
	touchend = "touchend",
	touchmove = "touchmove";
else var touchstart = "mousedown",
	touchend = "mouseup",
	touchmove = "mousemove";
document.body.addEventListener(touchstart, function(e) {
	TOUCH = "start";
	if ("touchstart" == touchstart) {
		var t = e.changedTouches || e.targetTouches,
			n = t[0];
		TOUCH_X = n.pageX, TOUCH_Y = n.pageY
	} else TOUCH_X = e.clientX, TOUCH_Y = e.clientY
}, !1), document.body.addEventListener(touchmove, function(e) {
	if ("start" != TOUCH && "move" != TOUCH) return;
	var t = 0,
		n = 0;
	if ("touchstart" == touchstart) {
		var r = e.changedTouches || e.targetTouches,
			i = r[0];
		t = Math.abs(i.pageX - TOUCH_X), n = Math.abs(i.pageY - TOUCH_Y)
	} else t = Math.abs(e.clientX - TOUCH_X), n = Math.abs(e.clientY - TOUCH_Y);
	if (t > 5 || n > 5) TOUCH = "move";
	OFFSET_X = t, OFFSET_Y = n
}, !1), document.body.addEventListener(touchend, function(e) {
	TOUCH = "stop"
}, !1), document.body.addEventListener("touchcancel", function(e) {
	TOUCH = "stop"
}, !1);
var get_transform_value = function(e, t) {
        t = t.replace(/\-/g, "\\-");
        var n = [0];
        if (arguments.length > 2) for (var r = 2; r < arguments.length; ++r) n[r - 2] = arguments[r];
        if ("none" == e || "" == e) return null;
        var i = new RegExp(t + "\\(([^\\)]+)\\)", "ig"),
            s = e.match(i),
            o = [],
            u = [];
        if (s && s.length > 0) {
            s = s[0], o = s.replace(i, "$1").split(",");
            for (var r = 0; r < n.length; ++r) u.push(o[n[r]])
        }
        return u.length == 1 && (u = u[0]), u
    },
    //transition 兼容性处理
    transform_css = function() {
        var e = document.createElement("div");
        return e.style.cssText = "-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;", e.style.webkitTransition ?
            function(e) {
                return {
                    "-webkit-transform": e
                }
            } : e.style.mozTransition ?
                function(e) {
                    return {
                        "-moz-transform": e
                    }
                } : e.style.oTransition ?
                    function(e) {
                        return {
                            "-o-transform": e
                        }
                    } : e.style.msTransition ?
                        function(e) {
                            return {
                                "-ms-transform": e
                            }
                        } : function(e) {
                            return {
                                transform: e
                            }
                        }
    }(),
    INIT = function () {
        var getRequest = function () {
            var url = location.search; //获取url中含"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        };

        var api = 'http://172.30.51.235:7314/newymapi';  //7351
        var para = getRequest();
        if (para['adv_name'] == null){
            $.get(api+'/Bi/getBiReportDetailsForH5',para,function (response) {
                var result = response && response.data && response.data.data || {};
                sessionStorage.setItem("report_list",JSON.stringify(result));

                for (let k in result){
                    if (result[k].data == ''){
                        $('#'+k).addClass('hiddenTab');
                        $(".hiddenTab ").remove();
                    }
                }
                //如果国家数据不为空，则加载世界国家名称数组
                /*if (result.country.data != ''){
                    var newscript = document.createElement('script');
                    newscript.setAttribute('type','text/javascript');
                    newscript.setAttribute('src','js/global.js');
                    var head = document.getElementsByTagName('head')[0];
                    head.appendChild(newscript);
                }*/
                INDEX();
            })
        }
        else {
            $.ajax({
                url: api+'/Bi/getBiReportDetails',
                data: {id:para['id']},
                success: function (response) {

                    var result = response.data.data;
                    sessionStorage.setItem("report_list",JSON.stringify(result));
                    for (let k in result){
                        if (result[k].data == ''){
                            $('#'+k).addClass('hiddenTab');
                            $(".hiddenTab ").remove();
                        }
                    }
                    INDEX();
                },
                xhrFields: {
                    withCredentials: true
                }
            });
            /*$.get(api+'/Bi/getBiReportDetails',{id:para['id']},function (response) {
                var result = response.data.data;
                sessionStorage.setItem("report_list",JSON.stringify(result));

                for (let k in result){
                    if (result[k].data == ''){
                        $('#'+k).addClass('hiddenTab');
                        $(".hiddenTab ").remove();
                    }
                }
                //如果国家数据不为空，则加载世界国家名称数组
                /!*if (result.country.data != ''){
                    var newscript = document.createElement('script');
                    newscript.setAttribute('type','text/javascript');
                    newscript.setAttribute('src','js/global.js');
                    var head = document.getElementsByTagName('head')[0];
                    head.appendChild(newscript);
                }*!/
                INDEX();
            })*/
        }

    }(),
    INDEX = function() {
        //$(".hiddenTab ").remove();
        var e = $(".wrapper"),
            t = 0,
            n = 0,
            r = 0,
            i = document.documentElement.clientHeight,
            s = document.documentElement.clientWidth,
            //display = e.children(".hiddenTab").length,
            o = e.children("section").length - 1,
            u = i * o,
            a = 0,
            f = e.children("section");
        /*e.css({
            height: 11 * i + "px"
        }),*/ f.css({
            height: i + "px"
        }), window.onresize = function() {
            /*var t = i,
                n = s;
            i = document.documentElement.clientHeight, s = document.documentElement.clientWidth, u = i * o, r = -1 * a * i, c && (i < s ? l.show() : l.hide()),
            i != t && (e.css({
                height: 11 * i + "px"
            }), f.css({
                height: i + "px"
            }))*/
        };
        var l = function() {
                var e = document.getElementById("lock") || '';
                return {
                    show: function() {
                        window.scroll(0, 0);
                        if(e)  e.style.display = "block"
                    },
                    hide: function() {
                        window.scroll(0, 0);
                        if(e)  e.style.display = "none"
                    }
                }
            }(),
            c = !("onorientationchange" in window);
        c || (window.addEventListener("orientationchange", function() {
            window.orientation != 0 ? l.show() : l.hide()
        }, !1), window.orientation != 0 && l.show());

        var h = function() {
                var s = 0;
                e.on(touchstart, function(e) {
                    var n = $(this).css("-webkit-transform") || $(this).css("-moz-transform") || $(this).css("-o-transform") || $(this).css("-ms-transform") || $(this).css("transform");
                    r = parseInt(get_transform_value(n, "translate3d", 1)) || 0;
                    if ("touchstart" == touchstart) {
                        var i = e.targetTouches || e.changedTouches;
                        if ( !! i) {
                            var s = i[0];
                            t = s.pageY
                        }
                    } else t = e.clientY;
                    e.preventDefault()
                }).on(touchmove, function(i) {
                    if ("start" != TOUCH && "move" != TOUCH) return;
                    i.preventDefault();
                    if ("touchstart" == touchstart) {
                        var s = i.targetTouches || i.changedTouches;
                        if ( !! s) {
                            var o = s[0];
                            n = o.pageY - t, e.css(transform_css("translate3d(0," + (r + n) + "px,0)"))
                        }
                    } else n = i.clientY - t, e.css(transform_css("translate3d(0," + (r + n) + "px,0)"))
                }).on(touchend, function(t) {
                    var n = $(this).css("-webkit-transform") || $(this).css("-moz-transform") || $(this).css("-o-transform") || $(this).css("-ms-transform") || $(this).css("transform"),
                        s = parseInt(get_transform_value(n, "translate3d", 1)) || r,
                        o = s - r,
                        f = a;
                    if ("start" == TOUCH && o != 0) return;
                    if (Math.abs(o) > 80) {
                        o > 0 && r < 0 ? f = a - 1 : o < 0 && Math.abs(r - i) < u && (f = a + 1), p(a, f);
                        return
                    }
                    if (0 == o) return;
                    e.addClass("restore").css(transform_css("translate3d(0,-" + a * i + "px,0)")), setTimeout(function() {
                        e.removeClass("restore")
                    }, 200)
                })
            },
            //平滑翻页效果
            p = function(t, n, r) {
                var s = r ? "without_keep" : "keep",
                    o = r ? 0 : 600;
                e.addClass(s).css(transform_css("translate3d(0,-" + n * i + "px,0)")), setTimeout(function() {
                    t != n && (d[n] && typeof d[n].init == "function" && d[n].init(), d[t] && typeof d[t].uninit == "function" && d[t].uninit()), e.removeClass(s)
                }, o), e.attr("pos", n), a = n
            },
            //显隐h_wrp
            d = [];
        d[0] = function() {
            var t = e.children(".sec1"),
                r = t.find('[removeStyle="Y"]');
            r.each(function() {
                this.setAttribute("cssText", this.style.cssText)
            }), h_wrp = t.children(".h_wrp");
            var s = function() {
                    r.each(function() {
                        var e = parseInt(this.getAttribute("delay")) || 0,
                            t = this;
                        e > 0 ? setTimeout(function() {
                            t.style.cssText = ""
                        }, e) : t.style.cssText = ""
                    })
                },
                o = function() {
                    h_wrp.show(), setTimeout(s, 100)
                },
                u = function() {
                    r.each(function() {
                        this.style.cssText = this.getAttribute("cssText")
                    })
                },
                a = function() {
                    h_wrp.hide(), setTimeout(u, 100)
                };
            return {
                init: o,
                uninit: a
            }
        }();
        var v = function(t, n, r) {
            t = t || "1", r = r || "Y";
            var i = n || e.children(".sec" + t),
                s = i.find('[removeStyle="' + r + '"]'),
                o = i.find('[pop="' + r + '"]'),
                u = i.find("[addClass]"),
                a = i.children(".h_wrp"),
                f = i.find('[horizontal="drag"]').get(0);
            s.each(function() {
                this.setAttribute("cssText", this.style.cssText)
            }), o.each(function() {
                this.setAttribute("cssText", this.style.cssText)
            });

            var l = function(e) {
                    e = e || 0, o.length > e && (o.get(e).style.cssText = "", setTimeout(function() {
                        l(++e)
                    }, 100))
                },
                c = function() {
                    o.each(function() {
                        this.style.cssText = this.getAttribute("cssText")
                    })
                },
                h = function() {
                    s.each(function() {
                        var e = parseInt(this.getAttribute("delay")) || 0,
                            t = this;
                        e > 0 ? setTimeout(function() {
                            t.style.cssText = ""
                        }, e) : t.style.cssText = ""
                    }), l(), u.each(function() {
                        var e = parseInt(this.getAttribute("delay")) || 0,
                            t = this;
                        e > 0 ? setTimeout(function() {
                            $(t).addClass(t.getAttribute("addClass"))
                        }, e) : $(t).addClass(t.getAttribute("addClass"))
                    })
                },
                p = function() {
                    a.show(), f && w(f, 0), setTimeout(h, 100)
                },
                d = function() {
                    s.each(function() {
                        this.style.cssText = this.getAttribute("cssText")
                    }), c(), u.each(function() {
                        $(this).removeClass(this.getAttribute("addClass"))
                    })
                },
                v = function() {
                    a.hide(), setTimeout(d, 100)
                };
            return {
                init: p,
                uninit: p //que1
            }
        };
        d[1] = v("2"), d[2] = v("3"), d[3] = v("4"), d[4] = v("5"), d[5] = v("6"), d[6] = v("7");
       // d[1] = v("1"), d[2] = v("2"), d[3] = v("3"), d[4] = v("4"), d[5] = v("5"), d[6] = v("5-app"), d[7] = v("5-oper"), d[8] = v("6"), d[9] = v("7"), d[10] = v("8");
        $("#home").on(touchend, function(e) {
            if ("start" != TOUCH) return;
            p(6, 0, "no_transition")
        }), $("#start").on(touchend, function(e) {
            if ("start" != TOUCH) return;
            p(0, 1)
        });
        try {
            var E = new Parallax(e.find(".sec1").get(0))
        } catch (S) {}
        var x = $("#loading"),
            T = $("#loading_text"),
            N = function() {
                var e = ["/asset/image/reporth5/logo.png", "/asset/image/reporth5/background.png", "/asset/image/reporth5/background2.png", "/asset/image/reporth5/facebook.png", "/asset/image/reporth5/in.png", "/asset/image/reporth5/twitter.png", "/asset/image/reporth5/arrow.png"],
                    t = e.length,
                    n = 0,
                    r = function(e) {
                        var r = new Image;
                        r.onload = function() {
                            ++n, T.text(parseInt(n / t * 100) + "%")
                        }, r.src = e
                    };
                for (var i = 0; i < t; ++i) r(e[i]);
                var s = 60,
                    o = function() {
                        0 >= s ? n / t > .5 ? u() : alert("加载图片失败，请返回刷新尝试!") : (s -= .5, n == t ? u() : setTimeout(o, 500))
                    },
                    u = function() {};
                return function(e) {
                    typeof e == "function" && (u = e), o()
                }
            }();
        N(function() {
            x.hide(),e.show(),e.show(), e.show().find(".sec0 > .logo").addClass("breathe"), setTimeout(function() {

                e.find(".sec0").css({
                    display: "none"
                })
            }, 800),setTimeout(function() {
                e.find(".sec0").css({
                    display: "none"
                })
            }, 2e3), setTimeout(function() {
                d[0].init(), h()
            }, 2500)
        })
    };
//填充数据
(function () {
    var getRequest = function () {
        var url = location.search; //获取url中含"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    var reportData = JSON.parse(sessionStorage.getItem("report_list") || "{}");
//sec1
    var array = getRequest();
    var array2 = array && array['cycle_identifier'] && array['cycle_identifier'].split('-');
    var time = '';
    if (array2){
        switch (array2[1]){
            case 'month': time = array2[0]+'/'+ array2[2]; break;
            case 'week': time = array2[0]+ ' ' + array2[2]+'th week'; break;
            case 'year': time = array2[0]; break;
            case 'quarter': time = array2[2]+'th quarter '+array2[0]; break;
            default :;
        }
    }

    $('.sec1 p').html(time);
    if (!$.isEmptyObject(reportData)){
        var advName = reportData['adv_name'] == '' ? array['adv_name'] : reportData['adv_name'];
        $('.advName').html(advName);
//sec2
        var totalData = JSON.parse(reportData.total.data);
        $('.p_num').html(totalData.total_products);
        $('.total_cost').html(totalData.total_revenue);
        $('.conversion').html(totalData.total_convs);
//加载评论
        $('#product .comment > span').html(reportData.product.comment ? '<i class="text-style">Comment</i>:'+reportData.product.comment : '');
        $('#os_ios .comment > span').html(reportData.os_ios.comment ? '<i class="text-style">Comment</i>:'+reportData.os_ios.comment : '');
        $('#os_android .comment > span').html(reportData.os_android.comment ? '<i class="text-style">Comment</i>:'+reportData.os_android.comment : '');
        $('#platform .comment > span').html(reportData.platform.comment ? '<i class="text-style">Comment</i>:'+reportData.platform.comment : '');
        $('#country .comment > span').html(reportData.country.comment ? '<i class="text-style">Comment</i>:'+reportData.country.comment : '');
        $('#affiliate .comment > span').html(reportData.affiliate.comment ? '<i class="text-style">Comment</i>:'+reportData.affiliate.comment : '');
    }

})();

//渲染图表
window.onload = function () {
    function showMyChart(id,option){
        var myChart = echarts.init(document.getElementById(id));
        myChart.setOption(option);
    }
    var reportData = JSON.parse(sessionStorage.getItem("report_list") || '{}');
    function getChart0Obj() {
        var obj = JSON.parse(reportData.product.data);
        var dataShadow = [];
        var xMax = 300;
        var dataLen = Object.keys(obj).length;
        for (let k in obj){
            dataShadow.push(xMax);
        }
        return {
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'item'  //悬浮提示框不显示
            },
            xAxis : [
                {
                    show:false,
                    type : 'value',
                    boundaryGap : [0, 0],
                    position: 'top'
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : Object.keys(obj),
                    axisLine:{show:false,lineStyle:{color:"#fff"}},     //坐标轴,
                    /*axisLabel:{rotate: 30,interval: 0},*/

                    axisLabel:{
                        inside: true,
                        padding:[-35,0,0,0]
                    },
                    z : 10,
                    boundaryGap  :false,
                    nameLocation : 'start',
                    axisTick:[{    //坐标轴小标记
                        show:false
                    }]
                }
            ],
            series : [
                { // For shadow
                    type: 'bar',
                    barWidth:'10rem',
                    legendHoverLink:false,
                    color: 'rgba(255,255,255,0.1)',
                    barGap:'-100%',
                    barCategoryGap:'40%',
                    data: dataShadow,
                    animation: false
                },
                {
                    name:'',
                    type:'bar',
                    barWidth:'10rem',
                    data:Object.values(obj),
                    color: function (params) {
                        return colorList[params.dataIndex]
                    },
                    itemStyle:{
                        normal:{    //柱状图颜色
                            label:{
                                show: true,   //显示文本
                                position: 'right',  //数据值位置
                            }
                        }
                    }
                }
            ]
        }
    }
    function getChart1Obj() {
        let obj = JSON.parse(reportData.affiliate.data);
        let newObj = [];
        for (let [k, v] of Object.entries(obj)) {
            newObj.push({'name' : k,'value' : parseInt(v.replace('%',''))});
        }
        return {
            title: {
                text: ''
            },
            /*tooltip: {},*/
            xAxis: {
                data: Object.keys(obj),
                axisLine:{lineStyle:{color:"#fff"}},
                axisLabel: {
                    interval: 0,
                    rotate: 40
                },
            },
            yAxis: {
                show:true,
                axisLine:{
                    show:true,
                    lineStyle:{ color:'#666'}
                },
                axisLabel:{show:false}
            },
            series: [{
                name: '',
                type: 'bar',
                barWidth:'20rem',
                data: newObj,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position:'top'
                        }
                    }
                }
            }]
        };
    }
    function getChart2Obj() {
        let obj = JSON.parse(reportData.country.data);
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        let holeName = [];
        for (let elem of globalCountries.entries()) {
            for (let i=0;i < keys.length-1;i++){  //遍历不算other
                if (elem[1].code == keys[i]){
                    holeName[elem[1].code] = elem[1].en;
                }
            }
        }

        return {
            /*tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },*/
            legend: {
                selectedMode:false,
                bottom:'30rem',
                width:'300rem',
                textStyle:{color:'#fff'}
            },
            series:[{
                name:keys[0] + ' '+ values[0],
                type: 'map',
                itemStyle:{color:'#dccb18'},
                mapType: 'world'},
                {
                    name:keys[1] + ' '+ values[1],
                    type: 'map',
                    itemStyle:{color:'#827bff'},
                    mapType: 'world'},
                {
                    name:keys[2] + ' '+ values[2],
                    type: 'map',
                    itemStyle:{color:'#4dd8ff'},
                    mapType: 'world'},
                {
                    name:keys[3] + ' '+ values[3],
                    type: 'map',
                    itemStyle:{color:'#eb6ea5'},
                    mapType: 'world'},
                {
                    name:keys[4] + ' '+ values[4],
                    type: 'map',
                    itemStyle:{color:'#c3d825'},
                    mapType: 'world'},
                {
                    name:keys[5] + ' '+ values[5],
                    type: 'map',
                    itemStyle:{color:'#fdb15b'},
                    mapType: 'world'},
            ],
            geo: [
                {
                    name: '世界地图',
                    type: 'map',
                    map: 'world',
                    roam: false,
                    silent:true,
                    z:100,
                    regions: [{
                        name: holeName[keys[0]],
                        itemStyle: {
                            areaColor: '#dccb18',
                            color: '#dccb18'
                        }
                    },{
                        name:holeName[keys[1]],
                        itemStyle: {
                            areaColor: '#827bff',
                            color: '#827bff'
                        }
                    },{
                        name: holeName[keys[2]],
                        itemStyle: {
                            areaColor: '#4dd8ff',
                            color: '#4dd8ff'
                        }
                    },{
                        name: holeName[keys[3]],
                        itemStyle: {
                            areaColor: '#eb6ea5',
                            color: '#eb6ea5'
                        }
                    },{
                        name: holeName[keys[4]],
                        itemStyle: {
                            areaColor: '#c3d825',
                            color: '#c3d825'
                        }
                    }],
                    itemStyle: {
                        normal: {
                            areaColor: '#fdb15b',
                            borderColor: '#404a59'
                        }
                    },
                    label:{
                        emphasis: {
                            label:{
                                show:true
                            }
                        }
                    }
                }
            ]
        };
    }
    function getChart3Obj() {
        let obj = JSON.parse(reportData.platform.data);
        let dataShadow = [];
        let xMax = 2000;
        let dataLen = Object.keys(obj).length;
        for (let k in obj){
            dataShadow.push(xMax);
        }
        return {
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'item'  //悬浮提示框不显示
            },
            xAxis : [
                {
                    show:false,
                    type : 'value',
                    boundaryGap : [0, 0],
                    position: 'top'
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : Object.keys(obj),
                    axisLine:{show:false},

                    axisLabel:{
                        inside: true,
                        padding:[-35,0,0,0]
                    },
                    z : 10,
                    boundaryGap  :false,
                    nameLocation : 'start',
                    axisTick:[{    //坐标轴小标记
                        show:false,
                        lineStyle:{color:"#fff"}
                    }]
                }
            ],
            series : [
                { // For shadow
                    type: 'bar',
                    barWidth:'10rem',
                    legendHoverLink:false,
                    color: 'rgba(255,255,255,0.1)',
                    barGap:'-100%',
                    barCategoryGap:'40%',
                    data: dataShadow,
                    animation: false
                },
                {
                    name:'',
                    type:'bar',
                    barWidth:'10rem',
                    data:Object.values(obj),
                    color: function (params) {
                        return colorList[params.dataIndex]
                    },
                    itemStyle:{
                        normal:{    //柱状图颜色
                            label:{
                                show: true,   //显示文本
                                position: 'right',  //数据值位置
                            }
                        }
                    }
                }
            ]
        }
    }
    function getChart4Obj(type) {
        let newObj = [];
        let obj ={};
        if (type == 'os_ios'){
            obj = JSON.parse(reportData.os_ios.data);
        }
        else if (type == "os_android"){
            obj = JSON.parse(reportData.os_android.data);
        }

        for (let [k, v] of Object.entries(obj)) {
            newObj.push({'name' : k,'value' : parseInt(v.replace('%',''))});
        }

        return {
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['28%', '50%'],
                    avoidLabelOverlap: false,
                    silent:true,
                    itemStyle:{
                        normal:{
                            color: function (params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:newObj
                }
            ]
        };
    }



    if ($.isEmptyObject(reportData)){
        showMyChart('chart0',getChart0Obj());
        showMyChart('chart1',getChart1Obj());
        showMyChart('chart2',getChart2Obj());
        showMyChart('chart4',getChart4Obj('os_ios'));
        showMyChart('chart5',getChart4Obj('os_android'));
    }


    $('#chart7 ul > li:not(:first-child)').each(function (index){
        $(this).addClass('row'+index);
        $(this).children(":first-child").css("color","#fff");
    })
}
/*(function () {


})*/


