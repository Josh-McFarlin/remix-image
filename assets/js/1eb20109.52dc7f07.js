"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[361],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),c=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(r),m=n,f=d["".concat(l,".").concat(m)]||d[m]||u[m]||o;return r?a.createElement(f,i(i({ref:t},p),{},{components:r})):a.createElement(f,i({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1869:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=r(7462),n=(r(7294),r(3905));const o={sidebar_position:3},i="Create Loader",s={unversionedId:"tutorial-basics/create-loader",id:"tutorial-basics/create-loader",title:"Create Loader",description:"Create a new resource route that imports the imageLoader function and exports a function called loader.",source:"@site/docs/tutorial-basics/create-loader.md",sourceDirName:"tutorial-basics",slug:"/tutorial-basics/create-loader",permalink:"/docs/tutorial-basics/create-loader",draft:!1,editUrl:"https://github.com/Josh-McFarlin/remix-image/tree/master/docs/templates/shared/docs/tutorial-basics/create-loader.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Add Styles",permalink:"/docs/tutorial-basics/add-styles"},next:{title:"Use Component",permalink:"/docs/tutorial-basics/use-component"}},l={},c=[{value:"Cloudflare / Platforms Without File-System Access",id:"cloudflare--platforms-without-file-system-access",level:2}],p={toc:c};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"create-loader"},"Create Loader"),(0,n.kt)("p",null,"Create a new resource route that imports the ",(0,n.kt)("inlineCode",{parentName:"p"},"imageLoader")," function and exports a function called ",(0,n.kt)("inlineCode",{parentName:"p"},"loader"),"."),(0,n.kt)("p",null,"To do this, create a new file in ",(0,n.kt)("inlineCode",{parentName:"p"},"app/routes")," such as ",(0,n.kt)("inlineCode",{parentName:"p"},"app/routes/api/image.js"),".\nBy default, the image component uses the route ",(0,n.kt)("inlineCode",{parentName:"p"},'"/api/image"'),", but any route can be used."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript",metastring:"jsx",jsx:!0},'import type { LoaderFunction } from "@remix-run/server-runtime";\nimport { imageLoader, DiskCache } from "remix-image/server";\n\nconst config = {\n  selfUrl: "http://localhost:3000",\n  cache: new DiskCache(),\n};\n\nexport const loader: LoaderFunction = ({ request }) => {\n  return imageLoader(config, request);\n};\n')),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Note:"),"\nBy default, Remix-Image uses ",(0,n.kt)("inlineCode",{parentName:"p"},"pureTransformer"),", which supports image transformations for the following types: ",(0,n.kt)("inlineCode",{parentName:"p"},"JPEG"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"PNG"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"GIF")," (non-animated), ",(0,n.kt)("inlineCode",{parentName:"p"},"BMP"),", and ",(0,n.kt)("inlineCode",{parentName:"p"},"TIFF"),".\nIf you would like to use additional file types, you must use a ",(0,n.kt)("a",{parentName:"p",href:"/docs/loader"},"custom transformer"),"."),(0,n.kt)("h2",{id:"cloudflare--platforms-without-file-system-access"},"Cloudflare / Platforms Without File-System Access"),(0,n.kt)("p",null,"Some platforms like Cloudflare Workers do not support file-systems and Node packages.\nIn this case, several options need to be provided to the loader config, so take a look at ",(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("a",{parentName:"strong",href:"/docs/tutorial-extras/cloudflare"},"these docs")),"."))}u.isMDXComponent=!0}}]);