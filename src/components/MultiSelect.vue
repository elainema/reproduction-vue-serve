<template>
    <div class="multiselect" ref="multiselect_zone">
        <select multiple id="427multiselect" ref="multiselect">
            <option v-for="item in list" :data-email="item.email_send_address" :data-id="item.id">
                {{item.id}} | {{item.first_name}} {{item.last_name}} | {{item.email_send_address}}
            </option>
        </select>
        <div id="preselect_action" class=" text-center mt20">
            <a href="#" class="btn btn-primary" data-action="select_all" @click.prevent="selectAll">Select All</a>
            <a href="#" class="btn btn-primary" data-action="deselect_all" @click.prevent="deselectAll">De-select All</a>
             | 
            <a href="#" class="btn btn-primary" data-action="go_to_next" @click.prevent="onGoToNext">Next</a>
        </div>
    </div>
</template>

<script>
import Vue from "vue"
export default {
  data(){
    return {  

    }
  },
  props: {
    list:{},
    afterSelect:{},
    goToNext:{}
  },
  computed: {

  },
  watch: {
    list:function(newVal, oldVal){
        let that = this
        if (newVal) {
            this.$nextTick(function(){
                $(this.$refs.multiselect).multiSelect("refresh");
            })
        }

    }
  },
  components: { },
  methods: {
    selectAll() {
        $(this.$refs.multiselect).multiSelect('select_all');
    },
    deselectAll() {
        $(this.$refs.multiselect).multiSelect('deselect_all');
    },
    afterMSSelect() {
        let arr = []
        let arr_id = []
        $(this.$refs.multiselect_zone).find('.ms-elem-selection').filter(":visible").each(function(){
            arr.push($(this).attr("data-email"))
            arr_id.push($(this).attr("data-id"))
        })
        this.afterSelect(arr, arr_id)
    },
    onGoToNext(){
        this.goToNext()
    }
  },

  mounted () {
    let that = this;
    $(this.$refs.multiselect).multiSelect({
        selectableHeader: '<input type="text" class="search-input" autocomplete="off" placeholder="Search"><br /><label>Choose to select:</label>',
        selectionHeader: '<input type="text" class="search-input" autocomplete="off" placeholder="Search"><br /><label>Selected:</label>',
        afterInit: function(ms) {
            var _this = this,
                $selectableSearch = _this.$selectableUl.prevAll('input.search-input'),
                $selectionSearch = _this.$selectionUl.prevAll('input.search-input'),
                selectableSearchString = '#' + _this.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
                selectionSearchString = '#' + _this.$container.attr('id') + ' .ms-elem-selection.ms-selected';

            _this.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                .on('keydown', function(e) {
                    if (e.which === 40) {
                        _this.$selectableUl.focus();
                        return false;
                    }
                });

            _this.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                .on('keydown', function(e) {
                    if (e.which == 40) {
                        _this.$selectionUl.focus();
                        return false;
                    }
                });
        },
        afterSelect: function() {
            var _this = this
            _this.qs1.cache();
            _this.qs2.cache(_this.qs1);
            that.afterMSSelect()

        },
        afterDeselect: function() {
            var _this = this
            _this.qs1.cache();
            _this.qs2.cache();
        }
    });
  }
}
</script>
<style>
 .multiselect .ms-container {
    margin: 0 auto;
    min-width: 900px;
 }
</style>