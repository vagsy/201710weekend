import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 组件 一个复杂页面可以分割成若干个小组件
 * 1.组件的名字首字母要大写
 * 2.每个组件都要有一个render方法,用来返回一个React元素，此元素定义组件的样式
 * 3.一个组件可以定义自己的状态，状态其实是一个私有的属性 state
 * 4.render方法的返回值只能有一个顶级元素
 * 5.事件的处理函数必须写成箭头函数，否则 里面的this =null
 **/
class Hello extends React.Component{
  constructor(){
    super();
    //定义一个状态对象
    this.state = {happy:true};
  }
  //如果想修改组件的状态，不能直接给this.state赋值，必须用setState
  //调用setState之后会立刻重新渲染
  handleClick = ()=>{
    this.setState({happy:!this.state.happy});
  }
  render(){
    let happy = this.state.happy?'开心':'伤心';
    return (
      <div>
        <p>{happy}</p>
        <button onClick={this.handleClick}>变心</button>
      </div>
    )
  }
}
//自定义组件和React元素用法是一样的，通过首字母是否是大写来判断是元素还是组件
ReactDOM.render(<Hello/>,document.querySelector('#root'));
/*
function render(component,container){
  //创建组件类的实例
  let h = new Hello();
  let ele = h.render();
  ReactDOM.render(ele,container);
}*/
