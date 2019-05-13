<template>
  <div class="main-skeleton">
    <div>
      <div class="skeleton-container">
        <div class="row">
          <div class="col-md-4">
            <v-skeleton height="100%" > </v-skeleton>
          </div>
          <div class="skeleton col-md-8">
            <div style="margin-bottom:20px;">
              <v-skeleton height="50px" > </v-skeleton>
            </div>
            <div class="row" style="margin-bottom:20px;">
              <div class="col-md-8">
                <v-skeleton height="150px" > </v-skeleton>
              </div>
              <div class="col-md-4">
                <v-skeleton height="150px"></v-skeleton>
              </div>
            </div>
            <div>
              <v-skeleton height="50px" > </v-skeleton>
            </div>
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
<style>
  .skeleton-container {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 100px 0;
  }
  .skeleton {
  }
</style>
