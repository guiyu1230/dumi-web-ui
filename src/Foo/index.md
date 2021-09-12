---
title: 自定义
---

<!-- ---
nav:
  title: Foo
  path: /components
  order: 10
group:
  path: /components/Foo
  title: 大标题
  order: 10
--- -->

## Foo

Demo:

```tsx
/**
 * transform: true
 * background: '#f6f7f9'
 */
import React from 'react';
import { Foo } from 'dumi-web-ui';

export default () => <Foo title="First Demo" />;
```

## Foo2

Demo:

```tsx
/**
 * transform: true
 * background: '#f6f7f9'
 * compact: false
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Foo } from 'dumi-web-ui';

export default () => <Foo title="First Demo" />;
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
