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
      </div>
    </section>
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
