(this["webpackJsonprna-tool"]=this["webpackJsonprna-tool"]||[]).push([[0],{12:function(t,e,n){},14:function(t,e,n){"use strict";n.r(e);var a,r,c,i,o,l,s,u=n(1),b=n.n(u),j=n(6),d=n.n(j),h=(n(12),n(4)),f=n(2),p=n(7),g=n.n(p),m=n(3),O=n(0),x=["\u6642\u9593\u6233\u8a18","\u7a31\u547c","\u96fb\u5b50\u90f5\u4ef6\u5730\u5740","\u4e0a\u8ab2\u65b9\u6848"],v=[],C={"\u4e0a\u8ab2\u65b9\u6848":function(t){return"\u65b0\u751f\u9ad4\u9a57"!==t?"":t},"\u8ab2\u7a0b\u9078\u64c7":function(t){return console.log(t,t.split(", "),t.split(",").map((function(t){return"".concat(t,"\n")})).join("")),t.split(", ").map((function(t){return"".concat(t,"\n")})).join("")}},k={root:Object(m.a)(a||(a=Object(f.a)(["\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n  "]))),topBar:Object(m.a)(r||(r=Object(f.a)(["\n    width: 100%;\n    height: 64px;\n    padding: 12px 24px;\n    box-shadow: 0px -10px 20px 0px #000;\n  "]))),content:Object(m.a)(c||(c=Object(f.a)(["\n    width: 100%;\n    flex: 1 0 64px;\n    overflow-x: hidden;\n    overflow-y: auto;\n    padding: 12px 24px;\n  "]))),marginRight:Object(m.a)(i||(i=Object(f.a)(["\n    margin-right: 8px;\n  "]))),table:Object(m.a)(o||(o=Object(f.a)(["\n    width: 100%;\n  "]))),tableHeaderCell:Object(m.a)(l||(l=Object(f.a)(["\n    border-bottom: 1px solid black;\n  "]))),tableDataCell:Object(m.a)(s||(s=Object(f.a)(["\n    vertical-align: top;\n    white-space: pre-line;\n    border-bottom: 1px solid black;\n  "])))};var w=function(){var t=b.a.useState([]),e=Object(h.a)(t,2),n=e[0],a=e[1],r=b.a.useState(""),c=Object(h.a)(r,2),i=c[0],o=c[1],l=b.a.useState(""),s=Object(h.a)(l,2),u=s[0],j=s[1],d=b.a.useState(!1),f=Object(h.a)(d,2),p=f[0],m=f[1],w=b.a.useCallback((function(t){console.log("[DEBUG]",t.data),a(t.data)}),[]),y=b.a.useCallback((function(t){var e,n=null===(e=t.target.files)||void 0===e?void 0:e[0];n&&g.a.parse(n,{complete:w,header:!0})}),[w]),N=b.a.useCallback((function(t){o(t.target.value),j("")}),[]),S=b.a.useCallback((function(t){j(t.target.value),o("")}),[]),R=b.a.useCallback((function(t){m((function(t){return!t}))}),[]),B=b.a.useMemo((function(){var t=new Set;return n.forEach((function(e){Object.keys(e).filter((function(t){return"\u8ab2\u7a0b\u9078\u64c7"!==t&&t.startsWith("\u8ab2\u7a0b")})).map((function(n){return t.add(e[n])}))})),t}),[n]),D=b.a.useMemo((function(){var t=Object.keys(n[0]||{}).filter((function(t){return x.some((function(e){return t.startsWith(e)}))&&v.every((function(e){return!t.startsWith(e)}))}));return""!==u&&t.push("\u8ab2\u7a0b\u9078\u64c7"),t}),[n,u]),E=b.a.useMemo((function(){var t=n.filter((function(t){return""===i||Object.values(t).some((function(t){return t===i}))})).filter((function(t){return t["\u53d6\u6d88\u8ab2\u7a0b\u7de8\u865f"].split(",").filter((function(t){return""!==t})).every((function(e){return t[e]!==i}))})).filter((function(t){return""===u||t["\u96fb\u5b50\u90f5\u4ef6\u5730\u5740"]===u}));if(p){var e=new Set;t.reverse();for(var a=0;a<t.length;++a)e.has(t[a]["\u96fb\u5b50\u90f5\u4ef6\u5730\u5740"])?t[a]={}:e.add(t[a]["\u96fb\u5b50\u90f5\u4ef6\u5730\u5740"]);(t=t.filter((function(t){return 0!==Object.keys(t).length}))).reverse()}return t}),[n,i,u,p]),F=Object(O.jsx)("tr",{children:D.map((function(t,e){return Object(O.jsx)("td",{className:k.tableHeaderCell,children:t},e.toString())}))}),M=E.map((function(t,e){return Object(O.jsx)("tr",{children:D.map((function(e,n){return Object(O.jsx)("td",{className:k.tableDataCell,children:C[e]?C[e](t[e]):t[e]},n.toString())}))},e.toString())})),T=b.a.useCallback((function(t){navigator.clipboard.writeText(E.map((function(t){return t["\u96fb\u5b50\u90f5\u4ef6\u5730\u5740"]})).join())}),[E]);return Object(O.jsxs)("div",{className:k.root,children:[Object(O.jsxs)("div",{className:k.topBar,children:[Object(O.jsx)("input",{className:k.marginRight,type:"file",name:"file",onChange:y}),Object(O.jsx)("select",{className:k.marginRight,value:i,onChange:N,children:Array.from(B).sort().map((function(t,e){return Object(O.jsx)("option",{children:t},e.toString())}))}),Object(O.jsxs)("span",{className:k.marginRight,children:[M.length,"\u4eba"]}),Object(O.jsx)("button",{className:k.marginRight,onClick:T,children:"Copy Emails"}),Object(O.jsx)("input",{className:k.marginRight,placeholder:"\u641c\u5c0bemail",value:u,onChange:S}),Object(O.jsxs)("label",{className:k.marginRight,children:["\u6d88\u9664\u91cd\u8907",Object(O.jsx)("input",{type:"checkbox",checked:p,onChange:R})]})]}),Object(O.jsx)("div",{className:k.content,children:Object(O.jsxs)("table",{className:k.table,children:[Object(O.jsx)("thead",{children:F}),Object(O.jsx)("tbody",{children:M})]})})]})},y=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),c(t),i(t)}))};d.a.render(Object(O.jsx)(b.a.StrictMode,{children:Object(O.jsx)(w,{})}),document.getElementById("root")),y()}},[[14,1,2]]]);
//# sourceMappingURL=main.78d4bab5.chunk.js.map