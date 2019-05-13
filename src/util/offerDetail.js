
//export default common
export const setReadOnly = (elem, delay, type) => {
        type = type || "editable"
        var delay_timer = delay || 1500;

        switch(type) {
            case "editable":
                setTimeout(function(){
                    var _element = elem;
                    _element.unbind().attr("href", "javascript:void(0)").editable('disable').on("click",function(e){
                        e.preventDefault();
                        return;
                    });
                },delay_timer)
                break;
            case "switch":
                elem.bootstrapSwitch('setActive', false);
                break;
            case "select":

                setTimeout(function(){
                    let chosen = elem.data('chosen');
                    if (chosen) { // *)
                      chosen.destroy();
                    }
                    elem.addClass("disabled")
                    elem.attr('disabled', true).unbind()
                },delay_timer)

                break;
            case "button":
            case "select":
            case "checkbox":
            case "text":
                setTimeout(function(){
                    elem.addClass("disabled")
                    elem.attr('disabled', true).unbind()

                },delay_timer)
                break;
        }

}
export const setReadOnlyFactory = (arr, $parent) => {

    var that = this;
    _.each(arr, function(elm){
        $("[data-control-name='bt-" + elm + "']", $parent).each(function(){
            let $dom = $(this);
            setReadOnly($dom, "" , elm)
        })
    })

}