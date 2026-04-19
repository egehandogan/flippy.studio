/* Flippy — Feature blocks, Live Sync viz, Layers panel, AI module */

const { useState, useEffect, useRef } = React;

/* ---------- Live Sync section ---------- */

function LiveSyncViz(){
  const [t,setT] = useState(0);
  useEffect(()=>{
    let raf; const loop=()=>{ setT(performance.now()/1000); raf=requestAnimationFrame(loop) };
    raf=requestAnimationFrame(loop); return ()=>cancelAnimationFrame(raf);
  },[]);
  const packets = [0,1,2,3].map(i=>((t*0.3 + i*0.25) % 1));

  return (
    <div className="sync-viz dotgrid">
      {/* Left: Flippy canvas node */}
      <div className="sync-node node-left">
        <div className="sn-head">
          <span className="ff-dot" style={{background:'#8B5CF6',boxShadow:'0 0 8px #8B5CF6'}}/>
          <span className="mono tiny">flippy.canvas</span>
          <span className="mono tiny" style={{marginLeft:'auto',color:'#5C5C66'}}>design</span>
        </div>
        <div className="sn-body">
          <div className="mini-shape" style={{borderColor:'#8B5CF6',background:'#8B5CF622'}}>
            <span className="mono tiny">hero_frame</span>
          </div>
          <div className="mini-prop"><span className="mono tiny" style={{color:'#8B8B95'}}>x</span><span className="mono tiny">128</span></div>
          <div className="mini-prop"><span className="mono tiny" style={{color:'#8B8B95'}}>fill</span><span className="mono tiny" style={{color:'#A78BFA'}}>#8B5CF6</span></div>
          <div className="mini-prop"><span className="mono tiny" style={{color:'#8B8B95'}}>w</span><span className="mono tiny">240</span></div>
        </div>
      </div>

      {/* Center: wires */}
      <svg className="sync-wires" viewBox="0 0 600 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sw" x1="0" x2="1">
            <stop offset="0" stopColor="#8B5CF6"/>
            <stop offset="1" stopColor="#00D672"/>
          </linearGradient>
        </defs>
        {[0,1,2].map((i)=>(
          <path key={i} d={`M 20 ${80+i*60} C 200 ${80+i*60}, 400 ${80+i*60}, 580 ${80+i*60}`}
            stroke="url(#sw)" strokeWidth="1.3" fill="none" opacity=".35" strokeDasharray="3 6"
            style={{strokeDashoffset:-t*40}}/>
        ))}
      </svg>

      {/* packets */}
      {packets.map((p,i)=>(
        <div key={i} className="pkt mono" style={{
          left:`calc(18% + ${p*64}%)`,
          top:`${24 + i*18}%`,
          opacity: Math.sin(p*Math.PI)
        }}>
          <span className="pkt-ball" style={{background:i%2?'#00D672':'#8B5CF6'}}/>
          {['SET_FILL','MOVE','RESIZE','TRANSFORM'][i]}
        </div>
      ))}

      {/* Right: Engine node */}
      <div className="sync-node node-right">
        <div className="sn-head">
          <span className="ff-dot" style={{background:'#00D672',boxShadow:'0 0 8px #00D672'}}/>
          <span className="mono tiny">unity.scene</span>
          <span className="mono tiny" style={{marginLeft:'auto',color:'#5C5C66'}}>engine</span>
        </div>
        <div className="sn-body">
          <div className="mini-shape" style={{borderColor:'#00D672',background:'#00D67222'}}>
            <span className="mono tiny">HeroFrame.prefab</span>
          </div>
          <div className="mini-prop"><span className="mono tiny" style={{color:'#8B8B95'}}>transform.x</span><span className="mono tiny">128</span></div>
          <div className="mini-prop"><span className="mono tiny" style={{color:'#8B8B95'}}>material.color</span><span className="mono tiny" style={{color:'#34E08B'}}>#8B5CF6</span></div>
          <div className="mini-prop"><span className="mono tiny" style={{color:'#8B8B95'}}>rect.w</span><span className="mono tiny">240</span></div>
        </div>
      </div>

      {/* latency readout */}
      <div className="latency-read">
        <span className="mono tiny" style={{color:'#5C5C66'}}>ROUND TRIP</span>
        <span className="mono" style={{color:'#34E08B',fontSize:20}}>{(Math.sin(t*2)*30+120|0)} ms</span>
      </div>
    </div>
  );
}

