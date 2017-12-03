import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
/**
 * 1.如何定义和使用复合组件
 * 2.如何跟后台进行数据交互
 *  1. fetch 2. axios 3. jquery ajax 4. XMLHttpRequest
 */
class Search extends React.Component {
  constructor() {
    super();
    //wd 是输入框的值  words是一个空数组
    this.state = {wd: '', words: []};
    window.jsonpCallback = (result) => {
      this.setState({words:result.s});
    }
  }

  handleChange = (event) => {
    let wd = event.target.value;
    let script = document.createElement('script');
    script.src = `http://www.baidu.com/su?wd=${wd}&cb=jsonpCallback`;
    document.body.appendChild(script);
    this.setState({wd});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading">
                <input
                  onChange={this.handleChange}
                  value={this.state.wd}
                  type="text" className="form-control"/>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {
                    this.state.words.map((item, index) => (
                      <li key={index} className="list-group-item">{item}</li>
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