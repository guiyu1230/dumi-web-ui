import React from 'react';
import List from 'antd/es/list';
import Button from 'antd/es/button';

export default class Index extends React.Component<any, any> {
  state={
      list: []
  }
  
  handerClick=()=> {
      this.sliceTime(new Array(1000).fill(''), 0)
  }

  renderItem = (item: any, index: number) => {
    return <List.Item key={index}>{index + 1 + 'item'}</List.Item>
  }
  
  sliceTime=(list: any[], times: number) => {
      if(times === 20) return
      const newList: any = list.slice(times, (times + 1) * 100) /* 每次截取100个 */
      this.setState({
          list: this.state.list.concat(newList)
      })
      window.requestAnimationFrame(() => {
        this.sliceTime(list, times + 1)
      })
  }
  
  render(){
      const { list } = this.state
      return <div>
          <Button onClick={ this.handerClick }>点击</Button>
          <div style={{maxHeight: 300, overflow: 'auto', marginTop: 10}}>
            <List
                bordered={true}
                dataSource={list}
                renderItem={this.renderItem}
            />
          </div>
      </div>
  }
}

