/**
  custom checkbox  editable input.

@class checkbox_custom
@extends abstractinput
@final
@example
<a href="#" id="traffic_ids" class="editable editable-click"></a><script>
$(function(){
$('#traffic_ids').editable({
url: '/post',
value: {traffic_ids['2']:1}
});
});
</script>
 **/
(function($) {
    "use strict";

    var Checkbox = function(options) {
        this.init('checkbox', options, Checkbox.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Checkbox, $.fn.editabletypes.abstractinput);

    $.extend(Checkbox.prototype, {
        /**
          Renders input from tpl

          @method render() 
         **/
        render: function() {},

        /**
          Default method to show value in element. Can be overwritten by display option.

          @method value2html(value, element) 
         **/
        value2html: function(value, element) {
            var html = ""
            var list = value || []
            var list_str = ""
            /*for (var i = 0; i < list.length; i++) {
                list_str += '<span ><i class="icon_zone ' + (list[i].allowed == '1' ? '' : 'not-check') + ' "><i class="icon-check-empty"></i> <i class="icon icon-custom"></i><input type="hidden" name="traffic_ids[' + list[i].id + ']" data-control-name="traffic_ids[' + list[i].id + ']" value="' + list[i].allowed + '"/></i>' + list[i].text + '</span>'
            }


            html += '<form class="form-inline " id="form_traffic_list">' + '<ul class="checkList allow_traffic_list">' + '<li>' + list_str + '</li>' + '</ul>' + '</form>'*/
            html = list.join(",")
            $(element).html(html);
        },

        /**
          Gets value from element's html

          @method html2value(html) 
         **/
        html2value: function(html) {
            /*
               you may write parsing method to get value by element's html
               e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
               but for complex structures it's not recommended.
               Better set value directly via javascript, e.g. 
               editable({
            value: {
            city: "Moscow", 
            street: "Lenina", 
            building: "15"
            }
            });
            */

            var names = html.split(" ");
            return null;
            //return {first_name: names[0], last_name: names[1]};
        },

        /**
          Converts value to string. 
          It is used in internal comparing (not for sending to server).

          @method value2str(value)  
         **/
        value2str: function(value) {
            var str = '';
            if (value) {
                for (var k in value) {
                    str = str + k + ':' + value[k] + ';';
                }
            }
            return str;
        },

        /*
           Converts string to value. Used for reading value from 'data-value' attribute.

           @method str2value(str)  
           */
        str2value: function(str) {
            /*  
               this is mainly for parsing value defined in data-value attribute. 
               If you will always set value by javascript, no need to overwrite it
               */
            return str;
        },

        /**
          Sets value of input.

          @method value2input(value) 
          @param {mixed} value
         **/
        value2input: function(value) {
            var $this = $(this.options.scope);
            var list = $this.data("source")
            var list_str = ""
            for (var i = 0; i < list.length; i++) {
                var is_existed =  value.indexOf(list[i].text) !== -1  ? "1" : "0";
                list_str += '<span class="hvr-fade"><i class="icon_zone ' + (is_existed == "1" ? '' : 'not-check') + ' "><i class="icon-check-empty"></i> <i class="icon icon-custom"></i><input type="hidden" name="traffic_ids[' + list[i].id + ']" data-control-name="traffic_ids[' + list[i].id + ']" value="' + ( is_existed ) + '"/></i>' + list[i].text + '</span>'
            }

            this.$tpl.find("li").html(list_str)
            this.$tpl.find(".allow_traffic_list span").click(function(e) {
                var $span = $(e.currentTarget);
                var $icon_zone = $span.find(".icon_zone")
                var is_selected = $icon_zone.hasClass("not-check");
                if(is_selected) {
                    $icon_zone.removeClass("not-check")
                    $icon_zone.find("[type=hidden]").val(1)
                } else {
                    $icon_zone.addClass("not-check")
                    $icon_zone.find("[type=hidden]").val(0)
                }
            })

        },

        /**
          Returns value of input.

          @method input2value() 
         **/
        input2value: function() {
          var obj = {};
          this.$tpl.find("[type=hidden]").each(function(){
            obj[$(this).attr("name")] = $(this).val()
          })
          return obj
        },

        /**
          Activates input: sets focus on the first field.

          @method activate() 
         **/
        activate: function() {},

        /**
          Attaches handler to submit form in case of 'showbuttons=false' mode

          @method autosubmit() 
         **/
        autosubmit: function() {
            this.$input.keydown(function(e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        }
    });

    Checkbox.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<form class="form-inline " id=""><ul class="checkList allow_traffic_list"><li></li></ul></form>',
        inputclass: ''
    });

    $.fn.editabletypes.checkbox = Checkbox;

}(window.jQuery));
