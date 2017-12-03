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
  id:'div1',//props是属性对象
  children:[//子元素,可能是null,也可能是React对象，也可能是数组
    {type:'span',props:{children:'hello'}},
    {type:'span',props:{children:'world'}},
  ]
}}
function render(element,container){
   //创建一个对应元还给的DOM对象
   let parent = document.createElement(element.type);
   //循环所有的属性对象的所有属性
   for(let attr in element.props){
     if(attr == 'children'){//如果是子元素的特殊处理
       //如果子元素是一个字符串
        if(typeof element.props.children == 'string'){
          let textNode = document.createTextNode(element.props.children);//则创建文件节点关追加到节点上
          parent.appendChild(textNode);
         //如果子元素们是一个数组，则依次把这些子元素变成真实DOM元素并添加到自己身上
        }else if(typeof element.props.children=='object' && element.props.children instanceof Array){
          element.props.children.forEach(item=>render(item,parent));
        }else if(typeof element.props.children=='object'){
          render(element.props.children,parent);
        }
     }else{
       //设置其它属性
       parent.setAttribute(attr,element.props[attr]);
     }
   }
   container.appendChild(parent);
}
render(ele,document.querySelector('#root'));
