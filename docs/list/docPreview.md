---
title: 文档预览
nav:
  title: 组件
  path: /components
group:
  title: 组件
  path: /components
---

## 文档预览:仅限 docx,xlsx,xls,pdf 类型. 且文档为只读

```jsx
import React from 'react';
import { DocPreview } from 'dumi-web-ui';
import { Upload, Button } from 'antd';
class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null,
      type: null,
    };
    this.handlePreview = this.handlePreview.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  handlePreview(file) {
    console.log(file);
    this.setState({
      file: file.originFileObj,
      type: file.name.split('.')[1],
    });
  }
  onChange(info) {
    if (info.file) {
      const file = info.file;
      this.setState({
        file: file.originFileObj,
        type: file.name.split('.')[1],
      });
    }
  }
  render() {
    return (
      <>
        <Upload
          multiple={true}
          onChange={this.onChange}
          onPreview={this.handlePreview}
        >
          <Button>点击上传docx、exel、pdf文件</Button>
        </Upload>
        <DocPreview type={this.state.type} file={this.state.file} />
      </>
    );
  }
}
export default () => <Demo />;
```
