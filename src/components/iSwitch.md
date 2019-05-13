使用bootstrap封装的多个switch插件，参数较多，偶发性出现开关需要多次点击，或者点击不生效的情况，很难定位，新功能使用时也不知道该用哪个合适。
新插件基于iview，New_Switch.vue，具体可参考官方API，封装的部分参数和使用方法如下：
> 1、在store/app/modules/app.js switchInfo里添加对应的key(switch_param):0(default_val)，适用于点击开后立即/用户处理后调用接口的情况，比如offer详情页的开关

> 2、基于1，注意switch_param不能重复，如果命名重复，需要在使用的地方，自己做下处理，可以参考offer详情页basic模块的Global Pixel Type和trackIng模块的Global Pixel Type

> 3、如果点击开关时并不立即调用接口，但是有回调处理，也需设置switch_param，并且switch_param重名的话，可设置updateState:false，这种情况略过步骤一，参考create offer开关使用方法

> 4、对于某些特地条件下才会渲染的开关：需要自定义渲染时机：参考：tracking模块  Global Pixel Type开关

> 5、如果在点击开关时只有默认行为(开>关，关>开)，不立即调接口，也不会弹窗，也不关联其他模块/内容的展示隐藏等，可以直接使用iview开关组件，参考offer详情页KPI Setting模块，
注意，这个模块样式和通用的稍有不同，没有开/关状态时的文本，也没有switch_param，可自行添加switch_param和yes_text,no_text等

6、部分其他参数说明详见组件内说明

```javascript
<i-switch v-model="default_value" true-value="1" false-value="0" name="switch_param" yes_text="Yes" no_text="No"/>
```