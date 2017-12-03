import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
/**
 * 组件的属性
 * this.props 就是属性对象=传过来属性合并上默认属性对象
 * 1. 属性是只读的，不能修改,只父组件能修改，父组件可以传入新的属性
 */
class Person extends React.Component{
  //默认属性，如果你不给这个属性，那么会使用此默认值
  static defaultProps = {
   gender:'女'
  }
  //es7 静态属性 类上的属性
  static propTypes={
    //age字段必须传一个数字，不传会报错，传的类型不对也报错
    age:PropTypes.number.isRequired
  }
  render(){
    return (
      <div>
        姓名: {this.props.name}   <br/>
        性别: {this.props.gender} <br/>
        年龄: {this.props.age}    <br/>
      </div>
    )
  }
}
let p = {name:'zfpx',gender:'男'};
ReactDOM.render(<Person {...p}/>,document.querySelector('#root'));