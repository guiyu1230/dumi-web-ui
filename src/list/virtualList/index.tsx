import React from 'react';
import List from 'antd/es/list';

class VertualList extends React.PureComponent<any, any> {
    state = {
        list: new Array(100000).fill('').map((str, num) => num + 1),
        scrollBoxHeight: 500, // 容器高度(初始化高度)
        renderList: [], // 渲染列表
        itemHeight: 47, // 每一列高度
        bufferCount: 8, // 缓冲个数, 上下4个
        renderCount: 0, // 渲染数量
        start: 0,       // 起始索引
        end: 0,         // 终止索引
    }
    listBox: any = React.createRef();
    scrollBox: any = React.createRef();
    scrollContent: any = React.createRef();

    componentDidMount() {
        const { itemHeight, bufferCount } = this.state;
        // 计算容器高度
        const scrollBoxHeight = this.listBox.current.offsetHeight;
        const renderCount = Math.ceil(scrollBoxHeight / itemHeight) + bufferCount;
        const end = renderCount + 1;
        this.setState({
            scrollBoxHeight,
            renderCount,
            end
        })
    }

    handleScroll = () => {
        const { scrollTop } :any =  this.scrollBox.current;
        const { itemHeight, renderCount } = this.state;
        const currentOffset = scrollTop - (scrollTop % itemHeight);
        // translate3d 开启css gpu加速
        this.scrollContent.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
        const start = Math.floor(scrollTop / itemHeight);
        const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
        this.setState({
            start,
            end
        })
    }

    // /* 性能优化：只有在列表start 和 end 改变的时候在渲染列表 */
    // shouldComponentUpdate(_nextProps: any, _nextState: any){
    //     const { start , end } = _nextState
    //     return start !== this.state.start || end !==this.state.end 
    // }

    render() {
        const { list, scrollBoxHeight, itemHeight, start, end } = this.state;
        const renderList = list.slice(start, end);
        return (
            <div className='list-box' ref={this.listBox}>
                <div 
                    style={{height: scrollBoxHeight, overflow: 'auto', position: 'relative'}}
                    ref={this.scrollBox}
                    onScroll={this.handleScroll}
                >
                    { /** 占位作用 */ }
                    <div style={{height: `${list.length * itemHeight}px`, position: 'absolute', left: 0, top: 0, right: 0}} />
                    { /** 显示区 */ }
                    <div ref={this.scrollContent}>
                        <List>
                        {
                            renderList.map((item, index) => (
                                <List.Item className='list' style={{height: itemHeight}} key={index}>
                                    {item + ''} Item
                                </List.Item>
                            ))
                        }
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

export default VertualList;