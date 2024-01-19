import * as React from 'react';
import { useMemo, useRef } from 'react';
import FieldContext from './FieldContext';
import { FormStore } from './FormStore';
import type { Callbacks, Store } from './typings';

type BaseFormProps = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
>;

// 第一阶段的props需要实现的参数只有initialValues、children
export interface FormProps<Values = any> extends BaseFormProps {
  initialValues?: Store;
  children?: React.ReactNode;
  onFinish?: Callbacks<Values>['onFinish'];
  onValuesChange?: Callbacks<Values>['onValuesChange'];
}

const Form: React.FC<FormProps> = ({
  initialValues,
  children,
  onValuesChange,
  onFinish,
  onReset,
}) => {
  // FormStore的实例就是上面说到的管理"数据状态"和"fieldEntities"的对象
  // 我们用useRef使其在组件的整个生命周期内持续存在
  const formStore = useRef<FormStore>(new FormStore());

  formStore.current.setCallbacks({
    onValuesChange,
    onFinish: (values: Store) => {
      if (onFinish) {
        onFinish(values);
      }
    },
  });

  // 通过mountRef让下面逻辑仅在组件首次加载时执行
  const mountRef = useRef(false);
  // setInitialValues用于存放initialValues,存放initialValues的目的在于reset时候把initialValues赋值给store,
  // 第二个参数为true时,调用setInitialValues更新formStore内部的inititalValues同时也更新store,
  // store就是上面所说的存放"数据状态"的对象变量
  formStore.current.setInitialValues(initialValues, !mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }

  // 创建fieldContextValue用于注入到下面的FieldContext,
  // 使得Form中的子组件都能访问formStore
  const fieldContextValue = useMemo(
    () => ({
      formStore: formStore.current,
    }),
    [],
  );

  const wrapperNode = (
    <FieldContext.Provider value={fieldContextValue}>
      {children}
    </FieldContext.Provider>
  );

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        formStore.current.submit();
      }}
      onReset={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        formStore.current.resetFields();
        onReset?.(event);
      }}
    >
      {wrapperNode}
    </form>
  );
};

export default Form;
