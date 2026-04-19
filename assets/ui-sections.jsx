/* Flippy — UI Design section + Scroll-driven Apple-style reveal */

const { useState, useEffect, useRef } = React;

function FlippyIcon({h=36}){
  return <img src="/flippy_logo.png" alt="Flippy" style={{height:h,width:'auto',display:'block'}}/>;
}

/* =========================================================
   Community Panel
   ========================================================= */

const communityItems = [
  { title:'Cyberpunk HUD Kit',      author:'@pixel_forge',  likes:1240, dupes:389, gradient:'135deg,#1a0a2e,#6d28d9 80%',  tags:['HUD'] },
  { title:'Mobile RPG UI Pack',     author:'@game_ux',      likes:892,  dupes:211, gradient:'135deg,#0a1628,#1d4ed8 80%',  tags:['UI Kits'] },
  { title:'Fantasy Inventory',      author:'@ui_wizard',    likes:2103, dupes:567, gradient:'135deg,#0a1a08,#15803d 80%',  tags:['Game Assets'] },
  { title:'Sci-Fi Dashboard',       author:'@neon_craft',   likes:445,  dupes:132, gradient:'135deg,#200a18,#be185d 80%',  tags:['HUD'] },
  { title:'Retro Arcade Pack',      author:'@retro_dev',    likes:678,  dupes:198, gradient:'135deg,#1a1100,#b45309 80%',  tags:['Game Assets'] },
  { title:'Minimal Battle UI',      author:'@clean_games',  likes:334,  dupes:89,  gradient:'135deg,#071a28,#0369a1 80%',  tags:['UI Kits'] },
  { title:'Horror Interface Kit',   author:'@dark_studio',  likes:1567, dupes:423, gradient:'135deg,#150a0a,#991b1b 80%',  tags:['Game Assets'] },
  { title:'Space Strategy HUD',     author:'@cosmos_ui',    likes:891,  dupes:245, gradient:'135deg,#080820,#4f46e5 80%',  tags:['HUD'] },
  { title:'Icon Pack — 240 Icons',  author:'@iconset_lab',  likes:3210, dupes:980, gradient:'135deg,#0a1e1a,#0d9488 80%',  tags:['Icons'] },
  { title:'Onboarding Templates',   author:'@ux_patterns',  likes:556,  dupes:167, gradient:'135deg,#1a0a20,#7c3aed 80%',  tags:['Templates'] },
  { title:'Pixel Art Tileset UI',   author:'@pixelworks',   likes:1890, dupes:612, gradient:'135deg,#201508,#c2410c 80%',  tags:['Game Assets'] },
  { title:'Dark Mode Design Sys',   author:'@system_forge', likes:2780, dupes:844, gradient:'135deg,#0a0a18,#334155 80%',  tags:['Templates'] },
];

