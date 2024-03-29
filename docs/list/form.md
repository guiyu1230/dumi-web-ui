---
title: Form表单
nav:
  title: 组件
  path: /components
group:
  title: 组件
  path: /components
---

## 手写 form 表单:

模拟`antd Form`组件编写高性能表单

```tsx
import React from 'react';
import { Form } from 'dumi-web-ui';
import { Input, Select, Checkbox, Switch, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

function Demo() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('finish', values);
  };

  const onReset = (event) => {
    console.log('reset');
  };

  const onValuesChange = (changedValues: any, values: any) => {
    console.log('onValuesChange', changedValues, values);
  };

  const handleClick = () => {
    console.log(form);
  };

  return (
    <Form
      form={form}
      initialValues={{
        username: '1234',
        is_admin: true,
        switch: true,
      }}
      onFinish={onFinish}
      onReset={onReset}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="用户名" name="username" initialValue="345">
        <Input type="text" style={{ width: 'calc(100% - 100px)' }} />
      </Form.Item>
      <Form.Item label="品牌" name="role" initialValue="saab">
        <Select>
          <Select.Option value="volvo">Volvo</Select.Option>
          <Select.Option value="saab">Saab</Select.Option>
          <Select.Option value="mercedes">Mercedes</Select.Option>
          <Select.Option value="audi">Audi</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="是否是管理员" name="is_admin" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item label="备注">
        <Input type="text" style={{ width: 'calc(100% - 100px)' }} />
      </Form.Item>
      <Form.Item label="开关" name="switch" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="日期选择器" name="datepicker">
        <DatePicker />
      </Form.Item>
      <Form.Item label="范围选择器" name="rangepicker">
        <RangePicker />
      </Form.Item>
      <Form.Item>
        <button type="submit">提交</button>
        <input type="reset" value="重置" />
        <button type="button" onClick={handleClick}>
          获取实例
        </button>
      </Form.Item>
    </Form>
  );
}

export default () => <Demo />;
```
