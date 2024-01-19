import Form from './Form';
import Field from './Field';

type InternalFormType = typeof Form;

interface RefFormType extends InternalFormType {
  Item: typeof Field;
}

const RefForm: RefFormType = Form as RefFormType;

RefForm.Item = Field;

export { Field as Item };
export default RefForm;
