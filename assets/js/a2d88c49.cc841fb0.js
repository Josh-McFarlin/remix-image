"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[503],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return u}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=s(n),u=a,g=c["".concat(p,".").concat(u)]||c[u]||d[u]||o;return n?r.createElement(g,i(i({ref:t},m),{},{components:n})):r.createElement(g,i({ref:t},m))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3750:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return m},default:function(){return c}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={sidebar_position:7},p="Hook",s={unversionedId:"hook",id:"hook",title:"Hook",description:"Optionally, this library also exports the hook used to generate responsive props for images.",source:"@site/docs/hook.md",sourceDirName:".",slug:"/hook",permalink:"/docs/hook",editUrl:"https://github.com/Josh-McFarlin/remix-image/tree/master/docs/templates/shared/docs/hook.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Component",permalink:"/docs/component"},next:{title:"ClientLoader",permalink:"/docs/client-loader"}},m=[{value:"Parameters",id:"parameters",children:[{value:"ClientLoader Options",id:"clientloader-options",children:[],level:3},{value:"TransformOptions",id:"transformoptions",children:[],level:3}],level:2}],d={toc:m};function c(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"hook"},"Hook"),(0,o.kt)("p",null,"Optionally, this library also exports the hook used to generate responsive props for images.\nIn most use cases you can simply use the ",(0,o.kt)("inlineCode",{parentName:"p"},"Image")," component, but you might need the hook for custom components."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript",metastring:"jsx",jsx:!0},'import { useResponsiveImage, remixImageLoader } from "remix-image";\n\nconst Image: React.FC<ImageProps> = ({\n  className,\n  loaderUrl = "/api/image",\n  responsive = [],\n  ...imgProps\n}) => {\n  const responsiveProps = useResponsiveImage(imgProps, responsive, [1], loaderUrl, remixImageLoader);\n\n  return (\n    <img\n      className={clsx(classes.root, className)}\n      {...imgProps}\n      {...responsiveProps}\n    />\n  );\n};\n')),(0,o.kt)("h2",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,o.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,o.kt)("th",{parentName:"tr",align:"center"},"Default"),(0,o.kt)("th",{parentName:"tr",align:"center"},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"imgProps"),(0,o.kt)("td",{parentName:"tr",align:"center"},"{ src: string }"),(0,o.kt)("td",{parentName:"tr",align:"center"},"Yes"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},"The props to be passed to the base img element.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"responsive"),(0,o.kt)("td",{parentName:"tr",align:"center"},"{ size: { width: number; height: number; }; maxWidth?: number; }[]"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"[]")),(0,o.kt)("td",{parentName:"tr",align:"center"},"An array of responsive sizes.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"options"),(0,o.kt)("td",{parentName:"tr",align:"center"},"TransformOptions"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},"TransformOptions that can be used to override the defaults provided to the loader.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"dprVariants"),(0,o.kt)("td",{parentName:"tr",align:"center"},"number or number[]"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"[1]")),(0,o.kt)("td",{parentName:"tr",align:"center"},"Different DPR variants to generate images for. This value will always be merged into an array with value ","[1]",".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"loaderUrl"),(0,o.kt)("td",{parentName:"tr",align:"center"},"string"),(0,o.kt)("td",{parentName:"tr",align:"center"},"Yes when using ",(0,o.kt)("inlineCode",{parentName:"td"},"cloudinaryLoader")," or ",(0,o.kt)("inlineCode",{parentName:"td"},"imgixLoader")," for ",(0,o.kt)("inlineCode",{parentName:"td"},"loader")," parameter"),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},'"/api/image"')),(0,o.kt)("td",{parentName:"tr",align:"center"},"The path of the image loader resource route.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"loader"),(0,o.kt)("td",{parentName:"tr",align:"center"},"ClientLoader"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"remixImageLoader")),(0,o.kt)("td",{parentName:"tr",align:"center"},"The ClientLoader to use for generating the transformed image.")))),(0,o.kt)("h3",{id:"clientloader-options"},"ClientLoader Options"),(0,o.kt)("p",null,"By default, ",(0,o.kt)("inlineCode",{parentName:"p"},"remixImageLoader")," is used. If you would like to use an external ClientLoader, please refer to the ",(0,o.kt)("a",{parentName:"p",href:"/docs/client-loader"},"ClientLoader documentation"),". "),(0,o.kt)("h3",{id:"transformoptions"},"TransformOptions"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface TransformOptions {\n  /** Width of resulting image. */\n  width: number;\n  /** Height of resulting image. If width is present, this take priority. */\n  height?: number;\n  /** The content type of the resulting image. (optional, default source type) */\n  contentType?: MimeType;\n  /** How the image should be resized to fit both provided dimensions. (optional, default 'contain') */\n  fit?: ImageFit;\n  /** Position to use when fit is cover or contain. (optional, default 'center') */\n  position?: ImagePosition | string | number;\n  /** Background color of resulting image. (optional, default [0x00, 0x00, 0x00, 0x00]) */\n  background?: Color;\n  /** Quality, integer 1-100. (optional, default 80) */\n  quality?: number;\n  /** zlib compression level, 0-9. (optional, default 9) */\n  compressionLevel?: number;\n  /** Number of animation iterations, use 0 for infinite animation. (optional, default 0) */\n  loop?: number;\n  /** Delay between animation frames (in milliseconds). (optional, default 100) */\n  delay?: number;\n  /** The number of pixels to blur the image by. (optional, default null) */\n  blurRadius?: number | null;\n  /** The number of degrees to rotate the image by. (optional, default null) */\n  rotate?: number | null;\n  /** The direction to mirror the image by. (optional, default null) */\n  flip?: FlipDirection | null;\n  /** The location to crop the source image before any other operations are applied. (optional, default null) */\n  crop?: CropOptions | null;\n}\n")))}c.isMDXComponent=!0}}]);