function LiveSyncSection(){
  return (
    <section id="livesync" className="section">
      <div className="container">
        <div className="section-head">
          <span className="num">/ 01</span>
          <span className="eyebrow">Zero-Export Workflow</span>
          <div className="bar"/>
        </div>
        <div className="twocol">
          <div>
            <h2>“If it's on your canvas,<br/>it's already in your engine.”</h2>
            <p className="lede">
              Flippy's bidirectional WebSocket bridge streams binary updates in sub-200ms.
              Move a sprite, swap a color, retune a curve — the engine scene reflects it the
              same frame. No file exports. No reimport cycles. No broken layouts.
            </p>
            <ul className="ticks">
              <li><Tick c="#8B5CF6"/> Native C# (Unity) and C++ (Unreal, Godot) bridges</li>
              <li><Tick c="#0094FF"/> Protobuf binary streaming, not JSON bloat</li>
              <li><Tick c="#00D672"/> Bidirectional: engine changes flow back to canvas</li>
              <li><Tick c="#FFB020"/> 100% vector fidelity — no pixel drift, no coord shifts</li>
            </ul>
          </div>
          <LiveSyncViz/>
        </div>
      </div>
    </section>
  );
}
function Tick({c}){ return <span className="tick" style={{background:c,boxShadow:`0 0 10px ${c}88`}}/> }

/* ---------- Engines section ---------- */

function EnginesSection(){
  return (
    <section id="engines" className="section">
      <div className="container">
        <div className="section-head">
          <span className="num">/ 02</span>
          <span className="eyebrow">Engine-Agnostic Power</span>
          <div className="bar"/>
        </div>
        <h2 style={{maxWidth:900}}>Build once. <span className="grad-lime">Sync everywhere.</span></h2>
        <p className="lede" style={{maxWidth:720,marginTop:18}}>
          Flippy's core runs a unified protocol — one canvas, three production pipelines.
          GitHub-aware, so every sync lands in a branch your team already uses.
        </p>

        <div className="engine-grid">
          <EngineCard color="#00D672" name="Unity" sub="C# Native SDK" stack={['Unity 2022 LTS','Unity 6','URP / HDRP','Prefab hierarchy','Addressables']}
            note="Direct injection into the Scene hierarchy. Supports Prefab variants and Addressable groups."/>
          <EngineCard color="#E6E6EA" name="Unreal Engine" sub="C++ Plugin" stack={['UE 5.3+','Blueprint & C++','Nanite-compat UI','UMG widgets','Material params']}
            note="Widget Blueprints and UMG layouts update live. Material parameters stream from Flippy's color engine."/>
          <EngineCard color="#38B6FF" name="Godot" sub="C++ GDExtension" stack={['Godot 4.3+','GDScript & C#','Control nodes','Tilemap layers','Scene inheritance']}
            note="Scene files are rewritten atomically. Layer order and groups are preserved one-to-one."/>
        </div>

        <div className="github-strip">
          <div className="gh-left">
            <GhIcon/>
            <div>
              <div className="mono tiny" style={{color:'#8B8B95'}}>GITHUB SYNC</div>
              <div style={{marginTop:4}}>Every Flippy change becomes a commit. Every commit is a canvas state.</div>
            </div>
          </div>
          <div className="gh-right mono tiny">
            <div className="gh-row"><span style={{color:'#34E08B'}}>●</span> main · HeroFrame.prefab updated · 2s ago</div>
            <div className="gh-row"><span style={{color:'#A78BFA'}}>●</span> feat/ai-spritesheet · Flippy Bot · 11s ago</div>
            <div className="gh-row"><span style={{color:'#38B6FF'}}>●</span> ui/hud-v2 · merged to main · 34s ago</div>
          </div>
        </div>
        <GitHubConnectFlow/>
      </div>
    </section>
  );
}

const GH_CARDS = [
  { name:'Hero Screen',  engine:'Unity',  color:'#8B5CF6', type:'hero'      },
  { name:'Combat HUD',   engine:'Unreal', color:'#0094FF', type:'hud'       },
  { name:'Inventory',    engine:'Unity',  color:'#00D672', type:'inventory' },
  { name:'Pause Menu',   engine:'Godot',  color:'#FF4D8D', type:'pause'     },
  { name:'Main Menu',    engine:'Unity',  color:'#FFB020', type:'menu'      },
  { name:'Quest Log',    engine:'Unreal', color:'#38B6FF', type:'quest'     },
];

