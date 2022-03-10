import * as React from 'react';
import readPreview from './util';

/**
 * @cnName 文档预览
 * @example ./example.md
 */
class DocPreview extends React.PureComponent<any, any> {
  divRef: any;
  constructor(props: any) {
    super(props);
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>): void {
    if (prevProps.file !== this.props.file) {
      this.divRef.innerHTML = '';
      this.init();
      readPreview(this.props.type, this.props.file, this.divRef);
    }
  }

  init = (ref?: any) => {
    if (!this.divRef) {
      this.divRef = ref;
    }
  };

  render() {
    return (
      <div
        className="irs-doc-preview"
        style={{ width: '100%', height: 750 }}
        ref={this.init}
      />
    );
  }
}

export default DocPreview;
