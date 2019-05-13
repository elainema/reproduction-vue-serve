import Vue from 'vue'

// Register a global custom directive called v-focus
Vue.directive('box-action-resize', {
    // called only once, when the directive is first bound to the element. This is where you can do one-time setup work.
    inserted: function(el, binding) {
        // Focus the element
        let $content = $(el).next(".box-content").length ? $(el).next(".box-content") : $(el).next(".box-container")
        $(el).on("click", function(e) {
            if ($(el).find(".icon-chevron-down").hasClass("hide")) {
                $(el).find(".icon-chevron-up").addClass("hide");
                $(el).find(".icon-chevron-down").removeClass("hide")
                $content.slideUp(200)
            } else {
                $(el).find(".icon-chevron-up").removeClass("hide");
                $(el).find(".icon-chevron-down").addClass("hide")
                $content.removeClass("hide").slideDown(200)
            }
        })
    }
})

Vue.directive('box-action-full-small', {
    // called only once, when the directive is first bound to the element. This is where you can do one-time setup work.
    inserted: function(el, binding) {
        // Focus the element
        let $content = $(el).next(".box-content").length ? $(el).next(".box-content") : $(el).next(".box-container")
        $(el).on("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
            if ($(el).find(".icon-resize-full").hasClass("hide")) {
                $('body').css('overflow', 'hidden');
                $(el).parents('.box').removeClass('box-max');
                $(el).find(".icon-resize-full").removeClass("hide");
                $(el).find(".icon-resize-small").addClass("hide")
            } else {
                $('body').css('overflow', 'auto');
                $(el).parents('.box').addClass('box-max');
                $(el).find(".icon-resize-full").addClass("hide");
                $(el).find(".icon-resize-small").removeClass("hide")
            }
        })
    }
})