//获取请求参数
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
var para = getRequest();

var config = {
    api_host: para && para.host ? para.host : (para.e && para.e =='p' ? document.location.protocol + '//api.prodpre.dy/newymapi' : document.location.protocol +  '//api.yeahmobi.com/newymapi') //'http://172.30.51.235:7351/newymapi'
};
//绑定touch事件相关
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
var touchstart = "touchstart",
    touchend = "touchend",
    touchmove = "touchmove";
/*if ("ontouchstart" in document) var touchstart = "touchstart",
    touchend = "touchend",
    touchmove = "touchmove";
else var touchstart = "mousedown",
    touchend = "mouseup",
    touchmove = "mousemove";*/
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
        //形成二维码
        var reportSrc = window.location.href;
        $("#code").qrcode({
            width: 110, //宽度
            height:110, //高度
            text: reportSrc,
            correctLevel:0
        });
        //通过参数取数据
        if (para['adv_name'] == null){
            $.get(config.api_host+'/Bi/getBiReportDetailsForH5',para,function (response) {
                if (response && response.flag == 'fail'){
                    document.getElementById("loading_text").innerHTML = "<p style='font-size: 1rem'>数据加载失败</p>";
                    $("#loading_bar").hide();
                    return false;
                }
                var result = response && response.data && response.data.data || {};

                if (!$.isEmptyObject(result)){

                    var advName = result['adv_name'];
                    $('.advName').html(advName);
                    for (var k in result){
                        if (!result[k] || result[k].data == ''){
                            $('#'+k).addClass('hiddenTab');
                            $(".hiddenTab ").remove();
                        }
                        if (k == 'product' && result['total']['data'] != ''){
                            var totalData = JSON.parse(result.total.data);
                            $('.p_num').html(totalData.total_products);
                            $('.total_cost').html(totalData.total_revenue);
                            $('.conversion').html(totalData.total_convs);
                        }
                        fillData(result[k],k);
                    }
                    INDEX();
                    filieChart(result);
                }
                else {
                    document.getElementById("loading_text").innerHTML = "<p style='font-size: 1rem'>数据加载失败</p>";
                    $("#loading_bar").hide();
                    return false;
                }
            })
        }
        //留言提交事件绑定

        $("textarea").blur(function () {

            document.body.scrollTop = 0;  //浏览器会自己调整高度以免遮住输入框
        });
        $(".submit").on('click touchend',function () {
            var advice = $.trim($("textarea[name='advice']")[0].value);
            if (advice != ''){
                para.message = advice;
                $.post(config.api_host+'/Bi/sendFeedback',para,function (response) {
                    if (response && response.flag == 'success'){
                        $(".shadow").css("display","block");
                        setTimeout(function() {
                            $(".shadow").css({
                                display: "none"
                            })
                        }, 1500)
                    }
                    else {
                        alert("Please check the Network!")
                    }
                })
            }
        })
    }(),
    INDEX = function () {
    var e = $(".wrapper"),
        t = 0,
        n = 0,
        r = 0,
        i = document.documentElement.clientHeight,
        s = document.documentElement.clientWidth,
        o = e.children("section").length - 1,
        u = i * o,
        a = 0,
        f = e.children("section");
    e.css({
        height: 11 * i + "px"
    }),
    $("body").css({
        height: 11 * i + "px"
    }),//android键盘抬起页面乱掉
    f.css({
        height: i + "px"
    }), window.onresize = function() {
       // alert(document.documentElement.clientHeight);
        //解决android端键盘抬起bug


        var t = i,
            n = s;
        i = document.documentElement.clientHeight < i ? i : i = document.documentElement.clientHeight; //解决android端键盘抬起bug
        s = document.documentElement.clientWidth, u = i * o, r = -1 * a * i, c && (i < s ? l.show() : l.hide()), i != t && (e.css({
            height: 11 * i + "px"
        }), f.css({
            height: i + "px"
        })), "stop" == TOUCH && (i != t && e.css(transform_css("translate3d(0," + r + "px,0)")), s != n)
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
                /*var nodeType = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase() : (e.target ? e.target.nodeName.toLowerCase() : '');
                if(nodeType != 'select' && nodeType != 'option' && nodeType != 'input' && nodeType != 'textarea' && nodeType != 'a'){e.preventDefault();}*/
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
            uninit: v //que1
        }
    };
    $(".back_bg").each(function (k) {
        var showSec = $(this)[0].classList[0].replace("sec","");
        d[k+1] = v(showSec);
    })
    
    //d[1] = v("2"), d[2] = v("3"), d[3] = v("4"), d[4] = v("5"), d[5] = v("6"), d[6] = v("7"),d[7] = v("8"),d[8] = v("9"),d[9] = v("10");
    // d[1] = v("1"), d[2] = v("2"), d[3] = v("3"), d[4] = v("4"), d[5] = v("5"), d[6] = v("5-app"), d[7] = v("5-oper"), d[8] = v("6"), d[9] = v("7"), d[10] = v("8");
    $("#home").on(touchend, function(e) {
        if ("start" != TOUCH) return;
        p(6, 0, "no_transition")
    }), $("#home").on("click", function(e) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    try {
        var E = new Parallax(e.find(".sec1").get(0))
    } catch (S) {}
    var x = $("#loading"),
        T = $("#loading_text"),
        N = function() {
            var e = ["./images/logo.png", "./images/background.png", "./images/background2.png", "./images/facebook.png", "./images/in.png", "./images/twitter.png", "./images/arrow.png"],
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
        h();//提前绑定事件，dom已经形成
        x.hide(),e.show(),e.show(), e.show().find(".sec0 > .logo").addClass("breathe"), setTimeout(function() {
            e.find(".sec0").css({
                display: "none"
            })
        }, 1000),setTimeout(function() {
            e.find(".sec0").css({
                display: "none"
            });
        }, 2e3), setTimeout(function() {
            d[0].init()
        }, 2500)
    })
}

