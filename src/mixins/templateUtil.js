
let template_util  = {
  data(){
    return {
     }
  },
  methods: {
    setNAWhileEmpty (str) {
        return str !== "" ?  str : "<span class='color_gray'>N/A</span>"
    },
    translateDateStrToDate(str) {
        try {
            if (str.match(/-/g)) return str
            var date = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + (parseInt(str.substr(6, 2)) < 10 && str.substr(6, 2).length === 1 ? "0" + str.substr(6, 2) : str.substr(6, 2))
        } catch (e) {
            var date = str
        }
        return date
    },
    truncateIp (str, len) {
        if(!len || !str || len > 4 || len < -4 || len == 0){
            return str;
        }
        var ips = str.split(".");

        while (len != 0){
            ips.splice(len);
            if(len > 0){
                len --;
            }else{
                len ++;
            }
        }
        return ips.join(".");
    },
    calPercent () {
        var tempCount = 0;
        var returnPercent = arguments[0];
        var total = parseFloat(arguments[1]) || 0;
        for (var i = 2; i < arguments.length; i++) {
            tempCount = tempCount + (parseFloat(arguments[i]) || 0);
        }
        if(!returnPercent){
            return total <= 0 ? "0.00%("+tempCount+")" : (Math.floor(tempCount / total * 10000) / 100.00 + "%")+"("+tempCount+")";
        }else{
            return total <= 0 ? "0.00%" : (Math.floor(tempCount / total * 10000) / 100.00 + "%");
        }
    },
  }
}
export default template_util = template_util