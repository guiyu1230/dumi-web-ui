## 防 antd Form 手写 mini-form

[转载出处](https://juejin.cn/post/7038099720400535582)

### 第一阶段：实现数据管理

- Form.tsx: Form 表单组件
- FormStore.ts: FormStore 管理公共状态的对象
- Field.tsx: Form.Item 表单字段组件

`Field`，在手写`Field`类之前需要明确其要如何处理控件：我们通过`React.cloneElement`向控件的`props`隐式混入`value`和`onChange`，从而使控件变成受控组件，当然这两个值可以分别通过`Form.Item.props`里的`valuePropName`和`trigger`设置。而`value`是注入`formStore`的`store`里对应的值，而`onChang`e 会注入一个自定义的方法，在其方法里会调用`formStore.updateValue`。

效果总结:

1. 首先可以看到，两次修改表单控件数据顺利，且点击`FieldContext`里面查看`formStore`里的`store`，数据有对应的变化(要来回切换组件才看到，因为并非用`setStat`e 或`useState`更新，所以 devtools 没有即时更新)。
2. `Form`和`Form.Item`的`initialValues`同时设置`username`的值，但刷新页面时显示`Form`中设置的值，这优先级逻辑与`Antd Form`的一致
3. 是否是管理员的勾选框所在的`Form.Item`中我们设置了`valuePropName`属性。而在运行中`formStore`里的`store`的 is_admin 值变化无误。说明该值生效。
