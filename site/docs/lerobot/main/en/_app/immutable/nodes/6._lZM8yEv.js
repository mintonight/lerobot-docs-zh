import"../chunks/DsnmJJEf.js";import{i as M,h as R,C as H,H as n,D as a,E as O}from"../chunks/B0fLWDn-.js";import{p as z,o as G,s as e,f as I,a as y,b as K,c as r,d as E,n as t,r as o}from"../chunks/CK-oPab5.js";import{s as U}from"../chunks/C_Vwy0jz.js";const V='{"title":"相机","local":"相机","sections":[{"title":"Camera","local":"lerobot.cameras.Camera","sections":[],"depth":2},{"title":"CameraConfig","local":"lerobot.cameras.CameraConfig","sections":[],"depth":2},{"title":"make_cameras_from_configs","local":"lerobot.cameras.make_cameras_from_configs","sections":[],"depth":2}],"depth":1}';var j=E('<meta name="hf:doc:metadata"/>'),q=E(`<p></p> <!> <!> <p>相机提供 policy 所看到的图像 observation。每个后端——OpenCV、Intel RealSense、Reachy 2——都
实现了 <code>Camera</code> 接口，因此更换硬件不会改变读取帧的代码。</p> <p>有关选择与配置相机的说明，请参阅 <a href="../cameras">相机指南</a>、
以及针对核心集合之外设备的<a href="../third_party_sensors">第三方相机与传感器</a>。</p> <!> <div class="docstring border-l-2 border-t-2 pl-4 pt-3.5 border-gray-100 rounded-tl-xl mb-6 mt-8"><!> <p>相机实现的基类。</p> <p>为不同后端的相机操作定义标准接口。
子类必须实现所有抽象方法。</p> <p>管理相机的基本属性（FPS、分辨率）和核心操作：</p> <ul><li>连接/断开连接</li> <li>帧捕获（同步/异步/最新）</li></ul> <div class="docstring border-l-2 border-t-2 pl-4 pt-3.5 border-gray-100 rounded-tl-xl mb-6 mt-8"><!> <p>建立与相机的连接。</p></div> <div class="docstring border-l-2 border-t-2 pl-4 pt-3.5 border-gray-100 rounded-tl-xl mb-6 mt-8"><!> <p>断开与相机的连接并释放资源。</p></div> <div class="docstring border-l-2 border-t-2 pl-4 pt-3.5 border-gray-100 rounded-tl-xl mb-6 mt-8"><!> <p>同步捕获并返回来自相机的单帧。</p> <p>这是一个阻塞调用，会等待硬件及其 SDK。</p></div> <div class="docstring border-l-2 border-t-2 pl-4 pt-3.5 border-gray-100 rounded-tl-xl mb-6 mt-8"><!> <p>返回最新的新帧。</p> <p>此方法获取后台线程捕获的最新帧。
如果缓冲区中已有新帧可用（自上次调用以来捕获的），
它会立即返回。</p> <p>仅当缓冲区为空或最新帧
已被上一次 <code>async_read</code> 调用消耗时，它才会阻塞至多 <code>timeout_ms</code>。</p> <p>本质上，此方法返回最新的未消耗帧，必要时会等待
新帧在指定超时时间内到达。</p> <p>用法：</p> <ul><li>非常适合控制环路，因为它能确保每个被处理的帧
都是新鲜的，从而有效地让你的循环与相机的 FPS 同步。</li> <li>超时的常见原因包括：相机 FPS 极低、处理负载过重、
或相机已断开连接。</li></ul></div> <div class="docstring border-l-2 border-t-2 pl-4 pt-3.5 border-gray-100 rounded-tl-xl mb-6 mt-8"><!> <p>检测连接到系统的可用相机。</p></div></div> <!> <div class="docstring border-l-2 border-t-2 pl-4 pt-3.5 border-gray-100 rounded-tl-xl mb-6 mt-8"><!></div> <!> <div class="docstring border-l-2 border-t-2 pl-4 pt-3.5 border-gray-100 rounded-tl-xl mb-6 mt-8"><!></div> <!> <p></p>`,1);function Y(D,B){z(B,!1),G(()=>{new URLSearchParams(window.location.search).get("fw")}),M();var x=q();R("1gisd5k",F=>{var C=j();U(C,"content",V),y(F,C)});var b=e(I(x),2);H(b,{containerStyle:"float: right; margin-left: 10px; display: inline-flex; position: relative; z-index: 10;"});var g=e(b,2);n(g,{title:"相机",local:"相机",headingTag:"h1"});var u=e(g,6);n(u,{title:"Camera",local:"lerobot.cameras.Camera",headingTag:"h2"});var s=e(u,2),h=r(s);a(h,{name:"class lerobot.cameras.Camera",anchor:"lerobot.cameras.Camera",source:"https://github.com/huggingface/lerobot/blob/main/src/lerobot/cameras/camera.py#L26",parameters:[{name:"config",val:": CameraConfig"}],parametersDescription:[{anchor:"lerobot.cameras.Camera.fps",description:"<strong>fps</strong> (int | None) &#x2014; &#x914D;&#x7F6E;&#x7684;&#x6BCF;&#x79D2;&#x5E27;&#x6570;",name:"fps"},{anchor:"lerobot.cameras.Camera.width",description:"<strong>width</strong> (int | None) &#x2014; &#x5E27;&#x5BBD;&#xFF08;&#x50CF;&#x7D20;&#xFF09;",name:"width"},{anchor:"lerobot.cameras.Camera.height",description:"<strong>height</strong> (int | None) &#x2014; &#x5E27;&#x9AD8;&#xFF08;&#x50CF;&#x7D20;&#xFF09;",name:"height"}]});var c=e(h,10),T=r(c);a(T,{name:"connect",anchor:"lerobot.cameras.Camera.connect",source:"https://github.com/huggingface/lerobot/blob/main/src/lerobot/cameras/camera.py#L99",parameters:[{name:"warmup",val:": bool = True"}],parametersDescription:[{anchor:"lerobot.cameras.Camera.connect.warmup",description:`<strong>warmup</strong> &#x2014; &#x5982;&#x679C;&#x4E3A; True&#xFF08;&#x9ED8;&#x8BA4;&#xFF09;&#xFF0C;&#x8FD4;&#x56DE;&#x524D;&#x4F1A;&#x6355;&#x83B7;&#x4E00;&#x5E27;&#x9884;&#x70ED;&#x5E27;&#x3002;&#x5BF9;&#x4E8E;&#x9700;&#x8981;&#x65F6;&#x95F4;
&#x8C03;&#x6574;&#x6355;&#x83B7;&#x8BBE;&#x7F6E;&#x7684;&#x76F8;&#x673A;&#x5F88;&#x6709;&#x7528;&#x3002;
&#x5982;&#x679C;&#x4E3A; False&#xFF0C;&#x5219;&#x8DF3;&#x8FC7;&#x9884;&#x70ED;&#x5E27;&#x3002;`,name:"warmup"}]}),t(2),o(c);var i=e(c,2),w=r(i);a(w,{name:"disconnect",anchor:"lerobot.cameras.Camera.disconnect",source:"https://github.com/huggingface/lerobot/blob/main/src/lerobot/cameras/camera.py#L181",parameters:[]}),t(2),o(i);var m=e(i,2),L=r(m);a(L,{name:"read",anchor:"lerobot.cameras.Camera.read",source:"https://github.com/huggingface/lerobot/blob/main/src/lerobot/cameras/camera.py#L110",parameters:[],returnDescription:`<script context="module">export const metadata = 'undefined';<\/script>


<p> 捕获的帧，以 numpy 数组形式返回。</p>
`,returnType:`<script context="module">export const metadata = 'undefined';<\/script>


<p>np.ndarray</p>
`}),t(4),o(m);var d=e(m,2),A=r(d);a(A,{name:"async_read",anchor:"lerobot.cameras.Camera.async_read",source:"https://github.com/huggingface/lerobot/blob/main/src/lerobot/cameras/camera.py#L121",parameters:[{name:"timeout_ms",val:": float = Ellipsis"}],parametersDescription:[{anchor:"lerobot.cameras.Camera.async_read.timeout_ms",description:`<strong>timeout_ms</strong> &#x2014; &#x7B49;&#x5F85;&#x65B0;&#x5E27;&#x7684;&#x6700;&#x957F;&#x65F6;&#x95F4;&#xFF08;&#x6BEB;&#x79D2;&#xFF09;&#x3002;
&#x9ED8;&#x8BA4;&#x4E3A; 200ms&#xFF08;0.2s&#xFF09;&#x3002;`,name:"timeout_ms"}],returnDescription:`<script context="module">export const metadata = 'undefined';<\/script>


<p> 捕获的帧，以 numpy 数组形式返回。</p>
`,returnType:`<script context="module">export const metadata = 'undefined';<\/script>


<p>np.ndarray</p>
`,raiseDescription:`<script context="module">export const metadata = 'undefined';<\/script>


<ul>
<li>如果在 <code>timeout_ms</code> 内没有新帧到达，则抛出 <code>TimeoutError</code>。</li>
</ul>
`,raiseType:`<script context="module">export const metadata = 'undefined';<\/script>


<p><code>TimeoutError</code></p>
`}),t(12),o(d);var f=e(d,2),N=r(f);a(N,{name:"find_cameras",anchor:"lerobot.cameras.Camera.find_cameras",source:"https://github.com/huggingface/lerobot/blob/main/src/lerobot/cameras/camera.py#L89",parameters:[],returnDescription:`<script context="module">export const metadata = 'undefined';<\/script>


<p> 字典列表，
其中每个字典包含有关检测到的相机的信息。</p>
`,returnType:`<script context="module">export const metadata = 'undefined';<\/script>


<p>List[Dict[str, Any]]</p>
`}),t(2),o(f),o(s);var v=e(s,2);n(v,{title:"CameraConfig",local:"lerobot.cameras.CameraConfig",headingTag:"h2"});var p=e(v,2),k=r(p);a(k,{name:"class lerobot.cameras.CameraConfig",anchor:"lerobot.cameras.CameraConfig",source:"https://github.com/huggingface/lerobot/blob/main/src/lerobot/cameras/configs.py#L60",parameters:[{name:"fps",val:": int | None = None"},{name:"width",val:": int | None = None"},{name:"height",val:": int | None = None"}]}),o(p);var _=e(p,2);n(_,{title:"make_cameras_from_configs",local:"lerobot.cameras.make_cameras_from_configs",headingTag:"h2"});var l=e(_,2),S=r(l);a(S,{name:"lerobot.cameras.make_cameras_from_configs",anchor:"lerobot.cameras.make_cameras_from_configs",source:"https://github.com/huggingface/lerobot/blob/main/src/lerobot/cameras/utils.py#L25",parameters:[{name:"camera_configs",val:": dict"}]}),o(l);var P=e(l,2);O(P,{source:"https://github.com/huggingface/lerobot/blob/main/docs/source/api/cameras.mdx"}),t(2),y(D,x),K()}export{Y as component};
