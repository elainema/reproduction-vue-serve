<template>
    <select data-placeholder="- Categories -" class="" name="category_ids[]" id="category" multiple="multiple" ref="category">
        <option :value="n.id" v-for="n in chosen.data">{{ n.name }}</option>
    </select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
//list: traffic, traffic_ids: o.traffic_ids, type: "mobile_content"
export default {
    props: ['defaultCategory', 'chosen'],
    data(){
        return {
        }
    },
    computed: {
    },
    methods: {
        ...mapActions([
            //'setKeyValue'
        ]),
        initCategory() {
            var _this = this
            $.each(_this.defaultCategory, function(ci, cn) {
                $('option[value=' + cn + ']', '#category').attr('selected', 'selected');
            })
            //category_ids
            $(_this.$refs.category)
                .select2()
                .on('select2-selecting', function(e) {
                    var newCategory = $(_this.$refs.category).val()
                   // _this.setKeyValue({key: 'category', value:newCategory.push(e.val)})
                });

            $(_this.$refs.category).select2().trigger('select2-selecting');
        },
    },
    mounted () {
        let that = this
        setTimeout(function() {
            that.initCategory();
        }, 1000)
    }
}
</script>