function CardMini({type, color}){
  const t = color;
  if(type==='hero') return (
    <svg viewBox="0 0 120 80" fill="none" width="100%" height="100%">
      <rect x="2" y="2" width="116" height="76" rx="4" fill={t+'08'} stroke={t} strokeWidth=".8" opacity=".5"/>
      <rect x="8" y="8" width="50" height="6" rx="2" fill={t} opacity=".12"/>
      <rect x="8" y="8" width="34" height="6" rx="2" fill={t} opacity=".55"/>
      <rect x="62" y="8" width="20" height="6" rx="2" fill="#FF4D8D" opacity=".5"/>
      <ellipse cx="60" cy="44" rx="11" ry="15" fill={t} opacity=".1" stroke={t} strokeWidth=".7" opacity=".35"/>
      <circle cx="60" cy="30" r="6" fill={t} opacity=".15" stroke={t} strokeWidth=".7" opacity=".3"/>
      <rect x="30" y="60" width="60" height="10" rx="3" fill="#0A0A0B" stroke={t} strokeWidth=".8" opacity=".6"/>
      <rect x="35" y="63" width="28" height="4" rx="1" fill={t} opacity=".4"/>
      <rect x="90" y="54" width="24" height="18" rx="3" fill="#0A0A0B" stroke={t} strokeWidth=".7" opacity=".45"/>
      <circle cx="101" cy="62" r="3" fill={t} opacity=".2"/>
      <circle cx="104" cy="58" r="1.5" fill="#FF4D8D" opacity=".75"/>
    </svg>
  );
  if(type==='hud') return (
    <svg viewBox="0 0 120 80" fill="none" width="100%" height="100%">
      <rect x="2" y="2" width="116" height="76" rx="4" fill={t+'06'} stroke={t} strokeWidth=".8" opacity=".4"/>
      <line x1="60" y1="34" x2="60" y2="46" stroke={t} strokeWidth="1.2" opacity=".7"/>
      <line x1="54" y1="40" x2="66" y2="40" stroke={t} strokeWidth="1.2" opacity=".7"/>
      <circle cx="60" cy="40" r="8" stroke={t} strokeWidth=".8" opacity=".45" fill="none"/>
      <circle cx="60" cy="40" r="1.5" fill={t} opacity=".8"/>
      <rect x="8" y="64" width="44" height="6" rx="2" fill={t} opacity=".1"/>
      <rect x="8" y="64" width="30" height="6" rx="2" fill="#00D672" opacity=".6"/>
      <text x="90" y="70" fontSize="9" fill={t} opacity=".75" textAnchor="middle" fontFamily="monospace">12/40</text>
      <rect x="90" y="8" width="26" height="22" rx="3" fill="#0A0A0B" stroke={t} strokeWidth=".7" opacity=".45"/>
      <circle cx="103" cy="17" r="5" fill={t} opacity=".08"/>
      <circle cx="103" cy="17" r="1.5" fill={t} opacity=".8"/>
      <rect x="35" y="8" width="50" height="5" rx="2" fill={t} opacity=".1"/>
      <rect x="35" y="8" width="26" height="5" rx="2" fill={t} opacity=".5"/>
    </svg>
  );
  if(type==='inventory') return (
    <svg viewBox="0 0 120 80" fill="none" width="100%" height="100%">
      <rect x="2" y="2" width="116" height="76" rx="4" fill={t+'06'} stroke={t} strokeWidth=".8" opacity=".4"/>
      <rect x="8" y="8" width="38" height="8" rx="2" fill={t} opacity=".14"/>
      <rect x="8" y="8" width="26" height="8" rx="2" fill={t} opacity=".38"/>
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>{
        const col=i%4, row=Math.floor(i/4);
        const has=[0,1,3,5,7,10].includes(i);
        return <g key={i}>
          <rect x={8+col*27} y={22+row*20} width="22" height="16" rx="2" fill={has?t+'18':'#ffffff04'} stroke={t} strokeWidth=".7" opacity={has?.65:.3}/>
          {has && <circle cx={19+col*27} cy={30+row*20} r="3.5" fill={t} opacity=".3"/>}
          {i===0 && <rect x="8" y="22" width="22" height="16" rx="2" stroke={t} strokeWidth="1.2" fill={t+'28'}/>}
        </g>;
      })}
    </svg>
  );
  if(type==='pause') return (
    <svg viewBox="0 0 120 80" fill="none" width="100%" height="100%">
      <rect x="2" y="2" width="116" height="76" rx="4" fill={t+'06'} stroke={t} strokeWidth=".8" opacity=".4"/>
      <rect x="2" y="2" width="116" height="76" rx="4" fill="#0A0A0B" opacity=".45"/>
      <rect x="32" y="10" width="56" height="9" rx="2" fill={t} opacity=".15"/>
      <rect x="35" y="12" width="32" height="5" rx="1" fill={t} opacity=".55"/>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <rect x="22" y={26+i*13} width="76" height="10" rx="3" fill={i===0?t+'28':'#ffffff06'} stroke={i===0?t:'rgba(255,255,255,.07)'} strokeWidth={i===0?.9:.5}/>
          <rect x="28" y={29+i*13} width={[34,24,28,18][i]} height="4" rx="1" fill={t} opacity={i===0?.65:.22}/>
        </g>
      ))}
    </svg>
  );
  if(type==='menu') return (
    <svg viewBox="0 0 120 80" fill="none" width="100%" height="100%">
      <rect x="2" y="2" width="116" height="76" rx="4" fill={t+'06'} stroke={t} strokeWidth=".8" opacity=".4"/>
      <ellipse cx="60" cy="38" rx="44" ry="30" fill={t} opacity=".05"/>
      <rect x="18" y="10" width="84" height="13" rx="3" fill={t} opacity=".12"/>
      <rect x="20" y="13" width="52" height="7" rx="2" fill={t} opacity=".48"/>
      {[0,1,2].map(i=>(
        <g key={i}>
          <rect x="28" y={30+i*15} width="64" height="10" rx="3" fill={i===0?t+'2a':'#ffffff07'} stroke={i===0?t:'rgba(255,255,255,.09)'} strokeWidth={i===0?.9:.5}/>
          <rect x="34" y={33+i*15} width={[30,20,24][i]} height="4" rx="1" fill={t} opacity={i===0?.65:.25}/>
        </g>
      ))}
    </svg>
  );
  if(type==='quest') return (
    <svg viewBox="0 0 120 80" fill="none" width="100%" height="100%">
      <rect x="2" y="2" width="116" height="76" rx="4" fill={t+'06'} stroke={t} strokeWidth=".8" opacity=".4"/>
      <rect x="8" y="8" width="46" height="8" rx="2" fill={t} opacity=".14"/>
      <rect x="8" y="8" width="30" height="8" rx="2" fill={t} opacity=".42"/>
      {[{w:72,done:true},{w:54,done:true},{w:80,done:false},{w:44,done:false}].map((q,i)=>(
        <g key={i}>
          <rect x="8" y={22+i*13} width={q.w} height="9" rx="2" fill={t} opacity={q.done?.07:.16}/>
          <rect x="8" y={22+i*13} width={q.done?q.w:q.w*0.38} height="9" rx="2" fill={q.done?'#00D672':t} opacity={q.done?.22:.45}/>
          <circle cx="14" cy={26+i*13} r="2.5" fill={q.done?'#00D672':t} opacity={q.done?.85:.5}/>
        </g>
      ))}
      <rect x="8" y="74" width="104" height="3" rx="1.5" fill={t} opacity=".08"/>
      <rect x="8" y="74" width="58" height="3" rx="1.5" fill={t} opacity=".45"/>
    </svg>
  );
  return null;
}

