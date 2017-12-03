let oldDOM = [{id: "li1", name: '大毛'}, {id: "li2", name: '二毛'}, {id: "li3", name: '三胖'}];
/**
 * ul
 *  li id=1 大毛
 *  li id=2 二毛
 *  li id=3 三胖
 */
let newDOM = [{id: "li1", name: '大毛'},  {id: "li3", name: '三胖'},{id:"li4",name:'四舅'}];
//算出一个补丁包 domPatch
let patches = [];
for(let i=0;i<oldDOM.length;i++){
  let index = newDOM.findIndex(item=>item.id==oldDOM[i].id);
  if(index==-1)
    patches.push({type:'delete',id:oldDOM[i].id,name:oldDOM[i].name});
}
for(let i=0;i<newDOM.length;i++){
  let index = oldDOM.findIndex(item=>item.id==newDOM[i].id);
  if(index==-1)
    patches.push({type:'new',id:newDOM[i].id,name:newDOM[i].name});
}
console.log(patches);

let ul = document.querySelector('ul');
for(let i=0;i<patches.length;i++){
  if(patches[i].type == 'delete'){
    ul.removeChild(ul.querySelector(`#${patches[i].id}`))
  }else if(patches[i].type == 'new'){
    let newLi = document.createElement('li');
    newLi.id = patches[i].id;
    newLi.innerHTML = patches[i].name;
    ul.appendChild(newLi);
  }
}
