import"../chunks/DsnmJJEf.js";import{i as K,h as L,C as D,H as s,a,E as O}from"../chunks/B0fLWDn-.js";import{p as $,o as ll,s as l,f as sl,a as F,b as al,d as k,n as Ml}from"../chunks/CK-oPab5.js";import{s as nl}from"../chunks/C_Vwy0jz.js";const cl='{"title":"环境处理器","local":"环境处理器","sections":[{"title":"为什么需要环境处理器？","local":"为什么需要环境处理器","sections":[],"depth":2},{"title":"处理流水线","local":"处理流水线","sections":[],"depth":2},{"title":"优势","local":"优势","sections":[{"title":"1. 关注点分离","local":"1-关注点分离","sections":[],"depth":3},{"title":"2. 灵活性与可复用性","local":"2-灵活性与可复用性","sections":[],"depth":3},{"title":"3. 更轻松的实验","local":"3-更轻松的实验","sections":[],"depth":3},{"title":"4. 更清晰的环境代码","local":"4-更清晰的环境代码","sections":[],"depth":3}],"depth":2},{"title":"使用环境处理器","local":"使用环境处理器","sections":[{"title":"工厂函数","local":"工厂函数","sections":[],"depth":3},{"title":"在 envs/factory.py 中的实现","local":"在-envsfactorypy-中的实现","sections":[],"depth":3},{"title":"在评估中的集成","local":"在评估中的集成","sections":[],"depth":3}],"depth":2},{"title":"示例：LIBERO 环境处理器","local":"示例libero-环境处理器","sections":[{"title":"为什么需要这些变换？","local":"为什么需要这些变换","sections":[],"depth":3}],"depth":2},{"title":"为新环境添加环境处理器","local":"为新环境添加环境处理器","sections":[{"title":"1. 创建处理器步骤","local":"1-创建处理器步骤","sections":[],"depth":3},{"title":"2. 更新你的 EnvConfig 子类","local":"2-更新你的-envconfig-子类","sections":[],"depth":3},{"title":"3. 在评估中使用","local":"3-在评估中使用","sections":[],"depth":3}],"depth":2},{"title":"未来：环境后处理器","local":"未来环境后处理器","sections":[{"title":"action space 变换","local":"action-space-变换","sections":[],"depth":3},{"title":"坐标系转换","local":"坐标系转换","sections":[],"depth":3}],"depth":2},{"title":"最佳实践","local":"最佳实践","sections":[],"depth":2},{"title":"总结","local":"总结","sections":[],"depth":2}],"depth":1}';var ol=k('<meta name="hf:doc:metadata"/>'),yl=k("<p></p> <!> <!> <p>环境处理器是 LeRobot 数据处理架构中的关键一层，负责处理<strong>特定于环境</strong>的变换，与特定于 policy 的处理分离。这种关注点分离带来了更清晰的代码、更好的模块化，以及更容易地对不同环境和 policy 进行实验。</p> <!> <p>在使用不同的机器人环境（LIBERO、MetaWorld、Aloha 等）时，每个环境往往有独特的数据格式、坐标系和约定，需要在 policy 处理<strong>之前</strong>进行标准化。如果没有环境处理器，这些变换将会：</p> <ol><li><strong>硬编码在环境代码中</strong> - 使得难以试验不同的 state 表示</li> <li><strong>在各 policy 间重复</strong> - 每个 policy 都需要处理特定于环境的特殊情况</li> <li><strong>与 policy 逻辑混杂</strong> - 违反关注点分离，并使调试更困难</li></ol> <p>环境处理器通过在原始环境 observation 与 policy 输入之间提供一个<strong>专用的处理层</strong>来解决这一问题。</p> <!> <p>以下是评估期间数据流经完整处理流水线的方式：</p> <!> <!> <!> <p>环境处理器处理特定于<strong>环境数据格式</strong>的变换，而 policy 处理器处理特定于<strong>模型需求</strong>的变换。</p> <!> <!> <p>同一个 policy 可以搭配不同的环境处理器，同一个环境处理器也可以搭配不同的 policy：</p> <!> <!> <p>想为 LIBERO 尝试不同的 state 表示？只需创建一个新的处理器：</p> <!> <!> <p>环境暴露<strong>所有可用数据</strong>，无需知道下游模型会使用哪些：</p> <!> <!> <!> <p><code>make_env_pre_post_processors</code> 函数遵循与 policy 的 <code>make_pre_post_processors</code> 相同的模式：</p> <!> <!> <!> <!> <p>在 <code>lerobot_eval.py</code> 中，环境处理器只创建一次并全程使用：</p> <!> <!> <p><code>LiberoProcessorStep</code> 展示了一个真实世界的环境处理器：</p> <!> <!> <ol><li><p><strong>图像旋转</strong>：HuggingFaceVLA/libero dataset 中的图像相对于原始 LIBERO simulation 器旋转了 180°。处理器处理这一约定不匹配，使得在该 dataset 上训练的 policy 可以无缝工作。</p></li> <li><p><strong>state 展平</strong>：原始 LIBERO 环境暴露包含所有可用 state 信息（位置、四元数、速度、矩阵表示等）的嵌套字典。处理器会：</p> <ul><li>选择相关分量（pos、quat、gripper）</li> <li>将四元数转换为轴角（更适合学习）</li> <li>展平为 policy 所期望的单个 8 维向量</li></ul></li> <li><p><strong>灵活性</strong>：环境仍然暴露<strong>所有</strong>原始数据。如果你想尝试不同的 state 表示（例如包含速度、使用矩阵表示而非轴角），可以创建新的处理器而无需修改环境代码。</p></li></ol> <!> <p>要为新环境添加环境处理器：</p> <!> <!> <!> <!> <!> <p>无需更改！评估脚本会自动使用合适的处理器：</p> <!> <!> <p>目前，所有环境的后处理器都是恒等（空操作）。未来的用例包括：</p> <!> <!> <!> <!> <!> <ol><li><p><strong>保持环境处理器简单</strong>：它们应仅处理特定于环境的数据格式问题，而不是复杂的学习相关变换。</p></li> <li><p><strong>将模型需求交给 policy 处理器</strong>：归一化、批处理、设备放置和标记化都属于 policy 处理器。</p></li> <li><p><strong>从环境暴露所有数据</strong>：让处理器决定使用什么，而不是在环境中硬编码选择。</p></li> <li><p><strong>记录约定</strong>：清楚地记录你的处理器所处理的任何坐标系约定、相机朝向或数据格式。</p></li> <li><p><strong>独立测试</strong>：环境处理器应能在不加载完整 policy 或环境的情况下进行测试。</p></li></ol> <!> <p>环境处理器在特定于环境的数据变换与特定于 policy 的模型需求之间提供了<strong>清晰的分离</strong>。这种架构：</p> <ul><li>✅ 支持轻松试验不同的 state 表示</li> <li>✅ 让 policy 能够在不同环境间无缝工作</li> <li>✅ 让环境代码专注于 simulation/硬件接口</li> <li>✅ 使处理器流水线更易维护和调试</li> <li>✅ 遵循单一职责原则</li></ul> <p>关键洞见：<strong>环境定义数据格式，处理器将其标准化，policy 消费标准化数据。</strong>每个层都有清晰而专注的职责。</p> <!> <p></p>",1);function Ul(q,x){$(x,!1),ll(()=>{new URLSearchParams(window.location.search).get("fw")}),K();var M=yl();L("1mhxbqr",f=>{var H=ol();nl(H,"content",cl),F(f,H)});var n=l(sl(M),2);D(n,{containerStyle:"float: right; margin-left: 10px; display: inline-flex; position: relative; z-index: 10;"});var c=l(n,2);s(c,{title:"环境处理器",local:"环境处理器",headingTag:"h1"});var o=l(c,4);s(o,{title:"为什么需要环境处理器？",local:"为什么需要环境处理器",headingTag:"h2"});var y=l(o,8);s(y,{title:"处理流水线",local:"处理流水线",headingTag:"h2"});var e=l(y,4);a(e,{code:"JTIzJTIwSW4lMjBsZXJvYm90X2V2YWwucHklMjByb2xsb3V0KCklMjBmdW5jdGlvbiUzQSUwQSUwQSUyMyUyMDEuJTIwUmF3JTIwZW52aXJvbm1lbnQlMjBvYnNlcnZhdGlvbiUyMChudW1weSUyMGFycmF5cyUyQyUyMHZhcmlvdXMlMjBmb3JtYXRzKSUwQXJhd19vYnNlcnZhdGlvbiUyMCUzRCUyMGVudi5zdGVwKGFjdGlvbiklMEElMEElMjMlMjAyLiUyMENvbnZlcnQlMjBudW1weSUyMHRvJTIwdG9yY2glMkMlMjBub3JtYWxpemUlMjBpbWFnZXMlMjAlNUIwJTJDMSU1RCUwQW9ic2VydmF0aW9uJTIwJTNEJTIwcHJlcHJvY2Vzc19vYnNlcnZhdGlvbihyYXdfb2JzZXJ2YXRpb24pJTBBJTBBJTIzJTIwMy4lMjBBZGQlMjB0YXNrJTIwbWV0YWRhdGElMjAoZm9yJTIwbXVsdGktdGFzayUyMGVudmlyb25tZW50cyklMEFvYnNlcnZhdGlvbiUyMCUzRCUyMGFkZF9lbnZzX3Rhc2soZW52JTJDJTIwb2JzZXJ2YXRpb24pJTBBJTBBJTIzJTIwNC4lMjBFTlZJUk9OTUVOVC1TUEVDSUZJQyUyMHByZXByb2Nlc3NpbmclMjAoTkVXISklMEElMjMlMjAlMjAlMjAlMjAtJTIwRmxhdHRlbiUyMHJvYm90JTIwc3RhdGVzJTBBJTIzJTIwJTIwJTIwJTIwLSUyMFJvdGF0ZSUyMGltYWdlcyUyMHRvJTIwbWF0Y2glMjBkYXRhc2V0JTIwY29udmVudGlvbnMlMEElMjMlMjAlMjAlMjAlMjAtJTIwSGFuZGxlJTIwZW52aXJvbm1lbnQtc3BlY2lmaWMlMjBjb29yZGluYXRlJTIwc3lzdGVtcyUwQW9ic2VydmF0aW9uJTIwJTNEJTIwZW52X3ByZXByb2Nlc3NvcihvYnNlcnZhdGlvbiklMEElMEElMjMlMjA1LiUyMFBPTElDWS1TUEVDSUZJQyUyMHByZXByb2Nlc3NpbmclMEElMjMlMjAlMjAlMjAlMjAtJTIwTm9ybWFsaXplJTIwd2l0aCUyMGRhdGFzZXQlMjBzdGF0aXN0aWNzJTBBJTIzJTIwJTIwJTIwJTIwLSUyMEFkZCUyMGJhdGNoJTIwZGltZW5zaW9ucyUwQSUyMyUyMCUyMCUyMCUyMC0lMjBNb3ZlJTIwdG8lMjBHUFUlMEElMjMlMjAlMjAlMjAlMjAtJTIwVG9rZW5pemUlMjBsYW5ndWFnZSUyMGluc3RydWN0aW9ucyUwQW9ic2VydmF0aW9uJTIwJTNEJTIwcHJlcHJvY2Vzc29yKG9ic2VydmF0aW9uKSUwQSUwQSUyMyUyMDYuJTIwUG9saWN5JTIwaW5mZXJlbmNlJTBBYWN0aW9uJTIwJTNEJTIwcG9saWN5LnNlbGVjdF9hY3Rpb24ob2JzZXJ2YXRpb24pJTBBJTBBJTIzJTIwNy4lMjBQT0xJQ1ktU1BFQ0lGSUMlMjBwb3N0cHJvY2Vzc2luZyUwQSUyMyUyMCUyMCUyMCUyMC0lMjBVbm5vcm1hbGl6ZSUyMGFjdGlvbnMlMEElMjMlMjAlMjAlMjAlMjAtJTIwUmVtb3ZlJTIwYmF0Y2glMjBkaW1lbnNpb25zJTBBYWN0aW9uJTIwJTNEJTIwcG9zdHByb2Nlc3NvcihhY3Rpb24pJTBBJTBBJTIzJTIwOC4lMjBFTlZJUk9OTUVOVC1TUEVDSUZJQyUyMHBvc3Rwcm9jZXNzaW5nJTIwKE5FVyEpJTBBJTIzJTIwJTIwJTIwJTIwLSUyMENvbnZlcnQlMjBhY3Rpb24lMjBmb3JtYXRzJTIwaWYlMjBuZWVkZWQlMEElMjMlMjAlMjAlMjAlMjAtJTIwQXBwbHklMjBlbnZpcm9ubWVudC1zcGVjaWZpYyUyMGNvbnN0cmFpbnRzJTBBYWN0aW9uX3RyYW5zaXRpb24lMjAlM0QlMjAlN0IlMjJhY3Rpb24lMjIlM0ElMjBhY3Rpb24lN0QlMEFhY3Rpb25fdHJhbnNpdGlvbiUyMCUzRCUyMGVudl9wb3N0cHJvY2Vzc29yKGFjdGlvbl90cmFuc2l0aW9uKSUwQWFjdGlvbiUyMCUzRCUyMGFjdGlvbl90cmFuc2l0aW9uJTVCJTIyYWN0aW9uJTIyJTVEJTBBJTBBJTIzJTIwOS4lMjBFeGVjdXRlJTIwaW4lMjBlbnZpcm9ubWVudCUwQWVudi5zdGVwKGFjdGlvbik=",highlighted:`<span class="hljs-comment"># In lerobot_eval.py rollout() function:</span>

<span class="hljs-comment"># 1. Raw environment observation (numpy arrays, various formats)</span>
raw_observation = env.step(action)

<span class="hljs-comment"># 2. Convert numpy to torch, normalize images [0,1]</span>
observation = preprocess_observation(raw_observation)

<span class="hljs-comment"># 3. Add task metadata (for multi-task environments)</span>
observation = add_envs_task(env, observation)

<span class="hljs-comment"># 4. ENVIRONMENT-SPECIFIC preprocessing (NEW!)</span>
<span class="hljs-comment">#    - Flatten robot states</span>
<span class="hljs-comment">#    - Rotate images to match dataset conventions</span>
<span class="hljs-comment">#    - Handle environment-specific coordinate systems</span>
observation = env_preprocessor(observation)

<span class="hljs-comment"># 5. POLICY-SPECIFIC preprocessing</span>
<span class="hljs-comment">#    - Normalize with dataset statistics</span>
<span class="hljs-comment">#    - Add batch dimensions</span>
<span class="hljs-comment">#    - Move to GPU</span>
<span class="hljs-comment">#    - Tokenize language instructions</span>
observation = preprocessor(observation)

<span class="hljs-comment"># 6. Policy inference</span>
action = policy.select_action(observation)

<span class="hljs-comment"># 7. POLICY-SPECIFIC postprocessing</span>
<span class="hljs-comment">#    - Unnormalize actions</span>
<span class="hljs-comment">#    - Remove batch dimensions</span>
action = postprocessor(action)

<span class="hljs-comment"># 8. ENVIRONMENT-SPECIFIC postprocessing (NEW!)</span>
<span class="hljs-comment">#    - Convert action formats if needed</span>
<span class="hljs-comment">#    - Apply environment-specific constraints</span>
action_transition = {<span class="hljs-string">&quot;action&quot;</span>: action}
action_transition = env_postprocessor(action_transition)
action = action_transition[<span class="hljs-string">&quot;action&quot;</span>]

<span class="hljs-comment"># 9. Execute in environment</span>
env.step(action)`,lang:"python",wrap:!1});var t=l(e,2);s(t,{title:"优势",local:"优势",headingTag:"h2"});var p=l(t,2);s(p,{title:"1. 关注点分离",local:"1-关注点分离",headingTag:"h3"});var J=l(p,4);a(J,{code:"JTIzJTIwJUUyJTlEJThDJTIwQmVmb3JlJTNBJTIwTWl4ZWQlMjBjb25jZXJucyUwQWNsYXNzJTIwTGliZXJvVkxBUG9saWN5JTNBJTBBJTIwJTIwJTIwJTIwZGVmJTIwcHJlcHJvY2VzcyhzZWxmJTJDJTIwb2JzKSUzQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMEVudmlyb25tZW50LXNwZWNpZmljJTNBJTIwRmxhdHRlbiUyMHJvYm90JTIwc3RhdGUlMjAoc2hvdWxkbid0JTIwYmUlMjBpbiUyMHBvbGljeSEpJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwc3RhdGUlMjAlM0QlMjBzZWxmLl9mbGF0dGVuX3JvYm90X3N0YXRlKG9icyU1QiUyMnJvYm90X3N0YXRlJTIyJTVEKSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMFBvbGljeS1zcGVjaWZpYyUzQSUyME5vcm1hbGl6ZSUyMHdpdGglMjBkYXRhc2V0JTIwc3RhdHMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBzdGF0ZSUyMCUzRCUyMHNlbGYubm9ybWFsaXplcihzdGF0ZSklMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjByZXR1cm4lMjBzdGF0ZSUwQSUwQSUyMyUyMCVFMiU5QyU4NSUyMEFmdGVyJTNBJTIwQ2xlYXIlMjBzZXBhcmF0aW9uJTBBJTIzJTIwRW52aXJvbm1lbnQlMjBwcm9jZXNzb3IlM0ElMjBIYW5kbGVzJTIwTElCRVJPJ3MlMjBuZXN0ZWQlMjByb2JvdCUyMHN0YXRlJTBBZW52X3ByZXByb2Nlc3NvciUyMCUzRCUyMExpYmVyb1Byb2Nlc3NvclN0ZXAoKSUyMCUyMCUyMyUyMEZsYXR0ZW5zJTIwcm9ib3Rfc3RhdGUlMEElMEElMjMlMjBQb2xpY3klMjBwcm9jZXNzb3IlM0ElMjBIYW5kbGVzJTIwbW9kZWwlMjByZXF1aXJlbWVudHMlMEFwb2xpY3lfcHJlcHJvY2Vzc29yJTIwJTNEJTIwTm9ybWFsaXplclByb2Nlc3NvclN0ZXAoc3RhdHMlM0RkYXRhc2V0X3N0YXRzKQ==",highlighted:`<span class="hljs-comment"># ❌ Before: Mixed concerns</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">LiberoVLAPolicy</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">preprocess</span>(<span class="hljs-params">self, obs</span>):
        <span class="hljs-comment"># Environment-specific: Flatten robot state (shouldn&#x27;t be in policy!)</span>
        state = <span class="hljs-variable language_">self</span>._flatten_robot_state(obs[<span class="hljs-string">&quot;robot_state&quot;</span>])
        <span class="hljs-comment"># Policy-specific: Normalize with dataset stats</span>
        state = <span class="hljs-variable language_">self</span>.normalizer(state)
        <span class="hljs-keyword">return</span> state

<span class="hljs-comment"># ✅ After: Clear separation</span>
<span class="hljs-comment"># Environment processor: Handles LIBERO&#x27;s nested robot state</span>
env_preprocessor = LiberoProcessorStep()  <span class="hljs-comment"># Flattens robot_state</span>

<span class="hljs-comment"># Policy processor: Handles model requirements</span>
policy_preprocessor = NormalizerProcessorStep(stats=dataset_stats)`,lang:"python",wrap:!1});var U=l(J,2);s(U,{title:"2. 灵活性与可复用性",local:"2-灵活性与可复用性",headingTag:"h3"});var i=l(U,4);a(i,{code:"JTIzJTIwVXNlJTIwU21vbFZMQSUyMHBvbGljeSUyMHdpdGglMjBMSUJFUk8lMjBlbnZpcm9ubWVudCUwQWxpYmVyb19wcmVwcm9jZXNzb3IlMkMlMjBsaWJlcm9fcG9zdHByb2Nlc3NvciUyMCUzRCUyMG1ha2VfZW52X3ByZV9wb3N0X3Byb2Nlc3NvcnMoJTBBJTIwJTIwJTIwJTIwZW52X2NmZyUzRGxpYmVyb19jZmclMkMlMEElMjAlMjAlMjAlMjBwb2xpY3lfY2ZnJTNEc21vbHZsYV9jZmclMkMlMEEpJTBBc21vbHZsYV9wcmVwcm9jZXNzb3IlMkMlMjBzbW9sdmxhX3Bvc3Rwcm9jZXNzb3IlMjAlM0QlMjBtYWtlX3ByZV9wb3N0X3Byb2Nlc3NvcnMoc21vbHZsYV9jZmcpJTBBJTBBJTIzJTIwT3IlMjB1c2UlMjBBQ1QlMjBwb2xpY3klMjB3aXRoJTIwdGhlJTIwc2FtZSUyMExJQkVSTyUyMGVudmlyb25tZW50JTBBbGliZXJvX3ByZXByb2Nlc3NvciUyQyUyMGxpYmVyb19wb3N0cHJvY2Vzc29yJTIwJTNEJTIwbWFrZV9lbnZfcHJlX3Bvc3RfcHJvY2Vzc29ycyglMEElMjAlMjAlMjAlMjBlbnZfY2ZnJTNEbGliZXJvX2NmZyUyQyUwQSUyMCUyMCUyMCUyMHBvbGljeV9jZmclM0RhY3RfY2ZnJTJDJTBBKSUwQWFjdF9wcmVwcm9jZXNzb3IlMkMlMjBhY3RfcG9zdHByb2Nlc3NvciUyMCUzRCUyMG1ha2VfcHJlX3Bvc3RfcHJvY2Vzc29ycyhhY3RfY2ZnKQ==",highlighted:`<span class="hljs-comment"># Use SmolVLA policy with LIBERO environment</span>
libero_preprocessor, libero_postprocessor = make_env_pre_post_processors(
    env_cfg=libero_cfg,
    policy_cfg=smolvla_cfg,
)
smolvla_preprocessor, smolvla_postprocessor = make_pre_post_processors(smolvla_cfg)

<span class="hljs-comment"># Or use ACT policy with the same LIBERO environment</span>
libero_preprocessor, libero_postprocessor = make_env_pre_post_processors(
    env_cfg=libero_cfg,
    policy_cfg=act_cfg,
)
act_preprocessor, act_postprocessor = make_pre_post_processors(act_cfg)`,lang:"python",wrap:!1});var j=l(i,2);s(j,{title:"3. 更轻松的实验",local:"3-更轻松的实验",headingTag:"h3"});var T=l(j,4);a(T,{code:"JTIzJTIwT3JpZ2luYWwlM0ElMjA4RCUyMHN0YXRlJTIwKHBvcyUyMCUyQiUyMHF1YXQlRTIlODYlOTJheGlzYW5nbGUlMjAlMkIlMjBncmlwcGVyKSUwQSU0MFByb2Nlc3NvclN0ZXBSZWdpc3RyeS5yZWdpc3RlciglMjJsaWJlcm9fcHJvY2Vzc29yJTIyKSUwQWNsYXNzJTIwTGliZXJvUHJvY2Vzc29yU3RlcChPYnNlcnZhdGlvblByb2Nlc3NvclN0ZXApJTNBJTBBJTIwJTIwJTIwJTIwZGVmJTIwX3Byb2Nlc3Nfb2JzZXJ2YXRpb24oc2VsZiUyQyUyMG9icyklM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBlZWZfcG9zJTIwJTNEJTIwcm9ib3Rfc3RhdGUlNUIlMjJlZWYlMjIlNUQlNUIlMjJwb3MlMjIlNUQlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjMlMjAzRCUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGVlZl9heGlzYW5nbGUlMjAlM0QlMjBxdWF0MmF4aXNhbmdsZShxdWF0KSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMDNEJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZ3JpcHBlciUyMCUzRCUyMHJvYm90X3N0YXRlJTVCJTIyZ3JpcHBlciUyMiU1RCU1QiUyMnFwb3MlMjIlNUQlMjAlMjAlMjAlMjAlMjAlMjMlMjAyRCUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHN0YXRlJTIwJTNEJTIwdG9yY2guY2F0KCU1QmVlZl9wb3MlMkMlMjBlZWZfYXhpc2FuZ2xlJTJDJTIwZ3JpcHBlciU1RCUyQyUyMGRpbSUzRC0xKSUyMCUyMCUyMyUyMDhEJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcmV0dXJuJTIwc3RhdGUlMEElMEElMjMlMjBFeHBlcmltZW50JTNBJTIwQWRkJTIwdmVsb2NpdHklMjBmb3IlMjBiZXR0ZXIlMjBjb250cm9sJTBBJTQwUHJvY2Vzc29yU3RlcFJlZ2lzdHJ5LnJlZ2lzdGVyKCUyMmxpYmVyb192ZWxvY2l0eV9wcm9jZXNzb3IlMjIpJTBBY2xhc3MlMjBMaWJlcm9WZWxvY2l0eVByb2Nlc3NvclN0ZXAoT2JzZXJ2YXRpb25Qcm9jZXNzb3JTdGVwKSUzQSUwQSUyMCUyMCUyMCUyMGRlZiUyMF9wcm9jZXNzX29ic2VydmF0aW9uKHNlbGYlMkMlMjBvYnMpJTNBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwSW5jbHVkZSUyMHZlbG9jaXRpZXMlMjBmb3IlMjAxNEQlMjBzdGF0ZSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGVlZl9wb3MlMjAlM0QlMjByb2JvdF9zdGF0ZSU1QiUyMmVlZiUyMiU1RCU1QiUyMnBvcyUyMiU1RCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMDNEJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZWVmX2F4aXNhbmdsZSUyMCUzRCUyMHF1YXQyYXhpc2FuZ2xlKHF1YXQpJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwM0QlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBlZWZfdmVsJTIwJTNEJTIwcm9ib3Rfc3RhdGUlNUIlMjJlZWYlMjIlNUQlNUIlMjJ2ZWwlMjIlNUQlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjMlMjAzRCUyMCUyMChORVcpJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZ3JpcHBlcl9wb3MlMjAlM0QlMjByb2JvdF9zdGF0ZSU1QiUyMmdyaXBwZXIlMjIlNUQlNUIlMjJxcG9zJTIyJTVEJTIwJTIzJTIwMkQlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBncmlwcGVyX3ZlbCUyMCUzRCUyMHJvYm90X3N0YXRlJTVCJTIyZ3JpcHBlciUyMiU1RCU1QiUyMnF2ZWwlMjIlNUQlMjAlMjMlMjAzRCUyMCUyMChORVcpJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwc3RhdGUlMjAlM0QlMjB0b3JjaC5jYXQoJTVCZWVmX3BvcyUyQyUyMGVlZl9heGlzYW5nbGUlMkMlMjBlZWZfdmVsJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZ3JpcHBlcl9wb3MlMkMlMjBncmlwcGVyX3ZlbCU1RCUyQyUyMGRpbSUzRC0xKSUyMCUyMCUyMyUyMDE0RCUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHJldHVybiUyMHN0YXRl",highlighted:`<span class="hljs-comment"># Original: 8D state (pos + quat→axisangle + gripper)</span>
<span class="hljs-meta">@ProcessorStepRegistry.register(<span class="hljs-params"><span class="hljs-string">&quot;libero_processor&quot;</span></span>)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">LiberoProcessorStep</span>(<span class="hljs-title class_ inherited__">ObservationProcessorStep</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_process_observation</span>(<span class="hljs-params">self, obs</span>):
        eef_pos = robot_state[<span class="hljs-string">&quot;eef&quot;</span>][<span class="hljs-string">&quot;pos&quot;</span>]          <span class="hljs-comment"># 3D</span>
        eef_axisangle = quat2axisangle(quat)         <span class="hljs-comment"># 3D</span>
        gripper = robot_state[<span class="hljs-string">&quot;gripper&quot;</span>][<span class="hljs-string">&quot;qpos&quot;</span>]     <span class="hljs-comment"># 2D</span>
        state = torch.cat([eef_pos, eef_axisangle, gripper], dim=-<span class="hljs-number">1</span>)  <span class="hljs-comment"># 8D</span>
        <span class="hljs-keyword">return</span> state

<span class="hljs-comment"># Experiment: Add velocity for better control</span>
<span class="hljs-meta">@ProcessorStepRegistry.register(<span class="hljs-params"><span class="hljs-string">&quot;libero_velocity_processor&quot;</span></span>)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">LiberoVelocityProcessorStep</span>(<span class="hljs-title class_ inherited__">ObservationProcessorStep</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_process_observation</span>(<span class="hljs-params">self, obs</span>):
        <span class="hljs-comment"># Include velocities for 14D state</span>
        eef_pos = robot_state[<span class="hljs-string">&quot;eef&quot;</span>][<span class="hljs-string">&quot;pos&quot;</span>]          <span class="hljs-comment"># 3D</span>
        eef_axisangle = quat2axisangle(quat)         <span class="hljs-comment"># 3D</span>
        eef_vel = robot_state[<span class="hljs-string">&quot;eef&quot;</span>][<span class="hljs-string">&quot;vel&quot;</span>]          <span class="hljs-comment"># 3D  (NEW)</span>
        gripper_pos = robot_state[<span class="hljs-string">&quot;gripper&quot;</span>][<span class="hljs-string">&quot;qpos&quot;</span>] <span class="hljs-comment"># 2D</span>
        gripper_vel = robot_state[<span class="hljs-string">&quot;gripper&quot;</span>][<span class="hljs-string">&quot;qvel&quot;</span>] <span class="hljs-comment"># 3D  (NEW)</span>
        state = torch.cat([eef_pos, eef_axisangle, eef_vel,
                          gripper_pos, gripper_vel], dim=-<span class="hljs-number">1</span>)  <span class="hljs-comment"># 14D</span>
        <span class="hljs-keyword">return</span> state`,lang:"python",wrap:!1});var w=l(T,2);s(w,{title:"4. 更清晰的环境代码",local:"4-更清晰的环境代码",headingTag:"h3"});var r=l(w,4);a(r,{code:"JTIzJTIwTElCRVJPJTIwZW52aXJvbm1lbnQlMjBleHBvc2VzJTIwZnVsbCUyMHJvYm90JTIwc3RhdGUlMEFvYnNlcnZhdGlvbiUyMCUzRCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMnBpeGVscyUyMiUzQSUyMCU3QiUyMmltYWdlJTIyJTNBJTIwaW1nJTJDJTIwJTIyaW1hZ2UyJTIyJTNBJTIwaW1nMiU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMnJvYm90X3N0YXRlJTIyJTNBJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIyZWVmJTIyJTNBJTIwJTdCJTIycG9zJTIyJTNBJTIwLi4uJTJDJTIwJTIycXVhdCUyMiUzQSUyMC4uLiUyQyUyMCUyMnZlbCUyMiUzQSUyMC4uLiUyQyUyMCUyMm1hdCUyMiUzQSUyMC4uLiUyQyUyMCUyMmF4aXNhbmdsZSUyMiUzQSUyMC4uLiU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMmdyaXBwZXIlMjIlM0ElMjAlN0IlMjJxcG9zJTIyJTNBJTIwLi4uJTJDJTIwJTIycXZlbCUyMiUzQSUyMC4uLiU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMmpvaW50cyUyMiUzQSUyMCU3QiUyMnBvcyUyMiUzQSUyMC4uLiUyQyUyMCUyMnZlbCUyMiUzQSUyMC4uLiU3RCUwQSUyMCUyMCUyMCUyMCU3RCUwQSU3RCUwQSUwQSUyMyUyMEVudmlyb25tZW50JTIwcHJvY2Vzc29yJTIwZGVjaWRlcyUyMHdoYXQlMjB0byUyMHVzZSUwQSUyMyUyMFBvbGljeSUyMHByb2Nlc3NvciUyMGhhbmRsZXMlMjBtb2RlbC1zcGVjaWZpYyUyMHRyYW5zZm9ybWF0aW9ucw==",highlighted:`<span class="hljs-comment"># LIBERO environment exposes full robot state</span>
observation = {
    <span class="hljs-string">&quot;pixels&quot;</span>: {<span class="hljs-string">&quot;image&quot;</span>: img, <span class="hljs-string">&quot;image2&quot;</span>: img2},
    <span class="hljs-string">&quot;robot_state&quot;</span>: {
        <span class="hljs-string">&quot;eef&quot;</span>: {<span class="hljs-string">&quot;pos&quot;</span>: ..., <span class="hljs-string">&quot;quat&quot;</span>: ..., <span class="hljs-string">&quot;vel&quot;</span>: ..., <span class="hljs-string">&quot;mat&quot;</span>: ..., <span class="hljs-string">&quot;axisangle&quot;</span>: ...},
        <span class="hljs-string">&quot;gripper&quot;</span>: {<span class="hljs-string">&quot;qpos&quot;</span>: ..., <span class="hljs-string">&quot;qvel&quot;</span>: ...},
        <span class="hljs-string">&quot;joints&quot;</span>: {<span class="hljs-string">&quot;pos&quot;</span>: ..., <span class="hljs-string">&quot;vel&quot;</span>: ...}
    }
}

<span class="hljs-comment"># Environment processor decides what to use</span>
<span class="hljs-comment"># Policy processor handles model-specific transformations</span>`,lang:"python",wrap:!1});var I=l(r,2);s(I,{title:"使用环境处理器",local:"使用环境处理器",headingTag:"h2"});var b=l(I,2);s(b,{title:"工厂函数",local:"工厂函数",headingTag:"h3"});var m=l(b,4);a(m,{code:"ZnJvbSUyMGxlcm9ib3QuZW52cyUyMGltcG9ydCUyMG1ha2VfZW52X3ByZV9wb3N0X3Byb2Nlc3NvcnMlMkMlMjBQdXNodEVudiUwQWZyb20lMjBsZXJvYm90LmVudnMuY29uZmlncyUyMGltcG9ydCUyMExpYmVyb0VudiUwQSUwQSUyMyUyMEZvciUyMExJQkVSTyUzQSUyMFJldHVybnMlMjBMaWJlcm9Qcm9jZXNzb3JTdGVwJTIwaW4lMjBwcmVwcm9jZXNzb3IlMEFsaWJlcm9fY2ZnJTIwJTNEJTIwTGliZXJvRW52KHRhc2slM0QlMjJsaWJlcm9fc3BhdGlhbCUyMiUyQyUyMGNhbWVyYV9uYW1lJTNEJTVCJTIyYWdlbnR2aWV3JTIyJTVEKSUwQWVudl9wcmVwcm9jZXNzb3IlMkMlMjBlbnZfcG9zdHByb2Nlc3NvciUyMCUzRCUyMG1ha2VfZW52X3ByZV9wb3N0X3Byb2Nlc3NvcnMobGliZXJvX2NmZyklMEElMEElMjMlMjBGb3IlMjBvdGhlciUyMGVudmlyb25tZW50cyUzQSUyMFJldHVybnMlMjBpZGVudGl0eSUyMHByb2Nlc3NvcnMlMjAobm8tb3ApJTBBcHVzaHRfY2ZnJTIwJTNEJTIwUHVzaHRFbnYoKSUwQWVudl9wcmVwcm9jZXNzb3IlMkMlMjBlbnZfcG9zdHByb2Nlc3NvciUyMCUzRCUyMG1ha2VfZW52X3ByZV9wb3N0X3Byb2Nlc3NvcnMocHVzaHRfY2ZnKQ==",highlighted:`<span class="hljs-keyword">from</span> lerobot.envs <span class="hljs-keyword">import</span> make_env_pre_post_processors, PushtEnv
<span class="hljs-keyword">from</span> lerobot.envs.configs <span class="hljs-keyword">import</span> LiberoEnv

<span class="hljs-comment"># For LIBERO: Returns LiberoProcessorStep in preprocessor</span>
libero_cfg = LiberoEnv(task=<span class="hljs-string">&quot;libero_spatial&quot;</span>, camera_name=[<span class="hljs-string">&quot;agentview&quot;</span>])
env_preprocessor, env_postprocessor = make_env_pre_post_processors(libero_cfg)

<span class="hljs-comment"># For other environments: Returns identity processors (no-op)</span>
pusht_cfg = PushtEnv()
env_preprocessor, env_postprocessor = make_env_pre_post_processors(pusht_cfg)`,lang:"python",wrap:!1});var C=l(m,2);s(C,{title:"在 envs/factory.py 中的实现",local:"在-envsfactorypy-中的实现",headingTag:"h3"});var h=l(C,2);a(h,{code:"ZGVmJTIwbWFrZV9lbnZfcHJlX3Bvc3RfcHJvY2Vzc29ycyglMEElMjAlMjAlMjAlMjBlbnZfY2ZnJTNBJTIwRW52Q29uZmlnJTJDJTBBKSUyMC0lM0UlMjB0dXBsZSU1QiUwQSUyMCUyMCUyMCUyMFBvbGljeVByb2Nlc3NvclBpcGVsaW5lJTVCZGljdCU1QnN0ciUyQyUyMEFueSU1RCUyQyUyMGRpY3QlNUJzdHIlMkMlMjBBbnklNUQlNUQlMkMlMEElMjAlMjAlMjAlMjBQb2xpY3lQcm9jZXNzb3JQaXBlbGluZSU1QmRpY3QlNUJzdHIlMkMlMjBBbnklNUQlMkMlMjBkaWN0JTVCc3RyJTJDJTIwQW55JTVEJTVEJTJDJTBBJTVEJTNBJTBBJTIwJTIwJTIwJTIwJTIyJTIyJTIyJTBBJTIwJTIwJTIwJTIwQ3JlYXRlJTIwcHJlcHJvY2Vzc29yJTIwYW5kJTIwcG9zdHByb2Nlc3NvciUyMHBpcGVsaW5lcyUyMGZvciUyMGVudmlyb25tZW50JTIwb2JzZXJ2YXRpb25zLiUwQSUwQSUyMCUyMCUyMCUyMEFyZ3MlM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBlbnZfY2ZnJTNBJTIwVGhlJTIwY29uZmlndXJhdGlvbiUyMG9mJTIwdGhlJTIwZW52aXJvbm1lbnQuJTBBJTBBJTIwJTIwJTIwJTIwUmV0dXJucyUzQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMEElMjB0dXBsZSUyMGNvbnRhaW5pbmclM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAtJTIwcHJlcHJvY2Vzc29yJTNBJTIwUGlwZWxpbmUlMjB0aGF0JTIwcHJvY2Vzc2VzJTIwZW52aXJvbm1lbnQlMjBvYnNlcnZhdGlvbnMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAtJTIwcG9zdHByb2Nlc3NvciUzQSUyMFBpcGVsaW5lJTIwdGhhdCUyMHByb2Nlc3NlcyUyMGVudmlyb25tZW50JTIwb3V0cHV0cyUwQSUyMCUyMCUyMCUyMCUyMiUyMiUyMiUwQSUyMCUyMCUyMCUyMCUyMyUyMEZvciUyMExJQkVSTyUyMGVudmlyb25tZW50cyUyQyUyMGFkZCUyMHRoZSUyMExpYmVyb1Byb2Nlc3NvclN0ZXAlMjB0byUyMHByZXByb2Nlc3NvciUwQSUyMCUyMCUyMCUyMGlmJTIwaXNpbnN0YW5jZShlbnZfY2ZnJTJDJTIwTGliZXJvRW52KSUyMG9yJTIwJTIybGliZXJvJTIyJTIwaW4lMjBlbnZfY2ZnLnR5cGUlM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBwcmVwcm9jZXNzb3IlMjAlM0QlMjBQb2xpY3lQcm9jZXNzb3JQaXBlbGluZShzdGVwcyUzRCU1QkxpYmVyb1Byb2Nlc3NvclN0ZXAoKSU1RCklMEElMjAlMjAlMjAlMjBlbHNlJTNBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwRm9yJTIwYWxsJTIwb3RoZXIlMjBlbnZpcm9ubWVudHMlMkMlMjByZXR1cm4lMjBhbiUyMGlkZW50aXR5JTIwcHJlcHJvY2Vzc29yJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcHJlcHJvY2Vzc29yJTIwJTNEJTIwUG9saWN5UHJvY2Vzc29yUGlwZWxpbmUoc3RlcHMlM0QlNUIlNUQpJTBBJTBBJTIwJTIwJTIwJTIwJTIzJTIwUG9zdHByb2Nlc3NvciUyMGlzJTIwY3VycmVudGx5JTIwaWRlbnRpdHklMjBmb3IlMjBhbGwlMjBlbnZpcm9ubWVudHMlMEElMjAlMjAlMjAlMjAlMjMlMjBGdXR1cmUlM0ElMjBDb3VsZCUyMGFkZCUyMGVudmlyb25tZW50LXNwZWNpZmljJTIwYWN0aW9uJTIwdHJhbnNmb3JtYXRpb25zJTBBJTIwJTIwJTIwJTIwcG9zdHByb2Nlc3NvciUyMCUzRCUyMFBvbGljeVByb2Nlc3NvclBpcGVsaW5lKHN0ZXBzJTNEJTVCJTVEKSUwQSUwQSUyMCUyMCUyMCUyMHJldHVybiUyMHByZXByb2Nlc3NvciUyQyUyMHBvc3Rwcm9jZXNzb3I=",highlighted:`<span class="hljs-keyword">def</span> <span class="hljs-title function_">make_env_pre_post_processors</span>(<span class="hljs-params">
    env_cfg: EnvConfig,
</span>) -&gt; <span class="hljs-built_in">tuple</span>[
    PolicyProcessorPipeline[<span class="hljs-built_in">dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>], <span class="hljs-built_in">dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]],
    PolicyProcessorPipeline[<span class="hljs-built_in">dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>], <span class="hljs-built_in">dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]],
]:
    <span class="hljs-string">&quot;&quot;&quot;
    Create preprocessor and postprocessor pipelines for environment observations.

    Args:
        env_cfg: The configuration of the environment.

    Returns:
        A tuple containing:
            - preprocessor: Pipeline that processes environment observations
            - postprocessor: Pipeline that processes environment outputs
    &quot;&quot;&quot;</span>
    <span class="hljs-comment"># For LIBERO environments, add the LiberoProcessorStep to preprocessor</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">isinstance</span>(env_cfg, LiberoEnv) <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;libero&quot;</span> <span class="hljs-keyword">in</span> env_cfg.<span class="hljs-built_in">type</span>:
        preprocessor = PolicyProcessorPipeline(steps=[LiberoProcessorStep()])
    <span class="hljs-keyword">else</span>:
        <span class="hljs-comment"># For all other environments, return an identity preprocessor</span>
        preprocessor = PolicyProcessorPipeline(steps=[])

    <span class="hljs-comment"># Postprocessor is currently identity for all environments</span>
    <span class="hljs-comment"># Future: Could add environment-specific action transformations</span>
    postprocessor = PolicyProcessorPipeline(steps=[])

    <span class="hljs-keyword">return</span> preprocessor, postprocessor`,lang:"python",wrap:!1});var B=l(h,2);s(B,{title:"在评估中的集成",local:"在评估中的集成",headingTag:"h3"});var d=l(B,4);a(d,{code:"ZGVmJTIwZXZhbF9tYWluKGNmZyUzQSUyMEV2YWxQaXBlbGluZUNvbmZpZyklM0ElMEElMjAlMjAlMjAlMjAlMjMlMjBDcmVhdGUlMjBlbnZpcm9ubWVudCUwQSUyMCUyMCUyMCUyMGVudnMlMjAlM0QlMjBtYWtlX2VudihjZmcuZW52JTJDJTIwbl9lbnZzJTNEY2ZnLmV2YWwuYmF0Y2hfc2l6ZSklMEElMEElMjAlMjAlMjAlMjAlMjMlMjBDcmVhdGUlMjBwb2xpY3klMEElMjAlMjAlMjAlMjBwb2xpY3klMjAlM0QlMjBtYWtlX3BvbGljeShjZmclM0RjZmcucG9saWN5JTJDJTIwZW52X2NmZyUzRGNmZy5lbnYpJTBBJTBBJTIwJTIwJTIwJTIwJTIzJTIwQ3JlYXRlJTIwcG9saWN5JTIwcHJvY2Vzc29ycyUwQSUyMCUyMCUyMCUyMHByZXByb2Nlc3NvciUyQyUyMHBvc3Rwcm9jZXNzb3IlMjAlM0QlMjBtYWtlX3ByZV9wb3N0X3Byb2Nlc3NvcnMoJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcG9saWN5X2NmZyUzRGNmZy5wb2xpY3klMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBwcmV0cmFpbmVkX3BhdGglM0RjZmcucG9saWN5LnByZXRyYWluZWRfcGF0aCUyQyUwQSUyMCUyMCUyMCUyMCklMEElMEElMjAlMjAlMjAlMjAlMjMlMjBDcmVhdGUlMjBlbnZpcm9ubWVudCUyMHByb2Nlc3NvcnMlMjAoTkVXISklMEElMjAlMjAlMjAlMjBlbnZfcHJlcHJvY2Vzc29yJTJDJTIwZW52X3Bvc3Rwcm9jZXNzb3IlMjAlM0QlMjBtYWtlX2Vudl9wcmVfcG9zdF9wcm9jZXNzb3JzKGVudl9jZmclM0RjZmcuZW52KSUwQSUwQSUyMCUyMCUyMCUyMCUyMyUyMFJ1biUyMGV2YWx1YXRpb24lMjB3aXRoJTIwYm90aCUyMHByb2Nlc3NvciUyMHR5cGVzJTBBJTIwJTIwJTIwJTIwZXZhbF9wb2xpY3lfYWxsKCUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGVudnMlM0RlbnZzJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcG9saWN5JTNEcG9saWN5JTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZW52X3ByZXByb2Nlc3NvciUzRGVudl9wcmVwcm9jZXNzb3IlMkMlMjAlMjAlMjAlMjAlMjAlMjAlMjMlMjBFbnZpcm9ubWVudC1zcGVjaWZpYyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGVudl9wb3N0cHJvY2Vzc29yJTNEZW52X3Bvc3Rwcm9jZXNzb3IlMkMlMjAlMjAlMjAlMjAlMjMlMjBFbnZpcm9ubWVudC1zcGVjaWZpYyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHByZXByb2Nlc3NvciUzRHByZXByb2Nlc3NvciUyQyUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMFBvbGljeS1zcGVjaWZpYyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHBvc3Rwcm9jZXNzb3IlM0Rwb3N0cHJvY2Vzc29yJTJDJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwUG9saWN5LXNwZWNpZmljJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwbl9lcGlzb2RlcyUzRGNmZy5ldmFsLm5fZXBpc29kZXMlMkMlMEElMjAlMjAlMjAlMjAp",highlighted:`<span class="hljs-keyword">def</span> <span class="hljs-title function_">eval_main</span>(<span class="hljs-params">cfg: EvalPipelineConfig</span>):
    <span class="hljs-comment"># Create environment</span>
    envs = make_env(cfg.env, n_envs=cfg.<span class="hljs-built_in">eval</span>.batch_size)

    <span class="hljs-comment"># Create policy</span>
    policy = make_policy(cfg=cfg.policy, env_cfg=cfg.env)

    <span class="hljs-comment"># Create policy processors</span>
    preprocessor, postprocessor = make_pre_post_processors(
        policy_cfg=cfg.policy,
        pretrained_path=cfg.policy.pretrained_path,
    )

    <span class="hljs-comment"># Create environment processors (NEW!)</span>
    env_preprocessor, env_postprocessor = make_env_pre_post_processors(env_cfg=cfg.env)

    <span class="hljs-comment"># Run evaluation with both processor types</span>
    eval_policy_all(
        envs=envs,
        policy=policy,
        env_preprocessor=env_preprocessor,      <span class="hljs-comment"># Environment-specific</span>
        env_postprocessor=env_postprocessor,    <span class="hljs-comment"># Environment-specific</span>
        preprocessor=preprocessor,              <span class="hljs-comment"># Policy-specific</span>
        postprocessor=postprocessor,            <span class="hljs-comment"># Policy-specific</span>
        n_episodes=cfg.<span class="hljs-built_in">eval</span>.n_episodes,
    )`,lang:"python",wrap:!1});var v=l(d,2);s(v,{title:"示例：LIBERO 环境处理器",local:"示例libero-环境处理器",headingTag:"h2"});var Z=l(v,4);a(Z,{code:"ZnJvbSUyMGxlcm9ib3QucHJvY2Vzc29yJTIwaW1wb3J0JTIwT2JzZXJ2YXRpb25Qcm9jZXNzb3JTdGVwJTBBJTBBJTQwZGF0YWNsYXNzJTBBJTQwUHJvY2Vzc29yU3RlcFJlZ2lzdHJ5LnJlZ2lzdGVyKG5hbWUlM0QlMjJsaWJlcm9fcHJvY2Vzc29yJTIyKSUwQWNsYXNzJTIwTGliZXJvUHJvY2Vzc29yU3RlcChPYnNlcnZhdGlvblByb2Nlc3NvclN0ZXApJTNBJTBBJTIwJTIwJTIwJTIwJTIyJTIyJTIyJTBBJTIwJTIwJTIwJTIwUHJvY2Vzc2VzJTIwTElCRVJPJTIwb2JzZXJ2YXRpb25zJTIwaW50byUyMHRoZSUyMExlUm9ib3QlMjBmb3JtYXQuJTBBJTBBJTIwJTIwJTIwJTIwKipTdGF0ZSUyMFByb2Nlc3NpbmclM0EqKiUwQSUyMCUyMCUyMCUyMC0lMjBFeHRyYWN0cyUyMGVuZC1lZmZlY3RvciUyMHBvc2l0aW9uJTIwKDNEKSUwQSUyMCUyMCUyMCUyMC0lMjBDb252ZXJ0cyUyMHF1YXRlcm5pb24lMjB0byUyMGF4aXMtYW5nbGUlMjByZXByZXNlbnRhdGlvbiUyMCgzRCklMEElMjAlMjAlMjAlMjAtJTIwRXh0cmFjdHMlMjBncmlwcGVyJTIwam9pbnQlMjBwb3NpdGlvbnMlMjAoMkQpJTBBJTIwJTIwJTIwJTIwLSUyMENvbmNhdGVuYXRlcyUyMGludG8lMjA4RCUyMHN0YXRlJTIwdmVjdG9yJTBBJTBBJTIwJTIwJTIwJTIwKipJbWFnZSUyMFByb2Nlc3NpbmclM0EqKiUwQSUyMCUyMCUyMCUyMC0lMjBSb3RhdGVzJTIwaW1hZ2VzJTIwMTgwJUMyJUIwJTIwdG8lMjBtYXRjaCUyMEh1Z2dpbmdGYWNlVkxBJTJGbGliZXJvJTIwY29udmVudGlvbiUwQSUyMCUyMCUyMCUyMCUyMiUyMiUyMiUwQSUwQSUyMCUyMCUyMCUyMGRlZiUyMF9wcm9jZXNzX29ic2VydmF0aW9uKHNlbGYlMkMlMjBvYnNlcnZhdGlvbiklM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBwcm9jZXNzZWRfb2JzJTIwJTNEJTIwb2JzZXJ2YXRpb24uY29weSgpJTBBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwUHJvY2VzcyUyMGltYWdlcyUzQSUyMEZsaXAlMjAxODAlQzIlQjAlMjBmb3IlMjBjYW1lcmElMjBjb252ZW50aW9uJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZm9yJTIwa2V5JTIwaW4lMjBsaXN0KHByb2Nlc3NlZF9vYnMua2V5cygpKSUzQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGlmJTIwa2V5LnN0YXJ0c3dpdGgoJTIyb2JzZXJ2YXRpb24uaW1hZ2VzLiUyMiklM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBpbWclMjAlM0QlMjBwcm9jZXNzZWRfb2JzJTVCa2V5JTVEJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwaW1nJTIwJTNEJTIwdG9yY2guZmxpcChpbWclMkMlMjBkaW1zJTNEJTVCMiUyQyUyMDMlNUQpJTIwJTIwJTIzJTIwRmxpcCUyMEglMjBhbmQlMjBXJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcHJvY2Vzc2VkX29icyU1QmtleSU1RCUyMCUzRCUyMGltZyUwQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMFByb2Nlc3MlMjByb2JvdF9zdGF0ZSUzQSUyMEZsYXR0ZW4lMjB0byUyMDhEJTIwdmVjdG9yJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwaWYlMjAlMjJvYnNlcnZhdGlvbi5yb2JvdF9zdGF0ZSUyMiUyMGluJTIwcHJvY2Vzc2VkX29icyUzQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHJvYm90X3N0YXRlJTIwJTNEJTIwcHJvY2Vzc2VkX29icy5wb3AoJTIyb2JzZXJ2YXRpb24ucm9ib3Rfc3RhdGUlMjIpJTBBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZWVmX3BvcyUyMCUzRCUyMHJvYm90X3N0YXRlJTVCJTIyZWVmJTIyJTVEJTVCJTIycG9zJTIyJTVEJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwKEIlMkMlMjAzKSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGVlZl9xdWF0JTIwJTNEJTIwcm9ib3Rfc3RhdGUlNUIlMjJlZWYlMjIlNUQlNUIlMjJxdWF0JTIyJTVEJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwKEIlMkMlMjA0KSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGdyaXBwZXJfcXBvcyUyMCUzRCUyMHJvYm90X3N0YXRlJTVCJTIyZ3JpcHBlciUyMiU1RCU1QiUyMnFwb3MlMjIlNUQlMjAlMjMlMjAoQiUyQyUyMDIpJTBBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwQ29udmVydCUyMHF1YXRlcm5pb24lMjB0byUyMGF4aXMtYW5nbGUlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBlZWZfYXhpc2FuZ2xlJTIwJTNEJTIwc2VsZi5fcXVhdDJheGlzYW5nbGUoZWVmX3F1YXQpJTIwJTIwJTIzJTIwKEIlMkMlMjAzKSUwQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMENvbmNhdGVuYXRlJTIwaW50byUyMHNpbmdsZSUyMHN0YXRlJTIwdmVjdG9yJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwc3RhdGUlMjAlM0QlMjB0b3JjaC5jYXQoKGVlZl9wb3MlMkMlMjBlZWZfYXhpc2FuZ2xlJTJDJTIwZ3JpcHBlcl9xcG9zKSUyQyUyMGRpbSUzRC0xKSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHN0YXRlJTIwJTNEJTIwc3RhdGUuZmxvYXQoKSUwQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHByb2Nlc3NlZF9vYnMlNUIlMjJvYnNlcnZhdGlvbi5zdGF0ZSUyMiU1RCUyMCUzRCUyMHN0YXRlJTBBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcmV0dXJuJTIwcHJvY2Vzc2VkX29icw==",highlighted:`<span class="hljs-keyword">from</span> lerobot.processor <span class="hljs-keyword">import</span> ObservationProcessorStep

<span class="hljs-meta">@dataclass</span>
<span class="hljs-meta">@ProcessorStepRegistry.register(<span class="hljs-params">name=<span class="hljs-string">&quot;libero_processor&quot;</span></span>)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">LiberoProcessorStep</span>(<span class="hljs-title class_ inherited__">ObservationProcessorStep</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Processes LIBERO observations into the LeRobot format.

    **State Processing:**
    - Extracts end-effector position (3D)
    - Converts quaternion to axis-angle representation (3D)
    - Extracts gripper joint positions (2D)
    - Concatenates into 8D state vector

    **Image Processing:**
    - Rotates images 180° to match HuggingFaceVLA/libero convention
    &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_process_observation</span>(<span class="hljs-params">self, observation</span>):
        processed_obs = observation.copy()

        <span class="hljs-comment"># Process images: Flip 180° for camera convention</span>
        <span class="hljs-keyword">for</span> key <span class="hljs-keyword">in</span> <span class="hljs-built_in">list</span>(processed_obs.keys()):
            <span class="hljs-keyword">if</span> key.startswith(<span class="hljs-string">&quot;observation.images.&quot;</span>):
                img = processed_obs[key]
                img = torch.flip(img, dims=[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>])  <span class="hljs-comment"># Flip H and W</span>
                processed_obs[key] = img

        <span class="hljs-comment"># Process robot_state: Flatten to 8D vector</span>
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;observation.robot_state&quot;</span> <span class="hljs-keyword">in</span> processed_obs:
            robot_state = processed_obs.pop(<span class="hljs-string">&quot;observation.robot_state&quot;</span>)

            eef_pos = robot_state[<span class="hljs-string">&quot;eef&quot;</span>][<span class="hljs-string">&quot;pos&quot;</span>]           <span class="hljs-comment"># (B, 3)</span>
            eef_quat = robot_state[<span class="hljs-string">&quot;eef&quot;</span>][<span class="hljs-string">&quot;quat&quot;</span>]         <span class="hljs-comment"># (B, 4)</span>
            gripper_qpos = robot_state[<span class="hljs-string">&quot;gripper&quot;</span>][<span class="hljs-string">&quot;qpos&quot;</span>] <span class="hljs-comment"># (B, 2)</span>

            <span class="hljs-comment"># Convert quaternion to axis-angle</span>
            eef_axisangle = <span class="hljs-variable language_">self</span>._quat2axisangle(eef_quat)  <span class="hljs-comment"># (B, 3)</span>

            <span class="hljs-comment"># Concatenate into single state vector</span>
            state = torch.cat((eef_pos, eef_axisangle, gripper_qpos), dim=-<span class="hljs-number">1</span>)
            state = state.<span class="hljs-built_in">float</span>()

            processed_obs[<span class="hljs-string">&quot;observation.state&quot;</span>] = state

        <span class="hljs-keyword">return</span> processed_obs`,lang:"python",wrap:!1});var u=l(Z,2);s(u,{title:"为什么需要这些变换？",local:"为什么需要这些变换",headingTag:"h3"});var N=l(u,4);s(N,{title:"为新环境添加环境处理器",local:"为新环境添加环境处理器",headingTag:"h2"});var A=l(N,4);s(A,{title:"1. 创建处理器步骤",local:"1-创建处理器步骤",headingTag:"h3"});var G=l(A,2);a(G,{code:"JTIzJTIwSW4lMjBzcmMlMkZsZXJvYm90JTJGcHJvY2Vzc29yJTJGZW52X3Byb2Nlc3Nvci5weSUwQSUwQSU0MGRhdGFjbGFzcyUwQSU0MFByb2Nlc3NvclN0ZXBSZWdpc3RyeS5yZWdpc3RlcihuYW1lJTNEJTIybXllbnZfcHJvY2Vzc29yJTIyKSUwQWNsYXNzJTIwTXlFbnZQcm9jZXNzb3JTdGVwKE9ic2VydmF0aW9uUHJvY2Vzc29yU3RlcCklM0ElMEElMjAlMjAlMjAlMjAlMjIlMjIlMjJQcm9jZXNzJTIwb2JzZXJ2YXRpb25zJTIwZnJvbSUyME15RW52LiUyMiUyMiUyMiUwQSUwQSUyMCUyMCUyMCUyMGRlZiUyMF9wcm9jZXNzX29ic2VydmF0aW9uKHNlbGYlMkMlMjBvYnNlcnZhdGlvbiklM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBwcm9jZXNzZWQlMjAlM0QlMjBvYnNlcnZhdGlvbi5jb3B5KCklMEElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjMlMjBZb3VyJTIwZW52aXJvbm1lbnQtc3BlY2lmaWMlMjB0cmFuc2Zvcm1hdGlvbnMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBpZiUyMCUyMm15ZW52LnNwZWNpZmljLnN0YXRlJTIyJTIwaW4lMjBwcm9jZXNzZWQlM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBzdGF0ZSUyMCUzRCUyMHByb2Nlc3NlZC5wb3AoJTIybXllbnYuc3BlY2lmaWMuc3RhdGUlMjIpJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwVHJhbnNmb3JtJTIwdG8lMjBzdGFuZGFyZCUyMGZvcm1hdCUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHByb2Nlc3NlZCU1QiUyMm9ic2VydmF0aW9uLnN0YXRlJTIyJTVEJTIwJTNEJTIwc2VsZi5fdHJhbnNmb3JtX3N0YXRlKHN0YXRlKSUwQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHJldHVybiUyMHByb2Nlc3NlZA==",highlighted:`<span class="hljs-comment"># In src/lerobot/processor/env_processor.py</span>

<span class="hljs-meta">@dataclass</span>
<span class="hljs-meta">@ProcessorStepRegistry.register(<span class="hljs-params">name=<span class="hljs-string">&quot;myenv_processor&quot;</span></span>)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MyEnvProcessorStep</span>(<span class="hljs-title class_ inherited__">ObservationProcessorStep</span>):
    <span class="hljs-string">&quot;&quot;&quot;Process observations from MyEnv.&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_process_observation</span>(<span class="hljs-params">self, observation</span>):
        processed = observation.copy()

        <span class="hljs-comment"># Your environment-specific transformations</span>
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;myenv.specific.state&quot;</span> <span class="hljs-keyword">in</span> processed:
            state = processed.pop(<span class="hljs-string">&quot;myenv.specific.state&quot;</span>)
            <span class="hljs-comment"># Transform to standard format</span>
            processed[<span class="hljs-string">&quot;observation.state&quot;</span>] = <span class="hljs-variable language_">self</span>._transform_state(state)

        <span class="hljs-keyword">return</span> processed`,lang:"python",wrap:!1});var g=l(G,2);s(g,{title:"2. 更新你的 EnvConfig 子类",local:"2-更新你的-envconfig-子类",headingTag:"h3"});var V=l(g,2);a(V,{code:"JTIzJTIwSW4lMjBzcmMlMkZsZXJvYm90JTJGZW52cyUyRmZhY3RvcnkucHklMEElMEFkZWYlMjBtYWtlX2Vudl9wcmVfcG9zdF9wcm9jZXNzb3JzKGVudl9jZmclM0ElMjBFbnZDb25maWcpJTNBJTBBJTIwJTIwJTIwJTIwaWYlMjBpc2luc3RhbmNlKGVudl9jZmclMkMlMjBMaWJlcm9FbnYpJTIwb3IlMjAlMjJsaWJlcm8lMjIlMjBpbiUyMGVudl9jZmcudHlwZSUzQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHByZXByb2Nlc3NvciUyMCUzRCUyMFBvbGljeVByb2Nlc3NvclBpcGVsaW5lKHN0ZXBzJTNEJTVCTGliZXJvUHJvY2Vzc29yU3RlcCgpJTVEKSUwQSUyMCUyMCUyMCUyMGVsaWYlMjBpc2luc3RhbmNlKGVudl9jZmclMkMlMjBNeUVudkNvbmZpZyklMjBvciUyMCUyMm15ZW52JTIyJTIwaW4lMjBlbnZfY2ZnLnR5cGUlM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBwcmVwcm9jZXNzb3IlMjAlM0QlMjBQb2xpY3lQcm9jZXNzb3JQaXBlbGluZShzdGVwcyUzRCU1Qk15RW52UHJvY2Vzc29yU3RlcCgpJTVEKSUwQSUyMCUyMCUyMCUyMGVsc2UlM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBwcmVwcm9jZXNzb3IlMjAlM0QlMjBQb2xpY3lQcm9jZXNzb3JQaXBlbGluZShzdGVwcyUzRCU1QiU1RCklMEElMEElMjAlMjAlMjAlMjBwb3N0cHJvY2Vzc29yJTIwJTNEJTIwUG9saWN5UHJvY2Vzc29yUGlwZWxpbmUoc3RlcHMlM0QlNUIlNUQpJTBBJTIwJTIwJTIwJTIwcmV0dXJuJTIwcHJlcHJvY2Vzc29yJTJDJTIwcG9zdHByb2Nlc3Nvcg==",highlighted:`<span class="hljs-comment"># In src/lerobot/envs/factory.py</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">make_env_pre_post_processors</span>(<span class="hljs-params">env_cfg: EnvConfig</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">isinstance</span>(env_cfg, LiberoEnv) <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;libero&quot;</span> <span class="hljs-keyword">in</span> env_cfg.<span class="hljs-built_in">type</span>:
        preprocessor = PolicyProcessorPipeline(steps=[LiberoProcessorStep()])
    <span class="hljs-keyword">elif</span> <span class="hljs-built_in">isinstance</span>(env_cfg, MyEnvConfig) <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;myenv&quot;</span> <span class="hljs-keyword">in</span> env_cfg.<span class="hljs-built_in">type</span>:
        preprocessor = PolicyProcessorPipeline(steps=[MyEnvProcessorStep()])
    <span class="hljs-keyword">else</span>:
        preprocessor = PolicyProcessorPipeline(steps=[])

    postprocessor = PolicyProcessorPipeline(steps=[])
    <span class="hljs-keyword">return</span> preprocessor, postprocessor`,lang:"python",wrap:!1});var X=l(V,2);s(X,{title:"3. 在评估中使用",local:"3-在评估中使用",headingTag:"h3"});var W=l(X,4);a(W,{code:"bGVyb2JvdC1ldmFsJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb2xpY3kucGF0aCUzRGxlcm9ib3QlMkZteV9wb2xpY3klMjAlNUMlMEElMjAlMjAlMjAlMjAtLWVudi50eXBlJTNEbXllbnYlMjAlNUMlMjAlMjAlMjMlMjBBdXRvbWF0aWNhbGx5JTIwdXNlcyUyME15RW52UHJvY2Vzc29yU3RlcCUwQSUyMCUyMCUyMCUyMC0tZXZhbC5uX2VwaXNvZGVzJTNEMTA=",highlighted:`lerobot-eval \\
    --policy.path=lerobot/my_policy \\
    --env.type=myenv \\  <span class="hljs-comment"># Automatically uses MyEnvProcessorStep</span>
    --eval.n_episodes=10`,lang:"bash",wrap:!1});var Y=l(W,2);s(Y,{title:"未来：环境后处理器",local:"未来环境后处理器",headingTag:"h2"});var E=l(Y,4);s(E,{title:"action space 变换",local:"action-space-变换",headingTag:"h3"});var z=l(E,2);a(z,{code:"JTQwZGF0YWNsYXNzJTBBY2xhc3MlMjBNeUVudkFjdGlvblBvc3Rwcm9jZXNzb3IoUHJvY2Vzc29yU3RlcCklM0ElMEElMjAlMjAlMjAlMjAlMjIlMjIlMjJDb252ZXJ0JTIwcG9saWN5JTIwYWN0aW9ucyUyMHRvJTIwZW52aXJvbm1lbnQtc3BlY2lmaWMlMjBmb3JtYXQuJTIyJTIyJTIyJTBBJTBBJTIwJTIwJTIwJTIwZGVmJTIwX19jYWxsX18oc2VsZiUyQyUyMHRyYW5zaXRpb24lM0ElMjBFbnZUcmFuc2l0aW9uKSUyMC0lM0UlMjBFbnZUcmFuc2l0aW9uJTNBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwYWN0aW9uJTIwJTNEJTIwdHJhbnNpdGlvbiU1QiUyMmFjdGlvbiUyMiU1RCUwQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMEV4YW1wbGUlM0ElMjBDb252ZXJ0JTIwZnJvbSUyMENhcnRlc2lhbiUyMHRvJTIwam9pbnQlMjBzcGFjZSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGlmJTIwc2VsZi5hY3Rpb25fc3BhY2UlMjAlM0QlM0QlMjAlMjJqb2ludCUyMiUzQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGFjdGlvbiUyMCUzRCUyMHNlbGYuaWtfc29sdmVyKGFjdGlvbiklMEElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjMlMjBFeGFtcGxlJTNBJTIwQXBwbHklMjBlbnZpcm9ubWVudC1zcGVjaWZpYyUyMHNhZmV0eSUyMGxpbWl0cyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGFjdGlvbiUyMCUzRCUyMHRvcmNoLmNsYW1wKGFjdGlvbiUyQyUyMHNlbGYubWluX2FjdGlvbiUyQyUyMHNlbGYubWF4X2FjdGlvbiklMEElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB0cmFuc2l0aW9uJTVCJTIyYWN0aW9uJTIyJTVEJTIwJTNEJTIwYWN0aW9uJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcmV0dXJuJTIwdHJhbnNpdGlvbg==",highlighted:`<span class="hljs-meta">@dataclass</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MyEnvActionPostprocessor</span>(<span class="hljs-title class_ inherited__">ProcessorStep</span>):
    <span class="hljs-string">&quot;&quot;&quot;Convert policy actions to environment-specific format.&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__call__</span>(<span class="hljs-params">self, transition: EnvTransition</span>) -&gt; EnvTransition:
        action = transition[<span class="hljs-string">&quot;action&quot;</span>]

        <span class="hljs-comment"># Example: Convert from Cartesian to joint space</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.action_space == <span class="hljs-string">&quot;joint&quot;</span>:
            action = <span class="hljs-variable language_">self</span>.ik_solver(action)

        <span class="hljs-comment"># Example: Apply environment-specific safety limits</span>
        action = torch.clamp(action, <span class="hljs-variable language_">self</span>.min_action, <span class="hljs-variable language_">self</span>.max_action)

        transition[<span class="hljs-string">&quot;action&quot;</span>] = action
        <span class="hljs-keyword">return</span> transition`,lang:"python",wrap:!1});var Q=l(z,2);s(Q,{title:"坐标系转换",local:"坐标系转换",headingTag:"h3"});var R=l(Q,2);a(R,{code:"JTQwZGF0YWNsYXNzJTBBY2xhc3MlMjBDb29yZGluYXRlVHJhbnNmb3JtUG9zdHByb2Nlc3NvcihQcm9jZXNzb3JTdGVwKSUzQSUwQSUyMCUyMCUyMCUyMCUyMiUyMiUyMlRyYW5zZm9ybSUyMGFjdGlvbnMlMjBiZXR3ZWVuJTIwY29vcmRpbmF0ZSUyMHN5c3RlbXMuJTIyJTIyJTIyJTBBJTBBJTIwJTIwJTIwJTIwZGVmJTIwX19jYWxsX18oc2VsZiUyQyUyMHRyYW5zaXRpb24lM0ElMjBFbnZUcmFuc2l0aW9uKSUyMC0lM0UlMjBFbnZUcmFuc2l0aW9uJTNBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwYWN0aW9uJTIwJTNEJTIwdHJhbnNpdGlvbiU1QiUyMmFjdGlvbiUyMiU1RCUwQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMEV4YW1wbGUlM0ElMjBQb2xpY3klMjBvdXRwdXRzJTIwaW4lMjB3b3JsZCUyMGZyYW1lJTJDJTIwZW52JTIwZXhwZWN0cyUyMGJhc2UlMjBmcmFtZSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGFjdGlvbiUyMCUzRCUyMHNlbGYud29ybGRfdG9fYmFzZV90cmFuc2Zvcm0oYWN0aW9uKSUwQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHRyYW5zaXRpb24lNUIlMjJhY3Rpb24lMjIlNUQlMjAlM0QlMjBhY3Rpb24lMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjByZXR1cm4lMjB0cmFuc2l0aW9u",highlighted:`<span class="hljs-meta">@dataclass</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">CoordinateTransformPostprocessor</span>(<span class="hljs-title class_ inherited__">ProcessorStep</span>):
    <span class="hljs-string">&quot;&quot;&quot;Transform actions between coordinate systems.&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__call__</span>(<span class="hljs-params">self, transition: EnvTransition</span>) -&gt; EnvTransition:
        action = transition[<span class="hljs-string">&quot;action&quot;</span>]

        <span class="hljs-comment"># Example: Policy outputs in world frame, env expects base frame</span>
        action = <span class="hljs-variable language_">self</span>.world_to_base_transform(action)

        transition[<span class="hljs-string">&quot;action&quot;</span>] = action
        <span class="hljs-keyword">return</span> transition`,lang:"python",wrap:!1});var _=l(R,2);s(_,{title:"最佳实践",local:"最佳实践",headingTag:"h2"});var S=l(_,4);s(S,{title:"总结",local:"总结",headingTag:"h2"});var P=l(S,8);O(P,{source:"https://github.com/huggingface/lerobot/blob/main/docs/source/env_processor.mdx"}),Ml(2),F(q,M),al()}export{Ul as component};
