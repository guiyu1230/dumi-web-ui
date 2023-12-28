import type {
  FieldEntity,
  Store,
  NotifyInfo,
  ValuedNotifyInfo,
} from './typings';

export class FormStore {
  // 保存数据状态变量
  private store: Store = {};
  // 保存Form表单中的Form.Item实例
  private fieldEntities: FieldEntity[] = [];
  // 保存初始值, 该初始值会受Form.props.initialValues和Form.Item.props.initialValue影响
  private initialValues: Store = {};

  // 设置initialValues，如果init为true，则顺带更新store
  public setInitialValues = (
    initialValues: Store | undefined,
    init: boolean,
  ) => {
    this.initialValues = initialValues || {};
    if (init) {
      this.store = { ...this.store, ...initialValues };
    }
  };

  // 根据name获取store中的值
  public getFieldValue = (name: string) => {
    //@ts-ignore
    return this.store[name];
  };

  // 获取整个store
  public getFieldsValue = () => {
    return { ...this.store };
  };

  // 内部更新store的整个函数
  public udpateValue = (name: string | undefined, value: any) => {
    if (name === undefined) return;
    const preStore = this.store;
    this.store = { ...this.store, [name]: value };
    this.notifyObservers(preStore, [name], {
      type: 'valueUpdate',
      source: 'internal',
    });
  };

  // 获取那些带name的Form.Item实例
  private getFieldEntities = () => {
    return this.fieldEntities.filter((field) => field.props.name);
  };

  // 往fieldEntities注册Form.Item实例,每次Form.Item实例在componentDidMount时,都会调用该函数把自身注册到fieldEntities上
  // 最后返回一个接触注册函数
  public registerField = (entity: FieldEntity) => {
    this.fieldEntities.push(entity);

    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
    };
  };

  // Form.Item实例化时,在执行constructor期间调用该函数以更新initialValue
  public initEntityValue = (entity: FieldEntity) => {
    const { initialValue, name } = entity.props;
    if (name !== undefined) {
      const preValue = this.store[name];

      if (preValue === undefined) {
        this.store = { ...this.store, [name]: initialValue };
      }
    }
  };

  // 生成更新信息mergedInfo且遍历所有的Form.Item实例调用其onStoreChange方法判断是否需要更新执行
  private notifyObservers = (
    preStore: Store,
    namePathList: string[] | undefined,
    info: NotifyInfo,
  ) => {
    const mergedInfo: ValuedNotifyInfo = {
      ...info,
      store: this.getFieldsValue(),
    };
    this.getFieldEntities().forEach(({ onStoreChange }) => {
      onStoreChange(preStore, namePathList, mergedInfo);
    });
  };
}
