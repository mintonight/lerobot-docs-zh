import"../chunks/DsnmJJEf.js";import{i as E,h as B,C as g,H as a,a as l,E as Q}from"../chunks/D1zeK86u.js";import{p as R,o as N,s,f as Z,a as A,b as S,d as C,n as G}from"../chunks/B9a_YfHB.js";import{s as v}from"../chunks/CrPi-TAD.js";const X='{"title":"工具","local":"工具","sections":[{"title":"工具在哪里声明","local":"工具在哪里声明","sections":[],"depth":2},{"title":"按行工具 调用","local":"按行工具-调用","sections":[],"depth":2},{"title":"如何添加你自己的工具","local":"如何添加你自己的工具","sections":[{"title":"步骤 1——声明模式","local":"步骤-1声明模式","sections":[],"depth":3},{"title":"步骤 2——实现调用","local":"步骤-2实现调用","sections":[],"depth":3},{"title":"步骤 3——注册它","local":"步骤-3注册它","sections":[],"depth":3}],"depth":2}],"depth":1}';var _=C('<meta name="hf:doc:metadata"/>'),V=C(`<p></p> <!> <!> <p>LeRobot v3.1 支持 policy 中的<strong>工具调用</strong>——助手消息可以
发出诸如 <code>say(text="OK, starting now")</code> 之类的结构化调用，运行时
会将其分派给真实的实现（TTS、控制器、日志记录器等…）。</p> <p>本页涵盖：</p> <ol><li>工具目录存放的位置。</li> <li>标注流水线如何生成工具调用原子。</li> <li>如何添加你自己的工具。</li></ol> <!> <p>分为两层。</p> <p><strong>目录</strong>——一组 OpenAI 风格函数模式组成的列表——位于
每个 dataset 的 <code>meta/info.json["tools"]</code>。示例：</p> <!> <p>通过 dataset 元数据访问器读取：</p> <!> <p>如果 dataset 的 <code>info.json</code> 没有声明任何工具，<code>meta.tools</code> 会从 <code>lerobot.datasets.language</code> 返回 <code>DEFAULT_TOOLS</code>——目前是一个
包含规范 <code>say</code> 模式的单条目列表。因此，未标注的
dataset 和聊天模板消费者无需任何
配置即可继续工作：</p> <!> <p><strong>实现</strong>——可运行的 Python——将位于 <code>src/lerobot/tools/</code> 之下，每个工具一个文件。运行时调度器和
规范 <code>say</code> 实现（封装了 Kyutai 的 pocket-tts）不属于
本文描述的目录层；目前这一层只提供
模式存储和 <code>DEFAULT_TOOLS</code> 回退常量。</p> <!> <p>上面的目录描述了<em>可以调用什么</em>。实际的<em>调用</em>——
函数名加上参数值——按行存储在 <code>language_events</code> 中的助手原子（assistant atoms）上：</p> <!> <p>配方（Recipes）通过 <code>tool_calls_from</code> 将这些拼接进渲染后的消息中：</p> <!> <p>模型的训练目标是一个助手 episode，它同时携带
计划文本<em>和</em><code>say</code> 工具调用。inference 时，运行时会将
生成文本解析回结构化的 <code>tool_calls</code>，并分派给
匹配的实现。</p> <!> <blockquote><p><strong>注意：</strong> 下面的步骤 2 和 3 描述的是运行时层
（<code>src/lerobot/tools/</code>、<code>Tool</code> 协议、<code>TOOL_REGISTRY</code>、 <code>get_tools(meta)</code>），它不属于当前已交付的目录层——
这些模块在代码树中尚不存在。仅步骤 1 就足以
通过 <code>meta.tools</code> 让工具对聊天模板可见，
从而使模型学会<em>生成</em>该调用；
在 inference 时执行该调用需要运行时层。</p></blockquote> <p>分为三个步骤。具体示例：一个 policy 可以调用的 <code>record_observation</code> 工具，
用于在常规控制循环之外捕获额外的 observation。</p> <!> <p>在 <code>meta/info.json["tools"]</code> 下添加一个条目。既可以<em>在</em> 运行标注流水线<em>之前</em>直接编辑磁盘上的文件（它会被
保留），也可以通过配置标志将其交给 <code>lerobot-annotate</code>。</p> <!> <p>该模式完全遵循 OpenAI 的函数调用约定，因此
聊天模板可以原生渲染它。</p> <!> <p>创建 <code>src/lerobot/tools/record_observation.py</code>：</p> <!> <p>每个工具一个文件可保持依赖隔离——<code>record_observation</code> 可能会引入 <code>pillow</code>，而 <code>say</code> 会引入 <code>pocket-tts</code>。只安装
所需工具的用户可以避免沉重的传递依赖。</p> <!> <p>添加到 <code>src/lerobot/tools/registry.py</code>：</p> <!> <p>就是这样。运行时 <code>get_tools(meta)</code> 会在 <code>meta.tools</code> 中查找每个模式，实例化匹配的已注册类，并返回
一个名称 → 实例字典，供调度器路由使用。</p> <p>如果你想<em>在不</em>编写实现的情况下使用某个工具（例如仅用于
训练时的聊天模板格式化），仅步骤 1 就够了——
模型仍会学会<em>生成</em>该调用。步骤 2 和 3 仅用于
在 inference 时真正<em>执行</em>它。</p> <!> <p></p>`,1);function F(m,b){R(b,!1),N(()=>{new URLSearchParams(window.location.search).get("fw")}),E();var n=V();B("171l7w4",w=>{var d=_();v(d,"content",X),A(w,d)});var t=s(Z(n),2);g(t,{containerStyle:"float: right; margin-left: 10px; display: inline-flex; position: relative; z-index: 10;"});var p=s(t,2);a(p,{title:"工具",local:"工具",headingTag:"h1"});var M=s(p,8);a(M,{title:"工具在哪里声明",local:"工具在哪里声明",headingTag:"h2"});var o=s(M,6);l(o,{code:"JTdCJTBBJTIwJTIwJTIyZmVhdHVyZXMlMjIlM0ElMjAlN0IlMjAlMjIuLi4lMjIlM0ElMjAlMjIuLi4lMjIlMjAlN0QlMkMlMEElMjAlMjAlMjJ0b29scyUyMiUzQSUyMCU1QiUwQSUyMCUyMCUyMCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMnR5cGUlMjIlM0ElMjAlMjJmdW5jdGlvbiUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMmZ1bmN0aW9uJTIyJTNBJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIybmFtZSUyMiUzQSUyMCUyMnNheSUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMmRlc2NyaXB0aW9uJTIyJTNBJTIwJTIyU3BlYWslMjBhJTIwc2hvcnQlMjB1dHRlcmFuY2UlMjB0byUyMHRoZSUyMHVzZXIlMjB2aWElMjB0aGUlMjBUVFMlMjBleGVjdXRvci4lMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjJwYXJhbWV0ZXJzJTIyJTNBJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIydHlwZSUyMiUzQSUyMCUyMm9iamVjdCUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMnByb3BlcnRpZXMlMjIlM0ElMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjJ0ZXh0JTIyJTNBJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIydHlwZSUyMiUzQSUyMCUyMnN0cmluZyUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMmRlc2NyaXB0aW9uJTIyJTNBJTIwJTIyVGhlJTIwdmVyYmF0aW0lMjB0ZXh0JTIwdG8lMjBzcGVhay4lMjIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjJyZXF1aXJlZCUyMiUzQSUyMCU1QiUyMnRleHQlMjIlNUQlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMEElMjAlMjAlMjAlMjAlMjAlMjAlN0QlMEElMjAlMjAlMjAlMjAlN0QlMEElMjAlMjAlNUQlMEElN0Q=",highlighted:`<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;features&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;...&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tools&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;function&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;function&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;say&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Speak a short utterance to the user via the TTS executor.&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;parameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;object&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;properties&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;string&quot;</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The verbatim text to speak.&quot;</span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;required&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;text&quot;</span><span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>`,lang:"json",wrap:!1});var j=s(o,4);l(j,{code:"ZnJvbSUyMGxlcm9ib3QuZGF0YXNldHMuZGF0YXNldF9tZXRhZGF0YSUyMGltcG9ydCUyMExlUm9ib3REYXRhc2V0TWV0YWRhdGElMEElMEFtZXRhJTIwJTNEJTIwTGVSb2JvdERhdGFzZXRNZXRhZGF0YShyZXBvX2lkJTNEJTIycGVwaWpuJTJGc3VwZXJfcG91bGFpbl9maW5hbF9hbm5vdGF0aW9ucyUyMiklMEF0b29scyUyMCUzRCUyMG1ldGEudG9vbHMlMjAlMjAlMjAlMjAlMjAlMjMlMjBsaXN0JTVCZGljdCU1RCUyMCVFMiU4MCU5NCUyME9wZW5BSSUyMHRvb2wlMjBzY2hlbWFz",highlighted:`<span class="hljs-keyword">from</span> lerobot.datasets.dataset_metadata <span class="hljs-keyword">import</span> LeRobotDatasetMetadata

meta = LeRobotDatasetMetadata(repo_id=<span class="hljs-string">&quot;pepijn/super_poulain_final_annotations&quot;</span>)
tools = meta.tools     <span class="hljs-comment"># list[dict] — OpenAI tool schemas</span>`,lang:"python",wrap:!1});var c=s(j,4);l(c,{code:"cHJvbXB0X3N0ciUyMCUzRCUyMHRva2VuaXplci5hcHBseV9jaGF0X3RlbXBsYXRlKCUwQSUyMCUyMCUyMCUyMHNhbXBsZSU1QiUyMm1lc3NhZ2VzJTIyJTVEJTJDJTBBJTIwJTIwJTIwJTIwdG9vbHMlM0RtZXRhLnRvb2xzJTJDJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwd29ya3MlMjBlaXRoZXIlMjB3YXklMEElMjAlMjAlMjAlMjBhZGRfZ2VuZXJhdGlvbl9wcm9tcHQlM0RGYWxzZSUyQyUwQSUyMCUyMCUyMCUyMHRva2VuaXplJTNERmFsc2UlMkMlMEEp",highlighted:`prompt_str = tokenizer.apply_chat_template(
    sample[<span class="hljs-string">&quot;messages&quot;</span>],
    tools=meta.tools,                 <span class="hljs-comment"># works either way</span>
    add_generation_prompt=<span class="hljs-literal">False</span>,
    tokenize=<span class="hljs-literal">False</span>,
)`,lang:"python",wrap:!1});var e=s(c,4);a(e,{title:"按行工具 调用",local:"按行工具-调用",headingTag:"h2"});var J=s(e,4);l(J,{code:"JTdCJTBBJTIwJTIwJTIycm9sZSUyMiUzQSUyMCUyMmFzc2lzdGFudCUyMiUyQyUwQSUyMCUyMCUyMmNvbnRlbnQlMjIlM0ElMjBudWxsJTJDJTBBJTIwJTIwJTIyc3R5bGUlMjIlM0ElMjBudWxsJTJDJTBBJTIwJTIwJTIydGltZXN0YW1wJTIyJTNBJTIwMTIuNCUyQyUwQSUyMCUyMCUyMmNhbWVyYSUyMiUzQSUyMG51bGwlMkMlMEElMjAlMjAlMjJ0b29sX2NhbGxzJTIyJTNBJTIwJTVCJTBBJTIwJTIwJTIwJTIwJTdCJTIwJTIydHlwZSUyMiUzQSUyMCUyMmZ1bmN0aW9uJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIyZnVuY3Rpb24lMjIlM0ElMjAlN0IlMjAlMjJuYW1lJTIyJTNBJTIwJTIyc2F5JTIyJTJDJTIwJTIyYXJndW1lbnRzJTIyJTNBJTIwJTdCJTIwJTIydGV4dCUyMiUzQSUyMCUyMk9uJTIwaXQuJTIyJTIwJTdEJTIwJTdEJTIwJTdEJTBBJTIwJTIwJTVEJTBBJTdE",highlighted:`{
  <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
  <span class="hljs-string">&quot;content&quot;</span>: null,
  <span class="hljs-string">&quot;style&quot;</span>: null,
  <span class="hljs-string">&quot;timestamp&quot;</span>: <span class="hljs-number">12.4</span>,
  <span class="hljs-string">&quot;camera&quot;</span>: null,
  <span class="hljs-string">&quot;tool_calls&quot;</span>: [
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;function&quot;</span>,
      <span class="hljs-string">&quot;function&quot;</span>: { <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;say&quot;</span>, <span class="hljs-string">&quot;arguments&quot;</span>: { <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;On it.&quot;</span> } } }
  ]
}`,lang:"python",wrap:!1});var u=s(J,4);l(u,{code:"dXNlcl9pbnRlcmplY3Rpb25fcmVzcG9uc2UlM0ElMEElMjAlMjBiaW5kaW5ncyUzQSUwQSUyMCUyMCUyMCUyMHNwZWVjaCUzQSUyMCUyMmVtaXR0ZWRfYXQodCUyQyUyMHJvbGUlM0Rhc3Npc3RhbnQlMkMlMjB0b29sX25hbWUlM0RzYXkpJTIyJTBBJTIwJTIwbWVzc2FnZXMlM0ElMEElMjAlMjAlMjAlMjAtJTIwJTdCJTIwcm9sZSUzQSUyMHVzZXIlMkMlMjBjb250ZW50JTNBJTIwJTIyJTI0JTdCdGFzayU3RCUyMiUyQyUyMHN0cmVhbSUzQSUyMGhpZ2hfbGV2ZWwlMjAlN0QlMEElMjAlMjAlMjAlMjAtJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcm9sZSUzQSUyMGFzc2lzdGFudCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGNvbnRlbnQlM0ElMjAlMjIlMjQlN0JjdXJyZW50X3BsYW4lN0QlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBzdHJlYW0lM0ElMjBoaWdoX2xldmVsJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwdGFyZ2V0JTNBJTIwdHJ1ZSUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHRvb2xfY2FsbHNfZnJvbSUzQSUyMHNwZWVjaCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCU3RA==",highlighted:`<span class="hljs-attr">user_interjection_response:</span>
  <span class="hljs-attr">bindings:</span>
    <span class="hljs-attr">speech:</span> <span class="hljs-string">&quot;emitted_at(t, role=assistant, tool_name=say)&quot;</span>
  <span class="hljs-attr">messages:</span>
    <span class="hljs-bullet">-</span> { <span class="hljs-attr">role:</span> <span class="hljs-string">user</span>, <span class="hljs-attr">content:</span> <span class="hljs-string">&quot;\${task}&quot;</span>, <span class="hljs-attr">stream:</span> <span class="hljs-string">high_level</span> }
    <span class="hljs-bullet">-</span> {
        <span class="hljs-attr">role:</span> <span class="hljs-string">assistant</span>,
        <span class="hljs-attr">content:</span> <span class="hljs-string">&quot;\${current_plan}&quot;</span>,
        <span class="hljs-attr">stream:</span> <span class="hljs-string">high_level</span>,
        <span class="hljs-attr">target:</span> <span class="hljs-literal">true</span>,
        <span class="hljs-attr">tool_calls_from:</span> <span class="hljs-string">speech</span>,
      }`,lang:"yaml",wrap:!1});var T=s(u,4);a(T,{title:"如何添加你自己的工具",local:"如何添加你自己的工具",headingTag:"h2"});var y=s(T,6);a(y,{title:"步骤 1——声明模式",local:"步骤-1声明模式",headingTag:"h3"});var i=s(y,4);l(i,{code:"JTdCJTBBJTIwJTIwJTIydG9vbHMlMjIlM0ElMjAlNUIlMEElMjAlMjAlMjAlMjAlN0IlMjAlMjJ0eXBlJTIyJTNBJTIwJTIyZnVuY3Rpb24lMjIlMkMlMjAlMjJmdW5jdGlvbiUyMiUzQSUyMCU3QiUyMCUyMm5hbWUlMjIlM0ElMjAlMjJzYXklMjIlMkMlMjAlMjIuLi4lMjIlM0ElMjAlMjIuLi4lMjIlMjAlN0QlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjJ0eXBlJTIyJTNBJTIwJTIyZnVuY3Rpb24lMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjJmdW5jdGlvbiUyMiUzQSUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMm5hbWUlMjIlM0ElMjAlMjJyZWNvcmRfb2JzZXJ2YXRpb24lMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjJkZXNjcmlwdGlvbiUyMiUzQSUyMCUyMkNhcHR1cmUlMjBhJTIwaGlnaC1yZXNvbHV0aW9uJTIwc3RpbGwlMjBpbWFnZSUyMGZvciUyMHRoZSUyMHVzZXIuJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIycGFyYW1ldGVycyUyMiUzQSUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMnR5cGUlMjIlM0ElMjAlMjJvYmplY3QlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjJwcm9wZXJ0aWVzJTIyJTNBJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIybGFiZWwlMjIlM0ElMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjJ0eXBlJTIyJTNBJTIwJTIyc3RyaW5nJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIyZGVzY3JpcHRpb24lMjIlM0ElMjAlMjJTaG9ydCUyMGxhYmVsJTIwZm9yJTIwdGhlJTIwc2F2ZWQlMjBpbWFnZS4lMjIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjJyZXF1aXJlZCUyMiUzQSUyMCU1QiUyMmxhYmVsJTIyJTVEJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdEJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTdEJTBBJTIwJTIwJTIwJTIwJTdEJTBBJTIwJTIwJTVEJTBBJTdE",highlighted:`<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;tools&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;function&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;function&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;say&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;...&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span> <span class="hljs-punctuation">}</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;function&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;function&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;record_observation&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Capture a high-resolution still image for the user.&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;parameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;object&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;properties&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;string&quot;</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Short label for the saved image.&quot;</span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;required&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;label&quot;</span><span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>`,lang:"json",wrap:!1});var h=s(i,4);a(h,{title:"步骤 2——实现调用",local:"步骤-2实现调用",headingTag:"h3"});var U=s(h,4);l(U,{code:"ZnJvbSUyMC5iYXNlJTIwaW1wb3J0JTIwVG9vbCUwQWZyb20lMjB0eXBpbmclMjBpbXBvcnQlMjBBbnklMEElMEFSRUNPUkRfT0JTRVJWQVRJT05fU0NIRU1BJTNBJTIwZGljdCU1QnN0ciUyQyUyMEFueSU1RCUyMCUzRCUyMCU3QiUyMCUyMi4uLiUyMiUzQSUyMCUyMi4uLiUyMiUyMCU3RCUyMCUyMCUyMCUyMyUyMG1pcnJvcnMlMjB0aGUlMjBKU09OJTIwYWJvdmUlMEElMEElMEFjbGFzcyUyMFJlY29yZE9ic2VydmF0aW9uVG9vbCUzQSUwQSUyMCUyMCUyMCUyMG5hbWUlMjAlM0QlMjAlMjJyZWNvcmRfb2JzZXJ2YXRpb24lMjIlMEElMjAlMjAlMjAlMjBzY2hlbWElMjAlM0QlMjBSRUNPUkRfT0JTRVJWQVRJT05fU0NIRU1BJTBBJTBBJTIwJTIwJTIwJTIwZGVmJTIwX19pbml0X18oc2VsZiUyQyUyMHNjaGVtYSUzQSUyMGRpY3QlMjAlN0MlMjBOb25lJTIwJTNEJTIwTm9uZSUyQyUyMG91dHB1dF9kaXIlM0ElMjBzdHIlMjAlM0QlMjAlMjIuJTIyKSUzQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHNlbGYub3V0cHV0X2RpciUyMCUzRCUyMG91dHB1dF9kaXIlMEElMEElMjAlMjAlMjAlMjBkZWYlMjBjYWxsKHNlbGYlMkMlMjBhcmd1bWVudHMlM0ElMjBkaWN0KSUyMC0lM0UlMjBzdHIlM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBsYWJlbCUyMCUzRCUyMGFyZ3VtZW50cyU1QiUyMmxhYmVsJTIyJTVEJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwLi4uJTIwc2F2ZSUyMHRoZSUyMGxhdGVzdCUyMGNhbWVyYSUyMGZyYW1lJTIwdG8lMjAlM0NvdXRwdXRfZGlyJTNFJTJGJTNDbGFiZWwlM0UucG5nJTIwLi4uJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcmV0dXJuJTIwZiUyMnNhdmVkJTIwJTdCbGFiZWwlN0QucG5nJTIy",highlighted:`<span class="hljs-keyword">from</span> .base <span class="hljs-keyword">import</span> Tool
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">Any</span>

RECORD_OBSERVATION_SCHEMA: <span class="hljs-built_in">dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>] = { <span class="hljs-string">&quot;...&quot;</span>: <span class="hljs-string">&quot;...&quot;</span> }   <span class="hljs-comment"># mirrors the JSON above</span>


<span class="hljs-keyword">class</span> <span class="hljs-title class_">RecordObservationTool</span>:
    name = <span class="hljs-string">&quot;record_observation&quot;</span>
    schema = RECORD_OBSERVATION_SCHEMA

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, schema: <span class="hljs-built_in">dict</span> | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span>, output_dir: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;.&quot;</span></span>):
        <span class="hljs-variable language_">self</span>.output_dir = output_dir

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">call</span>(<span class="hljs-params">self, arguments: <span class="hljs-built_in">dict</span></span>) -&gt; <span class="hljs-built_in">str</span>:
        label = arguments[<span class="hljs-string">&quot;label&quot;</span>]
        <span class="hljs-comment"># ... save the latest camera frame to &lt;output_dir&gt;/&lt;label&gt;.png ...</span>
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;saved <span class="hljs-subst">{label}</span>.png&quot;</span>`,lang:"python",wrap:!1});var I=s(U,4);a(I,{title:"步骤 3——注册它",local:"步骤-3注册它",headingTag:"h3"});var r=s(I,4);l(r,{code:"ZnJvbSUyMC5yZWNvcmRfb2JzZXJ2YXRpb24lMjBpbXBvcnQlMjBSZWNvcmRPYnNlcnZhdGlvblRvb2wlMEElMEFUT09MX1JFR0lTVFJZJTVCJTIycmVjb3JkX29ic2VydmF0aW9uJTIyJTVEJTIwJTNEJTIwUmVjb3JkT2JzZXJ2YXRpb25Ub29s",highlighted:`<span class="hljs-keyword">from</span> .record_observation <span class="hljs-keyword">import</span> RecordObservationTool

TOOL_REGISTRY[<span class="hljs-string">&quot;record_observation&quot;</span>] = RecordObservationTool`,lang:"python",wrap:!1});var q=s(r,6);Q(q,{source:"https://github.com/huggingface/lerobot/blob/main/docs/source/tools.mdx"}),G(2),A(m,n),S()}export{F as component};