//填充数据
function fillData(result,type) {

    var array = para;
    var array2 = array && array['cycle_identifier'] && array['cycle_identifier'].split('-');
    var time = '';
    if (array2){
        switch (array2[1]){
            case 'month': time = array2[0]+'/'+ array2[2]; break;
            case 'week': time = 'week ' + array2[2] + ',' + array2[0]; break;
            case 'year': time = array2[0]; break;
            case 'quarter': time = array2[2]+'th quarter '+array2[0]; break;
            default :;
        }
    }
    $('.sec1 p').html(time);

    if (!$.isEmptyObject(result)){
//加载评论
        $('#'+type+' .comment > span').html(result.comment ? '<i class="text-style"></i>'+result.comment : '');
    }
}

//渲染图表
function filieChart(result) {
    function showMyChart(id,option){
        var myChart = echarts.init(document.getElementById(id));
        myChart.setOption(option);
    }
    var reportData = result || {};
    function getChart0Obj() {
        var obj = JSON.parse(reportData.product.data);
        var total = JSON.parse(reportData.total.data);
        var dataShadow = [];
        var xMax = 100;
        var oKeys = [];
        var oVal = [];

        for (var k in obj){
            dataShadow.push(xMax);
            oVal.unshift(Math.floor(obj[k]/total.total_convs*100));
            k = k.length > 46 ? k.slice(0,46)+'...' : k;
            oKeys.unshift(k);
        }

        return {
            title : {
                text: '',
                subtext: ''
            },
            /*tooltip : {
                trigger: 'item',  //悬浮提示框不显示
                formatter: "{b} : {c}%"
            },*/
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
                    data :oKeys,
                    axisLine:{show:false,lineStyle:{color:"#fff"}},     //坐标轴,

                    axisLabel:{
                        inside: true,
                        padding:[-30,0,0,0]
                    },
                    /*min: function(value) {
                        return value.min-2;
                    },*/
                    z : 10,
                    boundaryGap  :true, //有默认边距
                    nameLocation : 'start',
                    axisTick:[{    //坐标轴小标记
                        show:false
                    }]
                }
            ],
            series : [
                { // For shadow
                    type: 'bar',
                    barWidth:'12rem',
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
                    barWidth:'12rem',
                    data:oVal,
                    color: function (params) {
                        return colorList[params.dataIndex]
                    },

                    itemStyle:{
                        normal:{    //柱状图颜色
                            label:{
                                show: true,   //显示文本
                                position: 'right',  //数据值位置
                                formatter:"{c}%"
                            }
                        }
                    }
                }
            ]
        }
    }
    function getChart1Obj() {
        var obj = JSON.parse(reportData.affiliate.data);
        var newObj = [];
        /*for (var k in obj){
            newObj.push({'name' : k,'value' : parseInt(obj[k].replace('%',''))});
        }*/
        Object.keys(obj).forEach(function (key) {
            newObj.push({'name' : key,'value' : parseInt(obj[key].replace('%',''))});
        })
        return {
            title: {
                text: ''
            },
            xAxis: {
                data: Object.keys(obj),
                axisLine:{lineStyle:{color:"#fff"}},
                axisLabel: {
                    interval: 0,
                    rotate: 40
                },
            },
            yAxis: {
                show:false,
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
                            position:'top',
                            formatter:"{c}%"
                        }
                    }
                }
            }]
        };
    }
    function getChart2Obj() {
        var obj = JSON.parse(reportData.country.data);
        var keys = [];
        var values = [];
        var colorList = [
            '#dccb18', '#827bff', '#4dd8ff', '#eb6ea5', '#c3d825',
            '#ccc', '#80baff', '#98cd98'
        ];
        for (var k in obj){
            keys.push(k);
            values.push(obj[k]);
        }
        var holeName = [];
        for (var j in globalCountries){
            for (var i=0;i < keys.length-1;i++){  //遍历不算other
                if (globalCountries[j].code == keys[i]){
                    holeName[globalCountries[j].code] = globalCountries[j].en;
                }
            }
        }

        var seriesArr = [],regionArr = [];
        var tmpObj = {},reObj = {};
        for (var j=0;j<keys.length;j++){
            //series数组
            tmpObj.name = keys[j] + ' '+ values[j];
            tmpObj.type = 'map';
            tmpObj.top = 20;
            tmpObj.itemStyle = {color : colorList[j]};
            tmpObj.mapType = 'world';
            seriesArr.push(tmpObj);
            tmpObj = {};
            //geo region 数组
            reObj.name = holeName[keys[j]];
            reObj.itemStyle = { areaColor:colorList[j]};
            regionArr.push(reObj);
            reObj = {};
        }

        return {
            legend: {
                selectedMode:false,
                bottom:'30rem',
                width:'300rem',
                textStyle:{color:'#fff'}
            },
            series:seriesArr,
            geo: [
                {
                    name: '世界地图',
                    type: 'map',
                    map: 'world',
                    roam: false,
                    z:100,
                    top:'20',
                    regions: regionArr,
                    itemStyle: {
                        normal: {
                            areaColor: '#ccc',
                            borderColor: '#404a59'
                        },
                        emphasis: {
                            //鼠标移入/高亮时地图的颜色
                            areaColor: '#00A0EA',
                            label:{
                                color:'#fff'
                            }
                        }
                    },
                    label:{
                        emphasis: {
                            show:true,
                            color:'#fff' //鼠标移入时图形上的文字颜色
                        }
                    }
                }
            ]
        };
    }
    function getChart3Obj() {
        var obj = JSON.parse(reportData.platform.data);
        var newObj = [];
        for (var k in obj) {
            newObj.push({'name' : k,'value' : parseInt(obj[k].replace('%',''))});
        }
        return {
            title : {
                text: '',
                    subtext: '',
                    x:'center'
            },
            tooltip : {
                trigger: 'item',
                    formatter: "{b} : {c}%"
            },
            series : [
                {
                    name: '',
                    type: 'pie',
                    silent:false,
                    radius : '50%',
                    data:newObj,
                    itemStyle:{
                        normal:{
                            color: function (params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                }
            ]
        };
    }
    function getChart4Obj(type) {
        var newObj = [];
        var obj ={};
        if (type == 'os_ios'){
            if (reportData.os_ios.data!=''){
                obj = JSON.parse(reportData.os_ios.data);
            }
            else{
                return false;
            }
        }

        if (type == "os_android"){
            if (reportData.os_android.data!=''){
                obj = JSON.parse(reportData.os_android.data);
            }
            else {
                return false;
            }
        }

        if (type == "brand"){
            if (reportData.brand.data!=''){
                obj = JSON.parse(reportData.brand.data);
            }
            else {
                return false;
            }
        }
        for (var k in obj) {
            newObj.push({'name' : k,'value' : parseInt(obj[k].replace('%',''))});
        }

        return {
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c}%"
            },
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['28%', '50%'],
                    avoidLabelOverlap: false,
                    silent:false,

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
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data:newObj
                }
            ]
        };
    }
    function getChart5Obj() {
        if (reportData && (!reportData.quality || reportData.quality.data == '')){
            return;
        }
        var obj = JSON.parse(reportData.quality.data);
        var htmlDom = "<li>\n" +
            "<span>Camapigns</span>\n" +
            "<span>Fraud</span>\n" +
            "<span>Reaction<br/>period</span>\n" +
            "</li>";
        var i = 0,key;
        var mySubString = function(str, len, hasDot) {
            var newLength = 0;
            var newStr = "";
            var chineseRegex = /[^\x00-\xff]/g;
            var singleChar = "";
            var strLength = str.replace(chineseRegex, "**").length;
            for (var i = 0; i < strLength; i++) {
                singleChar = str.charAt(i).toString();
                if (singleChar.match(chineseRegex) != null) {
                    newLength += 2;
                }
                else {
                    newLength++;
                }
                if (newLength > len) {
                    break;
                }
                newStr += singleChar;
            }

            if (hasDot && strLength > len) {
                newStr += "...";
            }
            return newStr;
        }
        for (var k in obj){
            key = mySubString(k,8,true);
            htmlDom += "<li class='row"+(i++)+"'>\n" +
                "<span data-tooltip='"+k+"' style='color:#fff'>"+key+"</span>\n" +
                "<span>"+obj[k]['Fraud']+"</span>\n" +
                "<span>"+obj[k]['BlockTime']+"</span>\n" +
                "</li>";
        }
        document.getElementById("chart7").getElementsByTagName('ul')[0].innerHTML = htmlDom;
    }

    if (result.product && result.product.data) showMyChart('chart0',getChart0Obj());

    if (result.affiliate && result.affiliate.data) showMyChart('chart1',getChart1Obj());
    if (result.country && result.country.data) showMyChart('chart2',getChart2Obj());
    if (result.platform && result.platform.data) showMyChart('chart3',getChart3Obj());
    if (result.os_ios && result.os_ios.data) showMyChart('chart4',getChart4Obj('os_ios'));
    if (result.os_android && result.os_android.data) showMyChart('chart5',getChart4Obj('os_android'));
    if (result.brand && result.brand.data) showMyChart('chart6',getChart4Obj('brand'));
    getChart5Obj()

}



