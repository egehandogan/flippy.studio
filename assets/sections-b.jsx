/* Flippy — AI module, Layers autoplay, Benchmarks, Competitors */

const { useState, useEffect, useRef } = React;

/* ---------- AI "Make with AI" section ---------- */

function AISection(){
  const prompts = [
    'steampunk character, copper gears, 2D hand-draw style',
    'pixel-art tilemap, autumn forest, 32x32',
    'cyberpunk HUD panels, neon glyphs, UI kit',
    'low-poly crystal cluster, stylized, PBR',
  ];
  const [i,setI] = useState(0);
  const [typed,setTyped] = useState('');
  useEffect(()=>{
    let cancel=false; setTyped('');
    const p = prompts[i]; let k=0;
    const tick = ()=>{
      if(cancel) return;
      k++; setTyped(p.slice(0,k));
      if(k<p.length) setTimeout(tick, 22 + Math.random()*30);
      else setTimeout(()=>{ if(!cancel) setI((i+1)%prompts.length); }, 2200);
    };
    tick();
    return ()=>{ cancel=true };
  },[i]);

  return (
    <section id="ai" className="section ai-section">
      <div className="container">
        <div className="section-head">
          <span className="num">/ 03</span>
          <span className="eyebrow">Make with AI · Flippy Diffusion</span>
          <div className="bar"/>
        </div>
        <div className="twocol">
          <div>
            <h2>AI that speaks<br/><span className="grad-violet">your project's art.</span></h2>
            <p className="lede">
              Flippy's proprietary <b>Anti-Prompt Filtering</b> layer trains on your project's
              visual DNA. Every generation is style-locked, layer-ready, and optimized for the
              engine hierarchy — not loose PNGs.
            </p>
            <div className="ai-bullets">
              <AIBullet color="#A78BFA" t="Style-Consistent Generation" d="Every asset adheres to your art direction, automatically."/>
              <AIBullet color="#FF4D8D" t="Production-Ready Output" d="Structured sprites, UI, and tilemaps — ready to inject."/>
              <AIBullet color="#38B6FF" t="Designer Co-Pilot" d="Variations in seconds. The designer is still in charge."/>
            </div>
          </div>

          <div className="ai-stage dotgrid">
            <div className="ai-prompt">
              <div className="ai-prompt-head">
                <span className="spark"/>
                <span className="mono tiny" style={{color:'#8B8B95'}}>PROMPT</span>
                <span className="mono tiny" style={{marginLeft:'auto',color:'#34E08B'}}>● anti-prompt filter: on</span>
              </div>
              <div className="ai-prompt-text mono">
                {typed}<span className="caret"/>
              </div>
              <div className="ai-prompt-foot">
                <span className="chip" style={{fontSize:11}}>ref: hero_style.flp</span>
                <span className="chip" style={{fontSize:11}}>layer-ready</span>
                <span className="chip" style={{fontSize:11,background:'rgba(139,92,246,.15)',borderColor:'#5a3fa8'}}>→ Unity</span>
              </div>
            </div>

            <div className="ai-grid">
              {[0,1,2,3].map(k=>(
                <div key={k} className="ai-tile" style={{animationDelay:`${k*0.12}s`}}>
                  <div className="ai-tile-inner" style={{
                    background: [
                      'linear-gradient(135deg,#2b1c5c,#8B5CF6 60%,#FF4D8D)',
                      'linear-gradient(135deg,#0a2a4a,#0094FF 55%,#34E08B)',
                      'linear-gradient(135deg,#3a0f3a,#FF4D8D 60%,#FFB020)',
                      'linear-gradient(135deg,#0a3a28,#00D672 60%,#38B6FF)'
                    ][k]
                  }}>
                    <div className="ai-tile-grain"/>
                  </div>
                  <div className="ai-tile-meta mono">
                    <span>var_{k+1}.png</span><span style={{color:'#34E08B'}}>● ready</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ai-pipeline mono tiny">
              <span>prompt</span>
              <Arrow/>
              <span>diffusion</span>
              <Arrow/>
              <span style={{color:'#A78BFA'}}>anti-prompt</span>
              <Arrow/>
              <span>style embed</span>
              <Arrow/>
              <span style={{color:'#34E08B'}}>engine asset</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function AIBullet({color,t,d}){
  return (
    <div className="ai-bullet">
      <span className="tick" style={{background:color,boxShadow:`0 0 12px ${color}88`}}/>
      <div><div style={{fontWeight:500}}>{t}</div><div style={{color:'#8B8B95',fontSize:13,marginTop:2}}>{d}</div></div>
    </div>
  );
}
function Arrow(){ return <span style={{color:'#5C5C66'}}>→</span> }

/* ---------- Benchmarks section (success criteria table) ---------- */

function BenchmarksSection(){
  const [live,setLive] = useState({ latency: 142, time: 38, accuracy: 100, engines: 3, fps: 118 });
  useEffect(()=>{
    const t = setInterval(()=>{
      setLive(p=>({
        ...p,
        latency: Math.max(80, Math.min(190, p.latency + (Math.random()-.5)*14 )),
        fps: Math.max(110, Math.min(120, p.fps + (Math.random()-.5)*2)),
        time: Math.max(36, Math.min(44, p.time + (Math.random()-.5)*.8))
      }));
    }, 700);
    return ()=>clearInterval(t);
  },[]);
  return (
    <section id="benchmarks" className="section">
      <div className="container">
        <div className="section-head">
          <span className="num">/ 04</span>
          <span className="eyebrow">Performance Targets</span>
          <div className="bar"/>
        </div>
        <h2 style={{maxWidth:900}}>Numbers we ship against.</h2>
        <p className="lede" style={{maxWidth:640,marginTop:16}}>
          Measured, not marketed. These are the thresholds every build must clear before it
          reaches a studio. Green means we're already there — amber means roadmap.
        </p>

        <div className="bench-grid">
          <BenchCard n="01" status="done" metric="Workflow Efficiency" target="40% time saved"
            value={live.time.toFixed(0)+'%'} sub="vs. traditional export → import loop" color="#00D672"/>
          <BenchCard n="02" status="done" metric="Sync Latency" target="< 200 ms"
            value={live.latency.toFixed(0)+'ms'} sub="canvas edit → engine reflection" color="#8B5CF6"/>
          <BenchCard n="03" status="done" metric="Vector Fidelity" target="100% accuracy"
            value={live.accuracy+'%'} sub="no pixel drift, no coord shift" color="#38B6FF"/>
          <BenchCard n="04" status="done" metric="Cross-Engine Support" target="3 engines"
            value={live.engines+'/3'} sub="Unity · Unreal · Godot — native" color="#FF4D8D"/>
          <BenchCard n="05" status="wip" metric="Render Pipeline" target="120 FPS stable"
            value={live.fps.toFixed(0)+'fps'} sub="PixiJS + WebGL hardware accel" color="#FFB020"/>
          <BenchCard n="06" status="wip" metric="AI Generation" target="< 5 s per asset"
            value="4.2s" sub="Flippy Diffusion · C++ inference" color="#A78BFA"/>
        </div>
      </div>
    </section>
  );
}

function BenchCard({n,metric,target,value,sub,color,status}){
  return (
    <div className="bench-card">
      <div className="bc-top">
        <span className="mono tiny" style={{color:'#5C5C66'}}>/{n}</span>
        <span className={"bc-status "+status}>
          <span className="dot" style={{background:status==='done'?'#00D672':'#FFB020',boxShadow:`0 0 8px ${status==='done'?'#00D672':'#FFB020'}`}}/>
          {status==='done'?'shipping':'in progress'}
        </span>
      </div>
      <div className="bc-metric">{metric}</div>
      <div className="bc-value mono" style={{color}}>{value}</div>
      <div className="bc-target mono tiny">target · {target}</div>
      <div className="bc-bar"><div style={{background:color,width:status==='done'?'92%':'64%'}}/></div>
      <div className="bc-sub">{sub}</div>
    </div>
  );
}

/* ---------- Competitor matrix ---------- */

function CompetitorSection(){
  const rows = [
    { k:'Platform Integration', flippy:'Real-time Live Sync via WebSocket', local:'Closed in-house tools (Dream Games, Peak)', external:'Figma / Adobe XD — static export only' },
    { k:'AI Pipeline', flippy:'Embedded, layer-ready, style-locked', local:'None available on the local market', external:'Leonardo / Midjourney — disconnected from engine' },
    { k:'Engine Targets', flippy:'Unity · Unreal · Godot — native SDKs', local:'One studio, one engine, closed source', external:'Sketch / Affinity — UI only, no engine layer' },
    { k:'Focus', flippy:'Design + Production hybrid', local:'Service-driven — not a product', external:'UI/UX & vector drawing only' },
    { k:'Output', flippy:'Live C# / C++ engine state', local:'Proprietary internal formats', external:'PNG / SVG — manual reimport' },
  ];
  return (
    <section id="compare" className="section">
      <div className="container">
        <div className="section-head">
          <span className="num">/ 05</span>
          <span className="eyebrow">Competitive Landscape</span>
          <div className="bar"/>
        </div>
        <h2 style={{maxWidth:900}}>The <span className="grad-violet">production-ready</span> advantage.</h2>
        <p className="lede" style={{maxWidth:720,marginTop:14}}>
          Figma and Adobe stop at the export button. Studio in-house tools don't ship as products.
          Flippy is the first commercial hybrid — design plus engine, in the same binary flow.
        </p>

        <div className="matrix">
          <div className="matrix-head">
            <div></div>
            <div className="m-col-flippy">
              <span className="spark"/><b>Flippy</b>
              <span className="mono tiny" style={{marginLeft:8,color:'#34E08B'}}>● native bridge</span>
            </div>
            <div>Local studio tools <span className="mono tiny" style={{color:'#5C5C66'}}>(yurt içi)</span></div>
            <div>Figma · XD · Leonardo <span className="mono tiny" style={{color:'#5C5C66'}}>(yurt dışı)</span></div>
          </div>
          {rows.map((r,i)=>(
            <div key={i} className="matrix-row">
              <div className="m-k">{r.k}</div>
              <div className="m-cell flippy">
                <Check/>{r.flippy}
              </div>
              <div className="m-cell">{r.local}</div>
              <div className="m-cell">{r.external}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Check(){return (
  <svg width="14" height="14" viewBox="0 0 24 24" style={{marginRight:8,flexShrink:0}}>
    <circle cx="12" cy="12" r="11" fill="#8B5CF6"/>
    <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)}

Object.assign(window,{AISection,BenchmarksSection,CompetitorSection});
