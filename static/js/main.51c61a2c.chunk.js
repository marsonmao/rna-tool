(this["webpackJsonprna-tool"]=this["webpackJsonprna-tool"]||[]).push([[0],{12:function(t,e,n){},14:function(t,e,n){"use strict";n.r(e);var r,c=n(1),i=n.n(c),a=n(4),o=n.n(a),u=(n(12),n(2)),s=n(5),l=n(6),j=n.n(l),f=n(7),b=n(0),d=["\u6642\u9593\u6233\u8a18","\u7a31\u547c","\u96fb\u5b50\u90f5\u4ef6\u5730\u5740"],h=[],O={root:Object(f.a)(r||(r=Object(s.a)(["\n    width: 100%;\n    height: 100%;\n  "])))};var p=function(){var t=i.a.useRef(null),e=i.a.useState(),n=Object(u.a)(e,2),r=n[0],c=n[1],a=i.a.useState([{}]),o=Object(u.a)(a,2),s=o[0],l=o[1],f=i.a.useState(""),p=Object(u.a)(f,2),x=p[0],g=p[1],m=i.a.useCallback((function(t){var e;c(null===(e=t.target.files)||void 0===e?void 0:e[0])}),[]),v=i.a.useCallback((function(t){console.log(t.data),l(t.data)}),[]),C=i.a.useCallback((function(){r&&j.a.parse(r,{complete:v,header:!0})}),[r,v]),k=i.a.useCallback((function(t){g(t.target.value)}),[]),y=new Set;s.forEach((function(t){Object.keys(t).filter((function(t){return"\u8ab2\u7a0b\u9078\u64c7"!==t&&t.startsWith("\u8ab2\u7a0b")})).map((function(e){return y.add(t[e])}))}));var S=Object.keys(s[0]).filter((function(t){return d.some((function(e){return t.startsWith(e)}))&&h.every((function(e){return!t.startsWith(e)}))})),w=Object(b.jsx)("tr",{children:S.map((function(t,e){return Object(b.jsx)("td",{children:t},e.toString())}))}),F=s.filter((function(t){return Object.values(t).some((function(t){return t===x}))})).filter((function(t){return t["\u53d6\u6d88\u8ab2\u7a0b\u7de8\u865f"].split(",").filter((function(t){return""!==t})).every((function(e){return t[e]!==x}))})),E=F.map((function(t,e){return Object(b.jsx)("tr",{children:S.map((function(e){return Object(b.jsx)("td",{children:t[e]})}))},e.toString())})),P=i.a.useCallback((function(t){navigator.clipboard.writeText(F.map((function(t){return t["\u96fb\u5b50\u90f5\u4ef6\u5730\u5740"]})).join())}),[F]);return Object(b.jsxs)("div",{className:O.root,children:[Object(b.jsx)("input",{type:"file",ref:t,name:"file",onChange:m}),Object(b.jsx)("button",{onClick:C,children:"Parse"}),Object(b.jsx)("select",{onChange:k,children:Array.from(y).sort().map((function(t){return Object(b.jsx)("option",{children:t})}))}),Object(b.jsxs)("div",{children:[E.length,"\u4eba"]}),Object(b.jsx)("button",{onClick:P,children:"Copy Emails"}),Object(b.jsxs)("table",{children:[Object(b.jsx)("thead",{children:w}),Object(b.jsx)("tbody",{children:E})]})]})},x=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(e){var n=e.getCLS,r=e.getFID,c=e.getFCP,i=e.getLCP,a=e.getTTFB;n(t),r(t),c(t),i(t),a(t)}))};o.a.render(Object(b.jsx)(i.a.StrictMode,{children:Object(b.jsx)(p,{})}),document.getElementById("root")),x()}},[[14,1,2]]]);
//# sourceMappingURL=main.51c61a2c.chunk.js.map