"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[931],{3905:function(e,r,t){t.d(r,{Zo:function(){return p},kt:function(){return f}});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=n.createContext({}),c=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},p=function(e){var r=c(e.components);return n.createElement(l.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(t),f=o,d=m["".concat(l,".").concat(f)]||m[f]||u[f]||a;return t?n.createElement(d,i(i({ref:r},p),{},{components:t})):n.createElement(d,i({ref:r},p))}));function f(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=m;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=t[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},9943:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return m}});var n=t(7462),o=t(3366),a=(t(7294),t(3905)),i=["components"],s={sidebar_position:2},l="Creating a Resolver",c={unversionedId:"advanced/creating-a-resolver",id:"advanced/creating-a-resolver",title:"Creating a Resolver",description:"You may want to create a Resolver if you want to retrieve images in a way that is not currently supported by this library.",source:"@site/docs/advanced/creating-a-resolver.md",sourceDirName:"advanced",slug:"/advanced/creating-a-resolver",permalink:"/docs/advanced/creating-a-resolver",editUrl:"https://github.com/Josh-McFarlin/remix-image/tree/master/docs/templates/shared/docs/advanced/creating-a-resolver.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Creating a Cache",permalink:"/docs/advanced/creating-a-cache"},next:{title:"Creating a Transformer",permalink:"/docs/advanced/creating-a-transformer"}},p=[{value:"Instructions",id:"instructions",children:[],level:2},{value:"Examples",id:"examples",children:[],level:2},{value:"Show Off",id:"show-off",children:[],level:2}],u={toc:p};function m(e){var r=e.components,t=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"creating-a-resolver"},"Creating a Resolver"),(0,a.kt)("p",null,"You may want to create a Resolver if you want to ",(0,a.kt)("strong",{parentName:"p"},"retrieve")," images in a way that is not currently supported by this library.\nAn example could be retrieving images stored on an authenticated server that is separate from your app."),(0,a.kt)("h2",{id:"instructions"},"Instructions"),(0,a.kt)("p",null,"To make your own, just make a function that follows the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Josh-McFarlin/remix-image/blob/master/src/types/resolver.ts"},"Resolver format"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export type Resolver = (\n  asset: string,\n  url: string,\n  options: TransformOptions\n) => Promise<{\n  buffer: Uint8Array;\n  contentType: MimeType;\n}>;\n")),(0,a.kt)("p",null,"such as:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { fsResolver, fetchResolver, Resolver } from "remix-image/server";\n\nexport const myResolver: Resolver = async (asset, url, options) => {\n  if (src.startsWith("/") && (src.length === 1 || src[1] !== "/")) {\n    return fsResolver(asset, url, options);\n  } else {\n    return fetchResolver(asset, url, options);\n  }\n};\n')),(0,a.kt)("p",null,"You will then provide this function to the ",(0,a.kt)("inlineCode",{parentName:"p"},"resolver")," field of the loader config"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:"jsx",jsx:!0},'import type { LoaderFunction } from "remix";\nimport { imageLoader } from "remix-image/server";\nimport myResolver from "...";\n\nconst config = {\n  selfUrl: "http://localhost:3000",\n  whitelistedDomains: ["i.imgur.com"],\n  resolver: myResolver,\n};\n\nexport const loader: LoaderFunction = ({ request }) => {\n  return imageLoader(config, request);\n};\n')),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/Josh-McFarlin/remix-image/tree/master/src/server/resolvers/fsResolver"},"fsResolver")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/Josh-McFarlin/remix-image/tree/master/src/server/resolvers/fetchResolver"},"fetchResolver")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/Josh-McFarlin/remix-image/tree/master/src/server/resolvers/kvResolver"},"kvResolver"))),(0,a.kt)("h2",{id:"show-off"},"Show Off"),(0,a.kt)("p",null,"Create something cool that you think others would use? Upload it to GitHub and ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Josh-McFarlin/remix-image/discussions/3"},"show it off on the Remix-Image repo"),"!"))}m.isMDXComponent=!0}}]);