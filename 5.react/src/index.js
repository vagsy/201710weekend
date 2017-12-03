//是一个库，工具箱，是需要我们主动去调的
import React from 'react';
import ReactDOM from 'react-dom';
// javascript+xml混合在一起写，所以需要 babel转译
// <h1>hello</h1> 是一个React元素
//转译后
//<div id="div1"><span>hello</span> <span>world</span></div>
// let ele = React.createElement('div',{id:'div1'},
//   React.createElement('span',null,'hello')
//   ,React.createElement('span',null,'world'));
// console.log(ele);
//这个对象被称为虚拟DOM
let ele = {type:'div',props:{
  id:'div1',
  children:[
    {type:'span',props:{children:'hello'}},
    {type:'span',props:{children:'world'}}
  ]
}}
function render(element,container){
   let parent = document.createElement(element.type);
   for(let attr in element.props){
     if(attr == 'children'){
        if(typeof element.props.children == 'string'){
          let node = document.createTextNode(element.props.children);
          parent.appendChild(node);
        }else if(typeof element.props.children=='object' && element.props.children instanceof Array){
          element.props.children.forEach(item=>render(item,parent));
        }else if(typeof element.props.children=='object'){
          render(element.props.children,parent);
        }
     }else{
       parent.setAttribute(attr,element.props[attr]);
     }
   }
   container.appendChild(parent);
}
render(ele,document.querySelector('#root'));

/*
import React from 'react';
import ReactDOM from 'react-dom';
let names = [{id: 1, name: '大毛'}, {id: 2, name: '大毛'}, {id: 3, name: '三胖'}];
//表达式 放一些JS的变量及其运算,必须要有返回值
//Each child in an array or iterator should have a unique "key" prop.
ReactDOM.render(
  <ul>
    {
      names.map((item, index) => {
        return <li>{item.name}</li>
      })
    }
  </ul>, document.querySelector('#root')
);*/

import './history/2.domdiff'
