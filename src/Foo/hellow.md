---
title: 自定义1
---

## Foo3

Demo:

<Alert type="info">
  注意，内部暂时只能编写 HTML
</Alert>

#### 标签测试 <Badge>Hello</Badge>

```tsx
/**
 * debug: true
 */
import React from 'react';
import { Foo } from 'dumi-web-ui';

export default () => {
  return (
    <>
      <Foo title="First Demo" />
    </>
  );
};
```

## Foo4

Demo:

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Foo } from 'dumi-web-ui';

export default () => <Foo title="First Demo" />;
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
