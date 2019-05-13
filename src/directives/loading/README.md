# yeah-loading
> A loading component for Vue.js.


## Usage

### vue template中调用:
```javascript
<div v-yeah-loading='hasGetAppInfo'>
</div>
```

### 事件中以服务的方式调用:
```javascript
let loadingInstanceGetAppInfo = this.$yeahloading()
loadingInstanceGetAppInfo.close()
```