function CommunityPanel(){
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const filters = ['All','UI Kits','Game Assets','HUD','Icons','Templates'];

  const filtered = communityItems.filter(item =>
    (!search || item.title.toLowerCase().includes(search.toLowerCase()) || item.author.includes(search.toLowerCase())) &&
    (filter==='All' || item.tags.includes(filter))
  );

  return (
    <div className="comm-panel">
      <div className="comm-search-row">
        <div className="comm-search-wrap">
          <span className="comm-search-icon">⌕</span>
          <input
            className="comm-input"
            placeholder="Search community files, creators..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
          />
          {search && <button className="comm-clear" onClick={()=>setSearch('')}>✕</button>}
        </div>
        <div className="comm-sort mono tiny">Sort: <span style={{color:'#E6E6EA'}}>Popular ▾</span></div>
      </div>

      <div className="comm-filters">
        {filters.map(f=>(
          <button key={f} className={'comm-filter'+(filter===f?' on':'')} onClick={()=>setFilter(f)}>{f}</button>
        ))}
        <span className="mono tiny" style={{marginLeft:'auto',color:'#5C5C66'}}>{filtered.length} resources</span>
      </div>

      <div className="comm-grid">
        {filtered.map((item,i)=>(
          <div key={i} className="comm-card">
            <div className="comm-thumb" style={{background:`linear-gradient(${item.gradient})`}}>
              <div className="comm-thumb-pattern"/>
              <span className="comm-tag mono tiny">{item.tags[0]}</span>
              <button className="comm-dup-btn mono tiny">Duplicate</button>
            </div>
            <div className="comm-info">
              <div className="comm-title">{item.title}</div>
              <div className="comm-meta">
                <span className="comm-author mono tiny">{item.author}</span>
                <div style={{display:'flex',gap:10,marginLeft:'auto'}}>
                  <span className="mono tiny" style={{color:'#5C5C66'}}>♥ {item.likes.toLocaleString()}</span>
                  <span className="mono tiny" style={{color:'#5C5C66'}}>⬡ {item.dupes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Projects Panel
   ========================================================= */

const projectItems = [
  { name:'Mobile App — Hero UI',  engines:['Unity','Godot'],          status:'synced',      modified:'2s ago',    branch:'main',               gradient:'135deg,#1a1228,#8B5CF6 90%', files:14 },
  { name:'HUD System v2',         engines:['Unreal'],                  status:'synced',      modified:'14m ago',   branch:'feat/hud-v2',        gradient:'135deg,#0a1228,#0094FF 90%', files:7  },
  { name:'Inventory & Shop',      engines:['Unity'],                   status:'in progress', modified:'1h ago',    branch:'feature/inventory',  gradient:'135deg,#0a1e10,#00D672 90%', files:22 },
  { name:'Splash Screen',         engines:['Unity','Unreal','Godot'],  status:'synced',      modified:'3h ago',    branch:'main',               gradient:'135deg,#28100a,#FF4D8D 90%', files:4  },
  { name:'Design System 2.0',     engines:[],                          status:'draft',       modified:'yesterday', branch:'design/tokens',      gradient:'135deg,#1a1a08,#FFB020 90%', files:38 },
  { name:'Onboarding Flow',       engines:['Godot'],                   status:'review',      modified:'2d ago',    branch:'feat/onboarding',    gradient:'135deg,#0a1a0a,#34E08B 90%', files:11 },
];

const statusColors = { synced:'#00D672', 'in progress':'#FFB020', draft:'#5C5C66', review:'#0094FF' };
const engColors    = { Unity:'#00D672', Unreal:'#E6E6EA', Godot:'#38B6FF' };

function ProjectsPanel(){
  return (
    <div className="proj-panel">
      <div className="proj-header">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontWeight:600,fontSize:14}}>My Projects</span>
          <span className="mono tiny" style={{color:'#5C5C66'}}>{projectItems.length} files</span>
        </div>
        <button className="proj-new-btn">+ New Project</button>
      </div>

      <div className="proj-grid">
        {projectItems.map((p,i)=>(
          <div key={i} className="proj-card">
            <div className="proj-thumb" style={{background:`linear-gradient(${p.gradient})`}}>
              <div className="proj-thumb-grain"/>
              <span className="proj-file-count mono tiny">{p.files} layers</span>
            </div>
            <div className="proj-info">
              <div className="proj-name">{p.name}</div>

              <div className="proj-engines">
                {p.engines.length===0
                  ? <span className="mono tiny" style={{color:'#5C5C66'}}>no engine connected</span>
                  : p.engines.map(e=>(
                      <span key={e} className="proj-eng-badge" style={{borderColor:engColors[e]+'55',color:engColors[e]}}>
                        <span style={{width:5,height:5,borderRadius:'50%',background:engColors[e],display:'inline-block'}}/>
                        {e}
                      </span>
                    ))
                }
              </div>

              <div className="proj-footer">
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:statusColors[p.status]||'#5C5C66',boxShadow:`0 0 6px ${statusColors[p.status]||'#5C5C66'}`,display:'inline-block'}}/>
                  <span className="mono tiny" style={{color:statusColors[p.status]||'#5C5C66'}}>{p.status}</span>
                </div>
                <span className="mono tiny" style={{color:'#5C5C66'}}>{p.modified}</span>
              </div>

              <div className="proj-branch">
                <span style={{color:'#3a3a45'}}>⎇</span> {p.branch}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Prototype Panel — Animated pipeline: Design → Core → Engine
   ========================================================= */

const PROTO_STEPS = [
  { label:'Design File',   sub:'6 layers · Splash Screen',       color:'#8B5CF6' },
  { label:'Decomposing',   sub:'Breaking into Flippy Core nodes', color:'#FFB020' },
  { label:'Flippy Core',   sub:'Compiling scene graph',           color:'#FF4D8D' },
  { label:'Live in Unity', sub:'Prefabs synced · 0 ms latency',   color:'#00D672' },
];

const FRAGS = [
  { name:'Splash Screen', icon:'▤', color:'#8B5CF6', tx:-190, ty:-62, rot:-10 },
  { name:'Flippy Logo',   icon:'◆', color:'#A78BFA', tx:162,  ty:-82, rot:7   },
  { name:'Background',    icon:'▭', color:'#334155', tx:-152, ty:72,  rot:11  },
  { name:'CTA Button',    icon:'▭', color:'#00D672', tx:148,  ty:78,  rot:-8  },
  { name:'Status Bar',    icon:'⚊', color:'#FFB020', tx:12,   ty:-112,rot:3   },
];

function ProtoDesignView({sp}){
  const fadeOp = sp<0.12 ? sp/0.12 : sp>0.82 ? (1-sp)/0.18 : 1;
  return (
    <div className="ptv" style={{opacity:fadeOp}}>
      <div className="ptv-layers">
        <div className="mono tiny ptv-panel-title">LAYERS</div>
        {FRAGS.map((f,i)=>(
          <div key={i} className="ptv-layer-chip" style={{borderColor:f.color+'50',opacity:0.45+sp*0.55}}>
            <span style={{color:f.color}}>{f.icon}</span>
            <span className="mono tiny" style={{color:f.color}}>{f.name}</span>
          </div>
        ))}
      </div>
      <div className="ptv-center">
        <div className="ptv-device">
          <div className="ptv-device-notch"/>
          <div className="ptv-device-glow"/>
          <div className="ptv-device-hero">
            <div style={{fontSize:13,fontWeight:700,color:'#E6E6EA',position:'relative',zIndex:1}}>Flippy</div>
            <div className="mono tiny" style={{color:'#8B8B95',fontSize:8,position:'relative',zIndex:1}}>design → engine</div>
          </div>
        </div>
        <div className="mono tiny ptv-label" style={{color:'#8B5CF6'}}>Source · Design File</div>
      </div>
      <div className="ptv-props">
        <div className="mono tiny ptv-panel-title">PROPERTIES</div>
        {['Frame: 390×844','Fill: #0094FF','Auto-Layout: ↓','Engine: Unity'].map((p,i)=>(
          <div key={i} className="ptv-prop-row">
            <span className="mono tiny" style={{color:'#5C5C66',fontSize:10}}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProtoBreakView({sp}){
  const easeOut = t => 1-Math.pow(1-t,3);
  const fadeOp = sp<0.12 ? sp/0.12 : sp>0.82 ? (1-sp)/0.18 : 1;
  return (
    <div className="ptv ptv-break" style={{opacity:fadeOp}}>
      <div className="ptv-core-anchor" style={{transform:`translate(-50%,-50%) scale(${0.8+sp*0.3})`,opacity:0.3+sp*0.4}}>
        <FlippyIcon h={36} uid="bv"/>
        <div className="mono tiny" style={{color:'#A78BFA',marginTop:4,fontSize:9}}>Flippy Core</div>
      </div>
      {FRAGS.map((f,i)=>{
        const delay = i*0.1;
        const fp = Math.max(0,Math.min(1,(sp-delay)/(1-delay)));
        const fe = easeOut(fp);
        return (
          <div key={i} className="ptv-frag" style={{
            transform:`translate(calc(-50% + ${f.tx*fe}px),calc(-50% + ${f.ty*fe}px)) rotate(${f.rot*fe}deg)`,
            opacity:0.95-fe*0.12,
            borderColor:f.color+'55',
          }}>
            <span style={{color:f.color}}>{f.icon}</span>
            <span className="mono tiny" style={{color:f.color}}>{f.name}</span>
          </div>
        );
      })}
      <div className="ptv-label mono tiny" style={{position:'absolute',bottom:14,color:'#FFB020'}}>Decomposing · {FRAGS.length} layers</div>
    </div>
  );
}

function ProtoCompileView({sp}){
  const easeIn = t => t*t*(3-2*t);
  const fadeOp = sp<0.12 ? sp/0.12 : sp>0.82 ? (1-sp)/0.18 : 1;
  return (
    <div className="ptv ptv-compile" style={{opacity:fadeOp}}>
      {FRAGS.map((f,i)=>{
        const delay = i*0.08;
        const fp = Math.max(0,Math.min(1,(sp-delay)/(1-delay)));
        const fe = easeIn(fp);
        return (
          <div key={i} className="ptv-frag" style={{
            transform:`translate(calc(-50% + ${f.tx*(1-fe)}px),calc(-50% + ${f.ty*(1-fe)}px)) rotate(${f.rot*(1-fe)}deg) scale(${1-fe*0.5})`,
            opacity:Math.max(0,1-fe*1.3),
            borderColor:f.color+'50',
          }}>
            <span style={{color:f.color}}>{f.icon}</span>
            <span className="mono tiny" style={{color:f.color}}>{f.name}</span>
          </div>
        );
      })}
      <div className="ptv-core-pulse" style={{transform:`translate(-50%,-50%) scale(${0.65+sp*0.55})`,opacity:0.15+sp*0.85}}>
        <div className="ptv-core-ring"/>
        <div className="ptv-core-ring ptv-core-ring2"/>
        <div style={{position:'relative',zIndex:1}}>
          <FlippyIcon h={52} uid="cv"/>
        </div>
      </div>
      <div className="ptv-binary" style={{opacity:sp*0.7}}>
        {['01110011','11001010','00101101','10110011','01001110'].map((b,i)=>(
          <div key={i} className="mono" style={{color:'#FF4D8D',fontSize:8,opacity:0.25+(sp+i*0.18)%1*0.55}}>{b}</div>
        ))}
      </div>
      <div className="ptv-label mono tiny" style={{position:'absolute',bottom:14,color:'#FF4D8D'}}>Flippy Core · Compiling scene graph...</div>
    </div>
  );
}

function ProtoEngineView({sp}){
  const fadeOp = sp<0.12 ? sp/0.12 : sp>0.88 ? (1-sp)/0.12 : 1;
  const prefabs = [
    {name:'SplashScreen.prefab',icon:'▤'},
    {name:'FlippyLogo.prefab',  icon:'◆'},
    {name:'CTAButton.prefab',   icon:'▭'},
    {name:'Background.prefab',  icon:'▭'},
    {name:'StatusBar.prefab',   icon:'⚊'},
  ];
  return (
    <div className="ptv ptv-engine" style={{opacity:fadeOp}}>
      <div className="ptv-unity">
        <div className="ptv-unity-header">
          <div className="ptv-unity-dot" style={{background:'#00D672',boxShadow:'0 0 6px #00D672'}}/>
          <span className="mono tiny" style={{color:'#00D672',fontWeight:600}}>Unity</span>
          <span className="mono tiny" style={{color:'#5C5C66',marginLeft:'auto'}}>Project Browser</span>
        </div>
        {prefabs.map((p,i)=>{
          const ip = Math.max(0,Math.min(1,(sp-i*0.11)/0.5));
          return (
            <div key={i} className="ptv-prefab" style={{opacity:ip,transform:`translateX(${(1-ip)*18}px)`,borderColor:'#00D67225'}}>
              <span style={{color:'#00D672',marginRight:6}}>{p.icon}</span>
              <span className="mono tiny" style={{color:'#E6E6EA'}}>{p.name}</span>
              <span className="mono tiny" style={{marginLeft:'auto',color:'#34E08B'}}>● synced</span>
            </div>
          );
        })}
        <div className="ptv-unity-footer" style={{opacity:sp>0.65?(sp-0.65)/0.35:0}}>
          <span className="mono tiny" style={{color:'#34E08B'}}>✓ 5 prefabs synced</span>
          <span className="mono tiny" style={{color:'#5C5C66',marginLeft:'auto'}}>0 ms latency</span>
        </div>
      </div>
      <div className="ptv-eng-stats">
        {[['5','prefabs','#00D672'],['0ms','latency','#34E08B'],['live','sync','#A78BFA']].map(([v,l,c],i)=>(
          <div key={i} className="ptv-eng-stat" style={{opacity:Math.max(0,Math.min(1,(sp-i*0.16)/0.4))}}>
            <div style={{fontSize:22,fontWeight:700,color:c,fontFamily:'var(--font-mono)'}}>{v}</div>
            <div className="mono tiny" style={{color:'#5C5C66'}}>{l}</div>
          </div>
        ))}
      </div>
      <div className="ptv-label mono tiny" style={{position:'absolute',bottom:14,color:'#00D672'}}>Unity · Prefabs synced · Live</div>
    </div>
  );
}

function PrototypePanel(){
  const [tick,setTick] = useState(0);
  const t0 = useRef(null);
  useEffect(()=>{
    t0.current = performance.now();
    let raf;
    const loop = now => { setTick(now - t0.current); raf=requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return ()=>cancelAnimationFrame(raf);
  },[]);

  const TOTAL=8000, STEP_DUR=2000;
  const elapsed = tick % TOTAL;
  const step = Math.min(3, Math.floor(elapsed/STEP_DUR));
  const sp = (elapsed % STEP_DUR) / STEP_DUR;

  return (
    <div className="ptab-panel">
      <div className="ptab-steps">
        {PROTO_STEPS.map((s,i)=>(
          <React.Fragment key={i}>
            <div className={'ptab-step-item'+(step===i?' on':step>i?' done':'')}>
              <div className="ptab-step-dot" style={(step===i||step>i)?{background:s.color,boxShadow:`0 0 7px ${s.color}`}:{}}/>
              <span className="mono tiny" style={step===i?{color:s.color}:{}}>{s.label}</span>
            </div>
            {i<PROTO_STEPS.length-1 && (
              <div className="ptab-step-line">
                <div className="ptab-step-fill" style={{width:step>i?'100%':step===i?(sp*100)+'%':'0%',background:s.color}}/>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="ptab-stage">
        {step===0 && <ProtoDesignView sp={sp}/>}
        {step===1 && <ProtoBreakView  sp={sp}/>}
        {step===2 && <ProtoCompileView sp={sp}/>}
        {step===3 && <ProtoEngineView sp={sp}/>}
      </div>

      <div className="ptab-footer">
        <div className="ptab-status-dot" style={{background:PROTO_STEPS[step].color,boxShadow:`0 0 6px ${PROTO_STEPS[step].color}`}}/>
        <span className="mono tiny" style={{color:PROTO_STEPS[step].color,fontWeight:600}}>{PROTO_STEPS[step].label}</span>
        <span className="mono tiny" style={{color:'#5C5C66',marginLeft:8}}>{PROTO_STEPS[step].sub}</span>
        <div className="ptab-overall-progress">
          <div className="ptab-overall-fill" style={{width:(elapsed/TOTAL*100).toFixed(1)+'%'}}/>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   UI Design tool section
   ========================================================= */

function UIDesignSection(){
  const [selected,setSelected] = useState('Splash Screen');
  const [activeTab,setActiveTab] = useState('design');
  const [t,setT] = useState(0);
  useEffect(()=>{
    let raf; const loop=()=>{ setT(performance.now()/1000); raf=requestAnimationFrame(loop) };
    raf=requestAnimationFrame(loop); return ()=>cancelAnimationFrame(raf);
  },[]);

  return (
    <section id="ui-design" className="section">
      <div className="container">
        <div className="section-head">
          <span className="num">/ 02</span>
          <span className="eyebrow">UI & Product Design · Figma-grade</span>
          <div className="bar"/>
        </div>
        <div className="twocol" style={{alignItems:'end'}}>
          <div>
            <h2>Not a port of Figma.<br/><span className="grad-violet">A canvas that compiles.</span></h2>
            <p className="lede">
              Full vector UI tooling: Frames, Components, Auto-Layout, Constraints, Styles,
              Variables, Pages. Every layer you draw is a real node in the engine — Flippy
              treats UI design as production code, not a picture to hand off.
            </p>
          </div>
          <div className="ui-featgrid">
            {UI_FEATS.map((f,i)=><UIFeat key={f.type} {...f} idx={i}/>)}
          </div>
        </div>

        <div className="app-shell">
          {/* Window chrome */}
          <div className="as-chrome">
            <div className="as-lights"><span/><span/><span/></div>
            <div className="as-tabs">
              <div className="as-tab on">
                <span className="ft-swatch" style={{background:'linear-gradient(135deg,#8B5CF6,#38B6FF)'}}/>
                Flippy Studio — Mobile App
              </div>
              <div className="as-tab">
                <span className="ft-swatch" style={{background:'linear-gradient(135deg,#00D672,#FFB020)'}}/>
                Design System 2.0
              </div>
              <button className="as-tab-plus">+</button>
            </div>
            <div className="as-chrome-right">
              <span className="as-save mono tiny">Auto-save · 5m</span>
              <button className="as-share">Share</button>
              <button className="as-play">▷</button>
            </div>
          </div>

          {/* Sub nav — interactive */}
          <div className="as-subnav">
            {[['community','◎','Community'],['projects','⊞','Projects'],['design','▤','Design'],['prototype','▷','Prototype']].map(([key,icon,label])=>(
              <div key={key} className={'as-subtab'+(activeTab===key?' on':'')} onClick={()=>setActiveTab(key)}>
                <span>{icon}</span>{label}
              </div>
            ))}
            <div style={{marginLeft:'auto',display:'flex',gap:8}}>
              <button className="as-mini-btn">Make with AI ✦</button>
            </div>
          </div>

          {/* ── Tab content ── */}
          {activeTab==='community' && <CommunityPanel/>}
          {activeTab==='projects'  && <ProjectsPanel/>}
          {activeTab==='prototype' && <PrototypePanel/>}

          {activeTab==='design' && (
            <div className="as-body">
              {/* LEFT PANEL */}
              <aside className="as-left">
                <div className="ap-group">
                  <div className="ap-label mono tiny">GAME ENGINE EDITOR</div>
                  <div className="ap-engines">
                    <EngTile name="Unity" color="#00D672"/>
                    <EngTile name="Unreal" color="#E6E6EA"/>
                    <EngTile name="Godot" color="#38B6FF"/>
                  </div>
                </div>

                <div className="ap-group">
                  <div className="ap-label mono tiny" style={{display:'flex',justifyContent:'space-between'}}>
                    <span>PAGES</span><span style={{color:'#8B8B95'}}>+</span>
                  </div>
                  <div className="ap-page on">✓ Flippy new look</div>
                  <div className="ap-page">Design System</div>
                </div>

                <div className="ap-group flex1">
                  <div className="ap-label mono tiny">LAYERS</div>
                  <Layer nested={0} type="frame" name="Home Screen" color="#E6E600"/>
                  <Layer nested={0} type="frame" name="Splash Screen" color="#E6E600" open selected={selected==='Splash Screen'} onClick={()=>setSelected('Splash Screen')}/>
                  <Layer nested={1} type="component" name="Status Bar - iPhone" color="#A78BFA" selected={selected==='Status Bar - iPhone'} onClick={()=>setSelected('Status Bar - iPhone')}/>
                  <Layer nested={1} type="group" name="Flippy logo" color="#00D672" selected={selected==='Flippy logo'} onClick={()=>setSelected('Flippy logo')}/>
                  <Layer nested={1} type="group" name="Blurry Background" color="#00D672"/>
                  <Layer nested={1} type="component" name="Home Indicator" color="#A78BFA"/>
                  <Layer nested={1} type="rect" name="Background" color="#8B8B95"/>
                  <Layer nested={0} type="frame" name="Onboarding · 01" color="#E6E600"/>
                  <Layer nested={0} type="frame" name="Onboarding · 02" color="#E6E600"/>
                </div>

                <div className="ap-group">
                  <div className="ap-label mono tiny">STYLES</div>
                  <div className="ap-swatches">
                    <span className="sw" style={{background:'#8B5CF6'}}/>
                    <span className="sw" style={{background:'#0094FF'}}/>
                    <span className="sw" style={{background:'#00D672'}}/>
                    <span className="sw" style={{background:'#FF4D8D'}}/>
                    <span className="sw" style={{background:'#FFB020'}}/>
                    <span className="sw" style={{background:'#E6E6EA'}}/>
                  </div>
                </div>
              </aside>

              {/* CENTER CANVAS */}
              <div className="as-canvas dotgrid">
                {/* zoom readout */}
                <div className="as-zoom mono tiny">100%</div>

                {/* Mocked device screen (the splash) */}
                <div className="device-mock" style={{transform:`translate(-50%,-50%) rotate(${Math.sin(t*0.3)*0.3}deg)`}}>
                  <div className="dm-inner">
                    <div className="dm-notch"/>
                    <div className="dm-statusbar">
                      <span>9:41</span>
                      <span style={{marginLeft:'auto'}}>●●● 5G ▮</span>
                    </div>
                    <div className="dm-hero">
                      <div className="dm-title">Flippy</div>
                      <div className="dm-sub">design → engine</div>
                      <div className="dm-blur b1"/>
                      <div className="dm-blur b2"/>
                    </div>
                    <div className="dm-home"/>
                  </div>

                  {/* Selection box */}
                  <div className="dm-select">
                    <span className="ds-handle tl"/><span className="ds-handle tr"/>
                    <span className="ds-handle bl"/><span className="ds-handle br"/>
                    <span className="ds-label mono tiny">Splash Screen · 390 × 844</span>
                  </div>
                </div>

                {/* Comment pin */}
                <div className="comment-pin" style={{top:'24%',right:'22%'}}>
                  <div className="cp-avatar">E</div>
                  <div className="cp-bubble">Can we bump the logo 8px up?</div>
                </div>

                {/* Presence cursors */}
                <Cursor x={30} y={65} color="#FF4D8D" name="Tuna"/>
                <Cursor x={72} y={32} color="#34E08B" name="Ayla"/>

                {/* bottom toolbar */}
                <div className="canvas-toolbar" style={{position:'absolute'}}>
                  <button className="tb-btn">+</button>
                  <sep/>
                  <button className="tb-btn">▭</button>
                  <button className="tb-btn">◯</button>
                  <button className="tb-btn">T</button>
                  <button className="tb-btn">✎</button>
                  <button className="tb-btn on">▷</button>
                  <button className="tb-btn">✦</button>
                  <sep/>
                  <span className="mono tiny" style={{padding:'0 10px',color:'#8B8B95'}}>100%</span>
                  <button className="tb-export">Export</button>
                </div>
              </div>

              {/* RIGHT PANEL — properties */}
              <aside className="as-right">
                <Prop title="Frame" icon="▤">
                  <Row><F>X</F><V>0</V><F>Y</F><V>0</V></Row>
                  <Row><F>W</F><V hl>390</V><F>H</F><V>844</V></Row>
                  <Row><F>↔</F><V>Fill</V><F>↕</F><V>Hug</V></Row>
                </Prop>

                <Prop title="Constraints" icon="⊞">
                  <div className="constraint-box">
                    <span className="cb-anchor tl"/><span className="cb-anchor tr"/>
                    <span className="cb-anchor bl"/><span className="cb-anchor br"/>
                    <span className="cb-anchor tc active"/><span className="cb-anchor lc active"/>
                  </div>
                  <Row><F>↔</F><V>Left</V></Row>
                  <Row><F>↕</F><V>Top</V></Row>
                </Prop>

                <Prop title="Auto layout" icon="∥">
                  <div className="auto-dirs">
                    <button className="ad">↓</button>
                    <button className="ad">→</button>
                    <button className="ad">⇆</button>
                    <button className="ad on">∥</button>
                  </div>
                  <Row><F>][</F><V>8</V><F>∥</F><V>0</V></Row>
                </Prop>

                <Prop title="Fill" icon="●">
                  <Row><span className="fill-sw" style={{background:'#0094FF'}}/><V>0094FF</V><V>100%</V></Row>
                </Prop>

                <Prop title="Stroke" icon="○">
                  <div className="mono tiny" style={{color:'#5C5C66',padding:'6px 4px'}}>+ Add stroke</div>
                </Prop>

                <Prop title="Engine binding" icon="▸" accent="#00D672">
                  <div className="eng-bind">
                    <span className="mono tiny" style={{color:'#8B8B95'}}>→ Unity</span>
                    <span className="mono tiny" style={{color:'#34E08B'}}>HeroFrame.prefab</span>
                  </div>
                  <div className="eng-bind">
                    <span className="mono tiny" style={{color:'#8B8B95'}}>→ Unreal</span>
                    <span className="mono tiny" style={{color:'#34E08B'}}>WBP_HeroFrame</span>
                  </div>
                </Prop>
              </aside>
            </div>
          )}

          {/* Collaborator row */}
          <div className="as-collab">
            <div style={{display:'flex',gap:-6}}>
              <Avatar c="#FF4D8D" l="T"/>
              <Avatar c="#34E08B" l="A"/>
              <Avatar c="#FFB020" l="M"/>
              <Avatar c="#8B5CF6" l="+3"/>
            </div>
            <span className="mono tiny" style={{color:'#8B8B95'}}>3 teammates in this file · live</span>
            <span className="mono tiny" style={{marginLeft:'auto',color:'#34E08B'}}>● synced to main · 2s ago</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const UI_FEATS = [
  { color:'#8B5CF6', title:'Game Frames',       sub:'Canvas layers map directly to engine scene nodes — zero pixel drift.',    type:'frames'     },
  { color:'#0094FF', title:'Component Library',  sub:'Design system components auto-sync as reusable engine prefabs.',          type:'components' },
  { color:'#00D672', title:'Engine Binding',     sub:'Unity · Unreal · Godot share one live source of truth.',                  type:'binding'    },
  { color:'#FF4D8D', title:'Infinite Canvas',    sub:'WebGL hybrid canvas. 120 FPS. No layer count limit.',                     type:'canvas'     },
  { color:'#FFB020', title:'Live Layers',        sub:'Every layer is a typed, inspectable production node in the engine.',      type:'layers'     },
  { color:'#A78BFA', title:'AI Asset Studio',    sub:'Style-locked game UI assets from text prompts. Layer-ready output.',      type:'ai'         },
];

function UIMini({type, color}){
  const t = color;
  if(type==='frames') return (
    <svg width="100%" height="52" viewBox="0 0 120 52" fill="none">
      <rect x="4"  y="12" width="26" height="30" rx="3" stroke={t} strokeWidth="1" opacity=".35"/>
      <rect x="36" y="4"  width="48" height="44" rx="4" stroke={t} strokeWidth="1.5" opacity=".85"/>
      <rect x="90" y="16" width="26" height="22" rx="3" stroke={t} strokeWidth="1" opacity=".35"/>
      <rect x="38" y="6" width="44" height="7" rx="2" fill={t} opacity=".12"/>
      <rect x="40" y="16" width="28" height="3" rx="1" fill={t} opacity=".18"/>
      <rect x="40" y="21" width="36" height="3" rx="1" fill={t} opacity=".12"/>
      <rect x="40" y="26" width="22" height="3" rx="1" fill={t} opacity=".09"/>
      <circle cx="60" cy="44" r="3" fill={t} opacity=".7">
        <animate attributeName="opacity" values=".7;.2;.7" dur="2.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="44" r="6" stroke={t} strokeWidth=".8" opacity=".3" fill="none">
        <animate attributeName="opacity" values=".3;.05;.3" dur="2.4s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
  if(type==='components') return (
    <svg width="100%" height="52" viewBox="0 0 120 52" fill="none">
      <rect x="20" y="8" width="80" height="36" rx="7" stroke={t} strokeWidth="1" opacity=".2">
        <animate attributeName="opacity" values=".2;.45;.2" dur="3s" repeatCount="indefinite"/>
      </rect>
      <rect x="30" y="14" width="60" height="24" rx="5" stroke={t} strokeWidth="1.2" opacity=".5">
        <animate attributeName="opacity" values=".5;.8;.5" dur="3s" begin=".5s" repeatCount="indefinite"/>
      </rect>
      <rect x="44" y="20" width="32" height="12" rx="3" fill={t} opacity=".18" stroke={t} strokeWidth="1.2"/>
      <rect x="8" y="22" width="8" height="8" rx="2" fill={t} opacity=".45"/>
      <rect x="104" y="22" width="8" height="8" rx="2" fill={t} opacity=".45"/>
      <line x1="16" y1="26" x2="30" y2="26" stroke={t} strokeWidth=".8" opacity=".35" strokeDasharray="2 2">
        <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1.2s" repeatCount="indefinite"/>
      </line>
      <line x1="90" y1="26" x2="104" y2="26" stroke={t} strokeWidth=".8" opacity=".35" strokeDasharray="2 2">
        <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1.2s" repeatCount="indefinite"/>
      </line>
    </svg>
  );
  if(type==='binding') return (
    <svg width="100%" height="52" viewBox="0 0 120 52" fill="none">
      <circle cx="18" cy="32" r="9" fill="#00D67212" stroke="#00D672" strokeWidth="1.2"/>
      <text x="18" y="36" fontSize="7" fill="#00D672" textAnchor="middle" opacity=".85">Unity</text>
      <circle cx="60" cy="26" r="11" fill={t+'18'} stroke={t} strokeWidth="1.6"/>
      <text x="60" y="31" fontSize="8" fill={t} textAnchor="middle" fontWeight="600" opacity=".9">Flippy</text>
      <circle cx="102" cy="32" r="9" fill="#0094FF12" stroke="#0094FF" strokeWidth="1.2"/>
      <text x="102" y="36" fontSize="6.5" fill="#0094FF" textAnchor="middle" opacity=".85">Unreal</text>
      <circle cx="60" cy="8" r="7" fill="#38B6FF12" stroke="#38B6FF" strokeWidth="1.2"/>
      <text x="60" y="12" fontSize="6.5" fill="#38B6FF" textAnchor="middle" opacity=".85">Godot</text>
      <line x1="27" y1="29" x2="50" y2="28" stroke="#00D672" strokeWidth=".9" opacity=".5" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.1s" repeatCount="indefinite"/>
      </line>
      <line x1="70" y1="28" x2="93" y2="29" stroke="#0094FF" strokeWidth=".9" opacity=".5" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.1s" repeatCount="indefinite"/>
      </line>
      <line x1="60" y1="15" x2="60" y2="15" stroke="#38B6FF" strokeWidth=".9" opacity=".5" strokeDasharray="3 3">
        <animate attributeName="y2" values="15;15" dur="1s" repeatCount="indefinite"/>
      </line>
      <path d="M60 15 L60 15" stroke="#38B6FF" strokeWidth=".9" opacity=".5" strokeDasharray="2 2">
        <animate attributeName="d" values="M60 15 L60 15;M60 15 L60 15" dur="1s" repeatCount="indefinite"/>
      </path>
      <line x1="60" y1="15" x2="60" y2="15" stroke="#38B6FF" strokeWidth=".9" opacity=".5" strokeDasharray="2 2"/>
      <path d="M 56 14 L 60 16 L 64 14" stroke="#38B6FF" strokeWidth=".8" opacity=".4" fill="none">
        <animate attributeName="opacity" values=".4;.8;.4" dur="1.4s" repeatCount="indefinite"/>
      </path>
    </svg>
  );
  if(type==='canvas') return (
    <svg width="100%" height="52" viewBox="0 0 120 52" fill="none">
      {Array.from({length:60},(_,i)=>{
        const col=i%12, row=Math.floor(i/12);
        const d=Math.sqrt(Math.pow(col-5.5,2)+Math.pow(row-2,2));
        return <circle key={i} cx={5+col*10} cy={6+row*10} r="1.2" fill={t} opacity={Math.max(0.05,0.55-d*0.11).toFixed(2)}/>;
      })}
      <circle cx="60" cy="26" r="14" stroke={t} strokeWidth=".8" opacity=".25" fill="none">
        <animate attributeName="r" values="10;18;10" dur="3.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".3;.05;.3" dur="3.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="26" r="5" fill={t} opacity=".55">
        <animate attributeName="r" values="4;6;4" dur="2.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".55;.8;.55" dur="2.2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
  if(type==='layers') return (
    <svg width="100%" height="52" viewBox="0 0 120 52" fill="none">
      {[
        {y:6,  w:70, label:'HeroFrame',   active:false, delay:'0s'},
        {y:16, w:88, label:'HUD·Health',  active:true,  delay:'.3s'},
        {y:26, w:58, label:'Inventory',   active:false, delay:'.6s'},
        {y:36, w:76, label:'Background',  active:false, delay:'.9s'},
      ].map((l,i)=>(
        <g key={i}>
          <rect x="8" y={l.y} width={l.w} height="8" rx="2" fill={t} opacity={l.active?0.2:0.07}>
            {l.active && <animate attributeName="opacity" values=".2;.3;.2" dur="2s" repeatCount="indefinite"/>}
          </rect>
          {l.active && <rect x="8" y={l.y} width={l.w} height="8" rx="2" stroke={t} strokeWidth="1" opacity=".7"/>}
          <circle cx="14" cy={l.y+4} r="2" fill={t} opacity={l.active?0.9:0.3}/>
        </g>
      ))}
      <circle cx="108" cy="10" r="5" fill="#00D672" opacity=".9">
        <animate attributeName="opacity" values=".9;.35;.9" dur="1.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="108" cy="10" r="8" stroke="#00D672" strokeWidth=".8" opacity=".3" fill="none">
        <animate attributeName="opacity" values=".3;.05;.3" dur="1.6s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
  if(type==='ai') return (
    <svg width="100%" height="52" viewBox="0 0 120 52" fill="none">
      <circle cx="60" cy="26" r="16" stroke={t} strokeWidth=".8" opacity=".2" fill="none">
        <animate attributeName="r" values="12;20;12" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".3;.05;.3" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="26" r="9" fill={t} opacity=".12"/>
      <text x="60" y="31" fontSize="16" fill={t} textAnchor="middle" opacity=".9">✦</text>
      {[[60,5],[77,13],[84,31],[70,45],[44,45],[30,30],[26,14],[42,6]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="2" fill={t} opacity=".45">
          <animate attributeName="opacity" values=".45;1;.45" dur="2.8s" begin={`${i*0.32}s`} repeatCount="indefinite"/>
          <animate attributeName="r" values="1.5;2.8;1.5" dur="2.8s" begin={`${i*0.32}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
  return null;
}

function UIFeat({color, title, sub, type, idx}){
  return (
    <div className="ui-feat" style={{'--fc':color, animationDelay:`${idx*0.09}s`}}>
      <div className="uf-accent-bar" style={{background:color}}/>
      <div className="uf-mini"><UIMini type={type} color={color}/></div>
      <div className="uf-info">
        <div className="uf-title">{title}</div>
        <div className="uf-sub">{sub}</div>
      </div>
      <div className="uf-glow" style={{background:color}}/>
    </div>
  );
}

const ENGINE_LOGOS = {Unity:'/Unity_Logo.png', Unreal:'/Unreal_Logo.png', Godot:'/Godot_Logo.png'};

function EngTile({name,color}){
  return (
    <div className="eng-tile">
      <div className="eng-dot" style={{background:color,boxShadow:`0 0 8px ${color}`}}/>
      <div className="eng-ic" style={{borderColor:color+'55'}}>
        <img src={ENGINE_LOGOS[name]} alt={name} style={{width:18,height:18,objectFit:'contain'}}/>
      </div>
      <div className="eng-name mono tiny">{name}</div>
    </div>
  );
}

function Layer({nested,type,name,color,open,selected,onClick}){
  const icons = { frame:'▤', component:'◆', group:'▢', rect:'▭', 'auto-layout':'∥' };
  return (
    <div className={"layer "+(selected?'on':'')} style={{paddingLeft: 10 + nested*14}} onClick={onClick}>
      {nested>0 && <span className="layer-tree"/>}
      <span className="layer-caret" style={{opacity: open?1:0.3}}>{open?'▼':'▸'}</span>
      <span className="layer-ic" style={{color}}>{icons[type]}</span>
      <span className="layer-n">{name}</span>
      {type==='component' && <span className="layer-lock mono tiny" style={{marginLeft:'auto'}}>⌂</span>}
    </div>
  );
}

function Prop({title,icon,accent,children}){
  return (
    <div className="prop" style={accent?{borderColor:accent+'40',background:accent+'06'}:null}>
      <div className="prop-head">
        <span style={{color:accent||'#8B8B95',marginRight:8}}>{icon}</span>
        <span>{title}</span>
        <span className="mono tiny" style={{marginLeft:'auto',color:'#5C5C66'}}>⋮</span>
      </div>
      <div className="prop-body">{children}</div>
    </div>
  );
}
function Row({children}){ return <div className="prop-row">{children}</div> }
function F({children}){ return <span className="prop-f mono tiny">{children}</span> }
function V({children,hl}){ return <span className={"prop-v mono "+(hl?'hl':'')}>{children}</span> }

function Cursor({x,y,color,name}){
  return (
    <div className="cursor" style={{left:x+'%',top:y+'%'}}>
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M5 3l14 9-7 1-3 7z" fill={color} stroke="#fff" strokeWidth="1.2"/>
      </svg>
      <span className="cursor-tag" style={{background:color}}>{name}</span>
    </div>
  );
}

function Avatar({c,l}){
  return <span className="avatar" style={{background:c}}>{l}</span>
}

/* =========================================================
   Scroll-driven Apple-style "peel" section
   ========================================================= */

function PeelSection(){
  const ref = useRef(null);
  const [p,setP] = useState(0);

  useEffect(()=>{
    const onScroll = ()=>{
      const el = ref.current; if(!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh;
      const scrolled = Math.max(0, -r.top);
      const prog = Math.max(0, Math.min(1, scrolled/total));
      setP(prog);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    return ()=>{ window.removeEventListener('scroll',onScroll); window.removeEventListener('resize',onScroll); };
  },[]);

  const phase = p<0.22?0 : p<0.45?1 : p<0.65?2 : p<0.85?3 : 4;

  return (
    <section ref={ref} id="under-the-hood" className="peel-section">
      <div className="peel-pin">
        <div className="container peel-inner">
          <div className="peel-copy">
            <span className="eyebrow" style={{color:'#A78BFA'}}>/ 03 · UNDER THE HOOD</span>
            <h2 style={{marginTop:14,maxWidth:560}}>
              {phase===0 && <>A <span className="grad-violet">design surface</span> studios already love.</>}
              {phase===1 && <>Every pixel is a <span className="grad-violet">vector node.</span></>}
              {phase===2 && <>A <span className="grad-lime">C++ / Rust core</span> keeps the canvas at 120 FPS.</>}
              {phase===3 && <>A binary <span className="grad-violet">WebSocket bridge</span> streams under 200 ms.</>}
              {phase===4 && <>Which is why <span className="grad-lime">engines just… update.</span></>}
            </h2>
            <p className="lede" style={{marginTop:14,maxWidth:520}}>
              {phase===0 && 'Familiar Figma-class tooling on the surface — Frames, Components, Auto-Layout, multi-page files.'}
              {phase===1 && 'Nothing in Flippy is a screenshot. Every shape is a memory-safe vector node with 100% production fidelity.'}
              {phase===2 && 'The canvas runs on a memory-safe Rust renderer with PixiJS/WebGL acceleration — even with thousands of layers.'}
              {phase===3 && 'Protobuf-encoded frames travel over a persistent WebSocket. No JSON bloat, no export round-trips, no loss.'}
              {phase===4 && "Move a sprite in Flippy — the same frame, Unity, Unreal, and Godot show the change. That's the whole promise."}
            </p>

            <div className="peel-dots">
              {[0,1,2,3,4].map(i=>(
                <span key={i} className={"pd "+(phase===i?'on':'')}/>
              ))}
            </div>
            <div className="mono tiny" style={{marginTop:16,color:'#5C5C66',letterSpacing:'.15em',textTransform:'uppercase'}}>
              Keep scrolling →
            </div>
          </div>

          <div className="peel-stage">
            {/* Device mock - the UI layer (phase 0) */}
            <div className="pl pl-ui" style={{
              opacity: phase<=1 ? 1 - (p-0.22)*4 : 0,
              transform: `translateZ(0) scale(${1 - Math.min(0.15, Math.max(0, (p-0.1)*0.6))})`,
              filter: phase>=1 ? 'blur(4px)' : 'none'
            }}>
              <div className="pl-frame dotgrid">
                <div className="pl-ui-device">
                  <div className="pl-ui-notch"/>
                  <div className="pl-ui-sb mono tiny"><span>9:41</span><span style={{marginLeft:'auto'}}>●●● 5G</span></div>
                  <div className="pl-ui-hero">
                    <div className="pl-ui-t">Flippy</div>
                    <div className="pl-ui-s">design → engine</div>
                    <div className="pl-ui-blur"/>
                  </div>
                  <div className="pl-ui-home"/>
                </div>
                <div className="pl-badge mono tiny">SURFACE · UI</div>
              </div>
            </div>

            {/* Vector layer (phase 1) */}
            <div className="pl pl-vec" style={{
              opacity: phase===1 ? 1 : phase===2 ? Math.max(0, 1 - (p-0.45)*5) : 0,
              transform: `scale(${phase>=1 ? 1 : 0.96})`
            }}>
              <div className="pl-frame dotgrid">
                <svg className="pl-vec-svg" viewBox="0 0 400 500">
                  <rect x="80" y="40" width="240" height="420" rx="32" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 4"/>
                  <circle cx="200" cy="220" r="42" fill="none" stroke="#38B6FF" strokeWidth="1.5"/>
                  <rect x="100" y="320" width="200" height="18" rx="3" fill="none" stroke="#00D672" strokeWidth="1.5"/>
                  <rect x="120" y="350" width="160" height="14" rx="3" fill="none" stroke="#00D672" strokeWidth="1.5" opacity=".6"/>
                  {[...Array(12)].map((_,i)=>(
                    <g key={i}>
                      <circle cx={80 + (i%4)*80} cy={40 + Math.floor(i/4)*140} r="3" fill="#A78BFA"/>
                    </g>
                  ))}
                  <text x="20" y="30" fill="#8B8B95" fontSize="10" fontFamily="var(--font-mono)">Frame · 240×420</text>
                  <text x="20" y="480" fill="#A78BFA" fontSize="10" fontFamily="var(--font-mono)">12 nodes · 100% vector</text>
                </svg>
                <div className="pl-badge mono tiny" style={{background:'#8B5CF6'}}>LAYER · VECTOR NODES</div>
              </div>
            </div>

            {/* Core layer (phase 2) */}
            <div className="pl pl-core" style={{
              opacity: phase===2 ? 1 : phase===3 ? Math.max(0, 1 - (p-0.65)*5) : 0,
            }}>
              <div className="pl-frame">
                <div className="core-stack">
                  <CoreRow color="#FFB020" label="PixiJS · WebGL Renderer" sub="Hardware-accelerated · 120 FPS"/>
                  <CoreRow color="#FF4D8D" label="Flippy Core · Rust" sub="Memory-safe geometry pipeline"/>
                  <CoreRow color="#8B5CF6" label="Canvas Engine · C++" sub="Zero-copy buffer · 2M nodes tested"/>
                  <CoreRow color="#38B6FF" label="Protobuf Serializer" sub="Binary schema · versioned"/>
                </div>
                <div className="pl-badge mono tiny" style={{background:'#FF4D8D'}}>LAYER · CORE</div>
                <div className="core-stats">
                  <Stat v="2.4M" l="nodes/sec"/>
                  <Stat v="120" l="fps stable"/>
                  <Stat v="0" l="GC pauses"/>
                </div>
              </div>
            </div>

            {/* Protocol layer (phase 3) */}
            <div className="pl pl-proto" style={{
              opacity: phase===3 ? 1 : phase===4 ? Math.max(0, 1 - (p-0.85)*7) : 0,
            }}>
              <div className="pl-frame">
                <div className="proto-stage">
                  <div className="proto-side">
                    <div className="mono tiny" style={{color:'#8B8B95'}}>FLIPPY</div>
                    <div className="proto-box" style={{borderColor:'#8B5CF6'}}>
                      <span className="mono tiny">canvas.frame</span>
                    </div>
                  </div>
                  <div className="proto-wire">
                    <div className="proto-wire-line"/>
                    {[0,1,2,3,4].map(i=>(
                      <span key={i} className="proto-packet mono tiny" style={{animationDelay:`${i*0.4}s`}}>
                        0x{(Math.random()*0xFFFF|0).toString(16).padStart(4,'0').toUpperCase()}
                      </span>
                    ))}
                    <div className="proto-label mono tiny">WebSocket · Protobuf · &lt;200ms</div>
                  </div>
                  <div className="proto-side right">
                    <div className="mono tiny" style={{color:'#8B8B95'}}>ENGINE</div>
                    <div className="proto-box" style={{borderColor:'#00D672'}}>
                      <span className="mono tiny">scene.node</span>
                    </div>
                  </div>
                </div>
                <div className="pl-badge mono tiny" style={{background:'#38B6FF'}}>LAYER · PROTOCOL</div>
              </div>
            </div>

            {/* Engine layer (phase 4) */}
            <div className="pl pl-engine" style={{
              opacity: phase===4 ? Math.min(1, (p-0.85)*7) : 0,
            }}>
              <div className="pl-frame">
                <div className="engine-receive">
                  <EngReceive color="#00D672" name="Unity"
                    code={['transform.position = new Vector3(128, 0, 0);','material.color = new Color(0.55, 0.36, 0.96);','rect.width = 240f;']}/>
                  <EngReceive color="#E6E6EA" name="Unreal"
                    code={['SetActorLocation(FVector(128, 0, 0));','Material->SetVectorParameterValue(...);','Widget->SetDesiredSize(240);']}/>
                  <EngReceive color="#38B6FF" name="Godot"
                    code={['position = Vector2(128, 0)','modulate = Color("#8B5CF6")','rect_size.x = 240']}/>
                </div>
                <div className="pl-badge mono tiny" style={{background:'#00D672',color:'#0A0A0B'}}>LAYER · IN ENGINE</div>
              </div>
            </div>

            {/* progress rail */}
            <div className="peel-rail">
              <div className="peel-rail-fill" style={{height: (p*100).toFixed(1)+'%'}}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreRow({color,label,sub}){
  return (
    <div className="core-row">
      <span className="core-dot" style={{background:color,boxShadow:`0 0 12px ${color}`}}/>
      <div>
        <div style={{color:'#fff',fontSize:14}}>{label}</div>
        <div className="mono tiny" style={{color:'#8B8B95',marginTop:2}}>{sub}</div>
      </div>
    </div>
  );
}
function Stat({v,l}){ return <div className="cs"><div className="mono" style={{fontSize:22,fontWeight:600}}>{v}</div><div className="mono tiny" style={{color:'#8B8B95'}}>{l}</div></div> }

function EngReceive({color,name,code}){
  return (
    <div className="engrec" style={{borderColor:color+'40'}}>
      <div className="engrec-head">
        <img src={ENGINE_LOGOS[name]} alt={name} style={{width:14,height:14,objectFit:'contain',marginRight:6}}/>
        <span style={{color,fontWeight:500}}>{name}</span>
        <span className="mono tiny" style={{marginLeft:'auto',color:'#34E08B'}}>● updated</span>
      </div>
      <div className="engrec-code mono tiny">
        {code.map((c,i)=><div key={i}>{c}</div>)}
      </div>
    </div>
  );
}

Object.assign(window,{UIDesignSection,PeelSection});