const CONN_MSGS = [
  'Scanning repository structure…',
  'Found 12 branches · main active',
  'Detected 6 game UI screens…',
  'Mapping layers to canvas nodes…',
];

function GitHubConnectFlow(){
  const [phase, setPhase] = useState(0);
  const [connStep, setConnStep] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);
  const ref = useRef(null);
  const played = useRef(false);

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting && !played.current){
        played.current = true;
        setTimeout(()=>setPhase(1), 2000);
      }
    },{threshold:0.35});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  useEffect(()=>{
    if(phase!==1) return;
    setConnStep(0);
    const ts = [700,1400,2100,2800];
    const ids = ts.map((t,i)=>setTimeout(()=>setConnStep(i+1), t));
    const done = setTimeout(()=>setPhase(2), 3600);
    return ()=>{ ids.forEach(clearTimeout); clearTimeout(done); };
  },[phase]);

  useEffect(()=>{
    if(phase!==2){ setVisibleCards(0); return; }
    let count = 0;
    const id = setInterval(()=>{
      count++;
      setVisibleCards(count);
      if(count >= GH_CARDS.length) clearInterval(id);
    }, 160);
    return ()=>clearInterval(id);
  },[phase]);

  useEffect(()=>{
    if(phase!==2) return;
    const id = setTimeout(()=>{ setPhase(0); setConnStep(0); setVisibleCards(0); played.current=false; setTimeout(()=>setPhase(1),2000); }, 10000);
    return ()=>clearTimeout(id);
  },[phase]);

  return (
    <div ref={ref} className="ghflow">
      {/* INPUT PHASE */}
      <div className={`ghf-pane ghf-input-pane${phase===0?' ghf-visible':' ghf-hidden'}`}>
        <div className="ghf-input-label mono tiny">CONNECT YOUR REPOSITORY</div>
        <div className="ghf-url-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity=".7" style={{flexShrink:0}}>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          <span className="ghf-url-text mono">github.com / yourstudio / game-project</span>
          <span className="ghf-cursor"/>
        </div>
        <div className="ghf-connect-btn">Connect Repository →</div>
      </div>

      {/* CONNECTING PHASE */}
      <div className={`ghf-pane ghf-conn-pane${phase===1?' ghf-visible':' ghf-hidden'}`}>
        <div className="ghf-conn-ring">
          <div className="ghf-conn-spinner"/>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white" opacity=".85" style={{position:'absolute'}}>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        </div>
        <div className="ghf-conn-log">
          <div className="mono tiny" style={{color:'#5C5C66',marginBottom:10}}>yourstudio/game-project · connecting…</div>
          {CONN_MSGS.slice(0, connStep).map((m,i)=>(
            <div key={i} className="ghf-log-row mono tiny" style={{animationDelay:`${i*0.05}s`}}>
              <span style={{color:'#34E08B'}}>✓</span>{m}
            </div>
          ))}
          {connStep < 4 && <div className="ghf-log-blink mono tiny">
            <span className="ghf-blink-dot"/>
            {connStep===0?'Authenticating…':CONN_MSGS[connStep]??'Processing…'}
          </div>}
        </div>
      </div>

      {/* GALLERY PHASE */}
      <div className={`ghf-pane ghf-gallery-pane${phase===2?' ghf-visible':' ghf-hidden'}`}>
        <div className="ghf-gallery-header">
          <div className="ghf-repo-tag mono tiny">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#34E08B" style={{flexShrink:0}}>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            yourstudio / game-project · main
          </div>
          <div className="ghf-synced-badge mono tiny"><span style={{color:'#34E08B'}}>●</span> 6 screens synced</div>
        </div>
        <div className="ghf-cards">
          {GH_CARDS.slice(0, visibleCards).map((c,i)=>(
            <div key={c.name} className="ghf-card" style={{'--cc':c.color}}>
              <div className="ghf-card-vis"><CardMini type={c.type} color={c.color}/></div>
              <div className="ghf-card-info">
                <div className="ghf-card-name">{c.name}</div>
                <div className="ghf-card-meta">
                  <span className="mono tiny" style={{color:c.color, fontSize:10}}>{c.engine}</span>
                  <span className="ghf-synced-dot mono tiny">● live</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EngineCard({color,name,sub,stack,note}){
  return (
    <div className="engine-card">
      <div className="ec-top">
        <div className="ec-badge" style={{borderColor:color+'55',background:color+'10'}}>
          <span style={{width:8,height:8,borderRadius:'50%',background:color,boxShadow:`0 0 10px ${color}`,display:'inline-block'}}/>
          <span className="mono tiny">NATIVE</span>
        </div>
        <div className="ec-name" style={{color}}>{name}</div>
        <div className="ec-sub mono">{sub}</div>
      </div>
      <div className="ec-body">
        <p style={{color:'#C9C9D1',margin:0,fontSize:14,lineHeight:1.55}}>{note}</p>
        <ul className="stack-list">
          {stack.map(s=><li key={s} className="mono tiny">{s}</li>)}
        </ul>
      </div>
      <div className="ec-foot mono tiny">
        <span style={{color:'#5C5C66'}}>status</span>
        <span style={{color:'#34E08B'}}>● connected</span>
      </div>
    </div>
  );
}
function GhIcon(){ return (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.36-1.34-3.36-1.34-.46-1.17-1.12-1.48-1.12-1.48-.92-.63.07-.62.07-.62 1.02.07 1.55 1.05 1.55 1.05.9 1.55 2.37 1.1 2.95.84.09-.66.35-1.1.64-1.36-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.56 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="#C9C9D1"/>
  </svg>
)}

Object.assign(window,{LiveSyncSection,EnginesSection});
