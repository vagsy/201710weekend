import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
/**
 * 1.如何定义和使用复合组件
 * 2.如何跟后台进行数据交互
 *  1. fetch 2. axios 3. jquery ajax 4. XMLHttpRequest
 */
class Search extends React.Component {
  constructor() {
    super();
    //wd 是输入框的值  words是一个空数组
    this.state = {words: [],index:-1};
    this.wd = '';
  }

  handleChange = (event) => {
    let wd = event.target.value;
    /**
     * 1.success成功回调函数
     * 2.then
     * 3.done
     * https://www.baidu.com/su?cb=jQuery32105310044693736287_1512287350132&wd=a&_=1512287350133
     */
    this.wd = wd;
      $.ajax({
        type:'GET',
        url:`http://www.baidu.com/su`,
        dataType:'jsonp',//指定响应体的内容类型
        //http://www.baidu.com/su?cb=xxx
        jsonp:'cb',//指定在后台接收回调方法名的参数名
        data:{wd},//传递数据
        success:(result)=>{
          this.setState({words:result.s});
        }
      })
  }
  handleKeyDown = (event)=>{
     let keyCode = event.keyCode;
     if(keyCode == 40 || keyCode == 38){
       let index = this.state.index;
       if(keyCode == 40){//向下
          if(++index>=this.state.words.length){
            index = -1;
          }
       }else if(keyCode = 38){//向上
          if(--index==-2){
            index=this.state.words.length-1;
          }
       }
       this.setState({index});
     }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading">
                <input
                  onKeyDown={this.handleKeyDown}
                  onChange={this.handleChange}
                  value={this.state.index == -1?this.wd:this.state.words[this.state.index]}
                  type="text" className="form-control"/>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {
                    this.state.words.map((item, index) => (
                      <li key={index} className={"list-group-item "+(index==this.state.index?"active":"")}>{item}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Search/>, document.querySelector('#root'));
//A component is changing a controlled input of type text to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa).
//一个组件正在从一个受控组件变成一个非受控组件，输入元素不应该从受控组件切换到非受控组件
// 因为value等于了undefined