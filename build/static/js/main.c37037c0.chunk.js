(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(0),a=t(1),r=t.n(a),o=t(16),u=t.n(o),i=t(5),s=t(7),l=t(3),j=function(e){return Object(c.jsxs)("div",{children:["filter by name: ",Object(c.jsx)("input",{value:e.newSearch,onChange:e.handleSearchChange})]})},d=function(e){return Object(c.jsxs)("form",{children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{name:"name",value:e.newInfo.name,onChange:e.handleChange})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{name:"number",value:e.newInfo.number,onChange:e.handleChange})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",onClick:e.addName,children:"add"})})]})},h=function(e){return Object(c.jsx)("div",{children:Object(c.jsx)("ul",{children:e.searchResults.map((function(n){return Object(c.jsxs)("li",{children:[n.name," ",n.number,Object(c.jsx)("button",{onClick:function(){return e.deletePerson(n)},children:"Delete"})]},n.name)}))})})},b=t(4),f=t.n(b),m="http://localhost:3001/persons",O=function(){return f.a.get(m).then((function(e){return e.data}))},x=function(e){return f.a.post(m,e).then((function(e){return e.data}))},p=function(e){return f.a.delete("http://localhost:3001/persons/".concat(e))},v=function(e,n){return f.a.put("http://localhost:3001/persons/".concat(e),n).then((function(e){return e.data}))},w=function(e){var n=e.name;return null===n?null:Object(c.jsxs)("div",{className:"confirmation",children:["Added ",Object(c.jsx)("strong",{children:n})]})},g=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],o=Object(a.useState)({name:"",number:""}),u=Object(l.a)(o,2),b=u[0],f=u[1],m=Object(a.useState)(""),g=Object(l.a)(m,2),C=g[0],S=g[1],k=Object(a.useState)([]),y=Object(l.a)(k,2),I=y[0],N=y[1],D=Object(a.useState)(null),E=Object(l.a)(D,2),P=E[0],A=E[1];Object(a.useEffect)((function(){O().then((function(e){return r(e)}))}),[]);return Object(a.useEffect)((function(){var e=t.filter((function(e){return e.name.toLowerCase().includes(C.toLowerCase())}));N(e)}),[C,t]),Object(c.jsxs)("div",{children:[Object(c.jsx)(w,{name:P}),Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(j,{newSearch:C,handleSearchChange:function(e){S(e.target.value)}}),Object(c.jsx)("h2",{children:"Add new"}),Object(c.jsx)(d,{newInfo:b,handleChange:function(e){f(Object(s.a)(Object(s.a)({},b),{},Object(i.a)({},e.target.name,e.target.value)))},addName:function(e){e.preventDefault();var n=t.find((function(e){return e.name===b.name})),c=!1;n&&(c=window.confirm("".concat(b.name," is already in phonebook.  Would you like to replace the info?")));var a={name:b.name,number:b.number};n?c&&v(n.id,a).then((function(e){r(t.map((function(n){return n.name!==a.name?n:e})))})).catch((function(e){alert("".concat(a.name," was already deleted from server")),r(t.filter((function(e){return a.name!==e.name})))})):(x(a).then((function(e){r(t.concat(e))})),A(a.name),setTimeout((function(){A(null)}),5e3)),f({name:"",number:""})}}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)(h,{searchResults:I,deletePerson:function(e){window.confirm("Delete ".concat(e.name))&&p(e.id).then(r(t.filter((function(n){return n.id!==e.id}))))}})]})};t(39);u.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(g,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.c37037c0.chunk.js.map