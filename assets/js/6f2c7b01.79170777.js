"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[496],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return u}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),m=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=m(e.components);return a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=m(n),u=r,g=c["".concat(p,".").concat(u)]||c[u]||s[u]||i;return n?a.createElement(g,o(o({ref:t},d),{},{components:n})):a.createElement(g,o({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var m=2;m<i;m++)o[m]=n[m];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5679:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return m},toc:function(){return d},default:function(){return c}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:6},p="Component",m={unversionedId:"component",id:"component",title:"Component",description:"Remix-Image now has two Image components: Image and BaseImage.",source:"@site/docs/component.md",sourceDirName:".",slug:"/component",permalink:"/docs/component",editUrl:"https://github.com/Josh-McFarlin/remix-image/tree/master/docs/templates/shared/docs/component.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Loader",permalink:"/docs/loader"},next:{title:"Hook",permalink:"/docs/hook"}},d=[{value:"Optimized Component: <code>Image</code>",id:"optimized-component-image",children:[],level:2},{value:"PropTypes",id:"proptypes",children:[{value:"ClientLoader Options",id:"clientloader-options",children:[],level:3}],level:2},{value:"Unoptimized Component: <code>BaseImage</code>",id:"unoptimized-component-baseimage",children:[],level:2},{value:"PropTypes",id:"proptypes-1",children:[{value:"ClientLoader Options",id:"clientloader-options-1",children:[],level:3}],level:2},{value:"Other Types",id:"other-types",children:[{value:"OnLoadingComplete",id:"onloadingcomplete",children:[],level:3},{value:"TransformOptions",id:"transformoptions",children:[],level:3}],level:2}],s={toc:d};function c(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"component"},"Component"),(0,i.kt)("p",null,"Remix-Image now has two Image components: ",(0,i.kt)("inlineCode",{parentName:"p"},"Image")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"BaseImage"),"."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Note"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"BaseImage")," is the same component as ",(0,i.kt)("inlineCode",{parentName:"p"},"Image")," in Remix-Image before v1.2.0.\nIf you have encountered issues with the ",(0,i.kt)("inlineCode",{parentName:"p"},"Image")," component after updating Remix-Image to v1.2.0 or later, try the ",(0,i.kt)("inlineCode",{parentName:"p"},"BaseImage")," component."),(0,i.kt)("h2",{id:"optimized-component-image"},"Optimized Component: ",(0,i.kt)("inlineCode",{parentName:"h2"},"Image")),(0,i.kt)("p",null,"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"Image")," element if you would like to use the performance optimizations built into Remix-Image:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Placeholder images before the full-size image loads"),(0,i.kt)("li",{parentName:"ul"},"Predict image size before loading to prevent layout shift"),(0,i.kt)("li",{parentName:"ul"},"Blur-in animation")),(0,i.kt)("p",null,"Import the ",(0,i.kt)("inlineCode",{parentName:"p"},"Image")," component and specify the url to the resource route used by the ",(0,i.kt)("inlineCode",{parentName:"p"},"imageLoader")," function."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript",metastring:"jsx",jsx:!0},'import { Image, remixImageLoader } from "remix-image";\n\n<Image\n  loaderUrl="/api/image"\n  loader={remixImageLoader}\n  src="..."\n  width="..."\n  height="..."\n  alt="..."\n  responsive={[\n    {\n      size: {\n        width: 100,\n        height: 100,\n      },\n      maxWidth: 200,\n    },\n  ]}\n/>\n')),(0,i.kt)("h2",{id:"proptypes"},"PropTypes"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"loaderUrl"),(0,i.kt)("td",{parentName:"tr",align:"center"},"string"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Yes when using ",(0,i.kt)("inlineCode",{parentName:"td"},"cloudinaryLoader")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"imgixLoader")," for ",(0,i.kt)("inlineCode",{parentName:"td"},"loader")," prop"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},'"/api/image"')),(0,i.kt)("td",{parentName:"tr",align:"center"},"The path of the image loader resource route. The ",(0,i.kt)("inlineCode",{parentName:"td"},"loaderUrl")," prop is optional if the resource route has been created at the path ",(0,i.kt)("inlineCode",{parentName:"td"},'"/api/image"'),".")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"loader"),(0,i.kt)("td",{parentName:"tr",align:"center"},"ClientLoader"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"remixImageLoader")),(0,i.kt)("td",{parentName:"tr",align:"center"},"The ClientLoader to use for generating the transformed image.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"responsive"),(0,i.kt)("td",{parentName:"tr",align:"center"},"{ size: { width: number; height: number; }; maxWidth?: number; }[]"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"[]")),(0,i.kt)("td",{parentName:"tr",align:"center"},"An array of responsive sizes. The resource route is not called if this prop is not provided.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"options"),(0,i.kt)("td",{parentName:"tr",align:"center"},"TransformOptions"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"{}")),(0,i.kt)("td",{parentName:"tr",align:"center"},"TransformOptions that can be used to override the defaults provided to the loader.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"dprVariants"),(0,i.kt)("td",{parentName:"tr",align:"center"},"number or number[]"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"[1]")),(0,i.kt)("td",{parentName:"tr",align:"center"},"Different DPR variants to generate images for. This value will always be merged into an array with value ","[1]",".")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"unoptimized"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"false")),(0,i.kt)("td",{parentName:"tr",align:"center"},"Set this prop to ",(0,i.kt)("inlineCode",{parentName:"td"},"true")," to disable all image optimizations, which is equivalent to using the ",(0,i.kt)("inlineCode",{parentName:"td"},"BaseImage")," component.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"placeholder"),(0,i.kt)("td",{parentName:"tr",align:"center"},'"blur" or "empty"'),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},'"empty"')),(0,i.kt)("td",{parentName:"tr",align:"center"},"The type of placeholder to show before the image has loaded. ",(0,i.kt)("inlineCode",{parentName:"td"},'"blur"')," displays a scaled and blurred 15px image, while ",(0,i.kt)("inlineCode",{parentName:"td"},'"empty"')," shows nothing.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"blurDataURL"),(0,i.kt)("td",{parentName:"tr",align:"center"},"string or null"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"null")),(0,i.kt)("td",{parentName:"tr",align:"center"},"The small image to show when ",(0,i.kt)("inlineCode",{parentName:"td"},"placeholder")," is ",(0,i.kt)("inlineCode",{parentName:"td"},'"blur"'),", which can be a URL or Base64 image. If this prop is not set or set to ",(0,i.kt)("inlineCode",{parentName:"td"},"null")," it will automatically generate a small image using the image loader.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"placeholderAspectRatio"),(0,i.kt)("td",{parentName:"tr",align:"center"},"number or null"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"null")),(0,i.kt)("td",{parentName:"tr",align:"center"},"The aspect ratio to use for the placeholder before the full size image loads. If ",(0,i.kt)("inlineCode",{parentName:"td"},"null"),", Remix-Image will try to predict this value using the ",(0,i.kt)("inlineCode",{parentName:"td"},"responsive")," prop.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"onLoadingComplete"),(0,i.kt)("td",{parentName:"tr",align:"center"},"OnLoadingComplete or null"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"null")),(0,i.kt)("td",{parentName:"tr",align:"center"},"A callback function that receives the dimensions of the full-sized image once it has loaded.")))),(0,i.kt)("h3",{id:"clientloader-options"},"ClientLoader Options"),(0,i.kt)("p",null,"By default, ",(0,i.kt)("inlineCode",{parentName:"p"},"remixImageLoader")," is used. If you would like to use an external ClientLoader, please refer to the ",(0,i.kt)("a",{parentName:"p",href:"/docs/client-loader"},"ClientLoader documentation"),"."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Note"),": The ",(0,i.kt)("inlineCode",{parentName:"p"},"Image")," component extends the native ",(0,i.kt)("inlineCode",{parentName:"p"},"img")," element, so any props used with ",(0,i.kt)("inlineCode",{parentName:"p"},"img")," can be provided to the ",(0,i.kt)("inlineCode",{parentName:"p"},"Image")," component."),(0,i.kt)("h2",{id:"unoptimized-component-baseimage"},"Unoptimized Component: ",(0,i.kt)("inlineCode",{parentName:"h2"},"BaseImage")),(0,i.kt)("p",null,"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"BaseImage")," if you prefer to use a raw ",(0,i.kt)("inlineCode",{parentName:"p"},"img")," element without any performance optimizations."),(0,i.kt)("p",null,"Import the ",(0,i.kt)("inlineCode",{parentName:"p"},"BaseImage")," component and specify the url to the resource route used by the ",(0,i.kt)("inlineCode",{parentName:"p"},"imageLoader")," function."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript",metastring:"jsx",jsx:!0},'import { BaseImage } from "remix-image";\n\n<BaseImage\n  loaderUrl="/api/image"\n  src="..."\n  width="..."\n  height="..."\n  alt="..."\n  responsive={[\n    {\n      size: {\n        width: 100,\n        height: 100,\n      },\n      maxWidth: 200,\n    },\n  ]}\n/>\n')),(0,i.kt)("h2",{id:"proptypes-1"},"PropTypes"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"loaderUrl"),(0,i.kt)("td",{parentName:"tr",align:"center"},"string"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Yes when using ",(0,i.kt)("inlineCode",{parentName:"td"},"cloudinaryLoader")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"imgixLoader")," for ",(0,i.kt)("inlineCode",{parentName:"td"},"loader")," prop"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},'"/api/image"')),(0,i.kt)("td",{parentName:"tr",align:"center"},"The path of the image loader resource route. The ",(0,i.kt)("inlineCode",{parentName:"td"},"loaderUrl")," prop is optional if the resource route has been created at the path ",(0,i.kt)("inlineCode",{parentName:"td"},'"/api/image"'),".")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"loader"),(0,i.kt)("td",{parentName:"tr",align:"center"},"ClientLoader"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"remixImageLoader")),(0,i.kt)("td",{parentName:"tr",align:"center"},"The ClientLoader to use for generating the transformed image.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"responsive"),(0,i.kt)("td",{parentName:"tr",align:"center"},"{ size: { width: number; height: number; }; maxWidth?: number; }[]"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"[]")),(0,i.kt)("td",{parentName:"tr",align:"center"},"An array of responsive sizes. The resource route is not called if this prop is not provided.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"options"),(0,i.kt)("td",{parentName:"tr",align:"center"},"TransformOptions"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"{}")),(0,i.kt)("td",{parentName:"tr",align:"center"},"TransformOptions that can be used to override the defaults provided to the loader.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"dprVariants"),(0,i.kt)("td",{parentName:"tr",align:"center"},"number or number[]"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"[1]")),(0,i.kt)("td",{parentName:"tr",align:"center"},"Different DPR variants to generate images for. This value will always be merged into an array with value ","[1]",".")))),(0,i.kt)("h3",{id:"clientloader-options-1"},"ClientLoader Options"),(0,i.kt)("p",null,"By default, ",(0,i.kt)("inlineCode",{parentName:"p"},"remixImageLoader")," is used. If you would like to use an external ClientLoader, please refer to the ",(0,i.kt)("a",{parentName:"p",href:"/docs/client-loader"},"ClientLoader documentation"),"."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Note"),": The ",(0,i.kt)("inlineCode",{parentName:"p"},"BaseImage")," component extends the native ",(0,i.kt)("inlineCode",{parentName:"p"},"img")," element, so any props used with ",(0,i.kt)("inlineCode",{parentName:"p"},"img")," can be provided to the ",(0,i.kt)("inlineCode",{parentName:"p"},"BaseImage")," component."),(0,i.kt)("h2",{id:"other-types"},"Other Types"),(0,i.kt)("h3",{id:"onloadingcomplete"},"OnLoadingComplete"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export type OnLoadingComplete = (result: {\n  naturalWidth: number;\n  naturalHeight: number;\n}) => void;\n")),(0,i.kt)("h3",{id:"transformoptions"},"TransformOptions"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface TransformOptions {\n  /** Width of resulting image. */\n  width: number;\n  /** Height of resulting image. If width is present, this take priority. */\n  height?: number;\n  /** The content type of the resulting image. (optional, default source type) */\n  contentType?: MimeType;\n  /** How the image should be resized to fit both provided dimensions. (optional, default 'contain') */\n  fit?: ImageFit;\n  /** Position to use when fit is cover or contain. (optional, default 'center') */\n  position?: ImagePosition | string | number;\n  /** Background color of resulting image. (optional, default [0x00, 0x00, 0x00, 0x00]) */\n  background?: Color;\n  /** Quality, integer 1-100. (optional, default 80) */\n  quality?: number;\n  /** zlib compression level, 0-9. (optional, default 9) */\n  compressionLevel?: number;\n  /** Number of animation iterations, use 0 for infinite animation. (optional, default 0) */\n  loop?: number;\n  /** Delay between animation frames (in milliseconds). (optional, default 100) */\n  delay?: number;\n  /** The number of pixels to blur the image by. (optional, default null) */\n  blurRadius?: number | null;\n  /** The number of degrees to rotate the image by. (optional, default null) */\n  rotate?: number | null;\n  /** The direction to mirror the image by. (optional, default null) */\n  flip?: FlipDirection | null;\n  /** The location to crop the source image before any other operations are applied. (optional, default null) */\n  crop?: CropOptions | null;\n}\n")))}c.isMDXComponent=!0}}]);