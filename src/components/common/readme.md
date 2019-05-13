# Modal.vue
#### 函数功能
通用模态框，顶部title和底部文案以及点击时执行的方法由父组件传入，模态框主体部分在父组件定义。
#### 参数说明
具体参数及使用详见文件
#### 注意事项
> 底部按钮不管是点确认还是取消，都会更改父组件传递通过prop传递过来的dialogVisible值，对dialogVisible的值prop 进行“双向绑定”，参考offer detail basic模块的addTokenModal

> 如果模块内模态框的主体均为静态文本展示，不需要从父组件传递什么数据，可以直接prop参数dialogBody='your dialogBody'。如果模态框内容需要从组件传递或者部分需要从父组件传递，那么可以在父组件调用模态框的地方，添加插槽<template slot="dialogBody">你的主体内容</template>即可，参考/src/views/Offer/components/add-token-modal/的使用方法

> 如果有自定义的onConfirm参数，在点击确认按钮时，需要自己在onConfirm里处理this.handleClose()，并且dialogName为必传参数

> 有多层嵌套的模态框，每层需prop参数 :onCancel="handleClose",如果在onCancel时有其他自定义操作，并且需要关闭模态框话，需要在onCancel自定义方法里加上this.handleClose(),并且dialogName为必传参数

> 直接调用CommonModal.vue，且prop参数onConfirm时，需要在onConfirm时将dialogVisible的值置为false,参考Tool/Notice

> 参考BusinessEditableTextareaOffer.vue，在禁止通过点击 modal 关闭 Dialog的情况下，点击modal展开的内容不关闭，但是使用CommonModal会关闭，更改为点击 modal 可以关闭 Dialog

> 如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 append-to-body 属性。这里说的嵌套，是指多个模态框公用一个模态遮罩层。注意：被嵌套的模态框需要在主模态框之外，参考：ChangeOfferPayoutRevenueModal.vue

> 如果一个页面有多个模态框，或者某个模态框主体内容过多，会导致页面很长，不方便查阅，可以将模态框进行再次封装,例如offer detail payment模块,编辑Default Payout，在/src/views/Offer/Detail/Payment模块(组件A)调用ChangeOfferPayoutRevenueModal.vue(组件B)，在ChangeOfferPayoutRevenueModal.vue内调用通过模态框CommonModal.vue(组件C),需要在调用组件A的地方声明B组件的dialogName，在组件B中prop字段dialogName，组件B的visible属性值需要定义在data或者computed里，根据父组件A的值改变而改变，并向CommonModal.vue子组件prop参数:onCancel="handleClose"，方法封装在/src/mixins/dialog.js里，其他参数为模态框主体内容需要的变量等，和通用模态框无关，参考：/src/views/Offer/components/ChangeOfferPayoutRevenueModal.vue，/src/views/Offer/components/AddTokenModal.vue的使用方法

> 如果一个页面有多个模态框，或者某个模态框主体内容过多，会导致页面很长，不方便查阅，可以将模态框进行再次封装,例如offer detail payment模块,编辑Default Payout，在/src/views/Offer/Detail/Payment模块(组件A)调用ChangeOfferPayoutRevenueModal.vue(组件B)，在ChangeOfferPayoutRevenueModal.vue内调用通过模态框CommonModal.vue(组件C),需要在调用组件A的地方声明B组件的dialogName，在组件B中prop字段dialogName，组件B的visible属性值需要定义在data或者computed里，根据父组件A的值改变而改变，并向CommonModal.vue子组件prop参数:onCancel="handleClose"，方法封装在/src/mixins/dialog.js里，其他参数为模态框主体内容需要的变量等，和通用模态框无关，参考：/src/views/Offer/components/change-offer-payout-revenue-modal/，/src/views/Offer/components/add-token-modal/的使用方法

> 某些模态框底部有三个按钮，请自定义slot dialogFooter，底部按钮事件触发时关闭弹窗的逻辑需要自行处理

# DatePickerSingle.vue
单个选择日期的组件

# CommonSwitch.vue
#### 功能
使用bootstrap封装的多个switch插件，参数较多，偶发性出现开关需要多次点击，或者点击不生效的情况，很难定位，新功能使用时也不知道该用哪个合适。
#### 参数说明
新插件基于iview，New_Switch.vue，具体可参考官方API，封装的部分参数和使用方法如下：
> 1、在store/app/modules/app.js switchInfo里添加对应的key(switch_param):0(default_val)，适用于点击开后立即/用户处理后调用接口的情况，比如offer详情页的开关
> 2、基于1，注意switch_param不能重复，如果命名重复，需要在使用的地方，自己做下处理，可以参考offer详情页basic模块的Global Pixel Type和trackIng模块的Global Pixel Type
> 3、如果点击开关时并不立即调用接口，但是有回调处理，也需设置switch_param，并且switch_param重名的话，可设置updateState:false，这种情况略过步骤一，参考create offer开关使用方法
> 4、对于某些特地条件下才会渲染的开关：需要自定义渲染时机：参考：tracking模块  Global Pixel Type开关
> 5、如果在点击开关时只有默认行为(开>关，关>开)，不立即调接口，也不会弹窗，也不关联其他模块/内容的展示隐藏等，可以直接使用iview开关组件，参考offer详情页KPI Setting模块，
注意，这个模块样式和通用的稍有不同，没有开/关状态时的文本，也没有switch_param，可自行添加switch_param和yes_text,no_text等
> 6、部分其他参数说明详见组件内说明
```javascript
<i-switch v-model="default_value" true-value="1" false-value="0" name="switch_param" yes_text="Yes" no_text="No"/>
```